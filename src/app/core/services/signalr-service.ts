import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth-service';
import { Notificacion } from '../../shared/models/Notificacion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | undefined;

  public notificationReceived = new BehaviorSubject<Notificacion | null>(null);


  private hubUrl = `${environment.apiUrl}/notificationhub`;

  constructor(  
    private authService: AuthService
  ) {

  }

  public startConnection(): void {
    const token = this.authService.getToken();
    
    if (!token){
      console.error("Token no encontrado, no se puede inicializar SignalR");
      return;  
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conexion de SignalR iniciada.'))
      .catch(err => console.error('Error al iniciar la conexion de SignalR:', err));

    this.addListeners();    
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('Conexión de SignalR detenida.'))
        .catch(err => console.error('Error al detener SignalR: ', err));
    }
  }

  private addListeners(): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('ReceiveNotification', (data) => {
      console.log('Notificación recibida: ', data);
      this.notificationReceived.next(data);
    });
  }
}
