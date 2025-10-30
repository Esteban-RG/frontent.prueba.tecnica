import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Notificacion } from '../../shared/models/Notificacion';
import { SignalrService } from './signalr-service'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  
  private apiUrl = `${environment.apiUrl}/api/Notificacion`;

  private notificacionesSource = new BehaviorSubject<Notificacion[]>([]);
  private unreadCountSource = new BehaviorSubject<number>(0);

  public notificaciones$ = this.notificacionesSource.asObservable();
  public unreadCount$ = this.unreadCountSource.asObservable();


  constructor(
    private http: HttpClient, 
    private signalrService: SignalrService
  ) {
    this.escucharNuevasNotificaciones();
  }

 
  public loadInitialNotificaciones(): void {
    this.http.get<Notificacion[]>(`${this.apiUrl}/Usuario`)
      .pipe(
        tap(notis => console.log(`Cargadas ${notis.length} notificaciones iniciales.`))
      )
      .subscribe(notificaciones => {
        this.notificacionesSource.next(notificaciones);
        this.updateCont();
      });
    
  }


  private escucharNuevasNotificaciones(): void {
    this.signalrService.notificationReceived.subscribe(nuevaNotificacion => {
      
      if (nuevaNotificacion) {
        this.marcarComoEntregada(nuevaNotificacion.idNotificacion);

        const listaActual = this.notificacionesSource.getValue();

        const listaActualizada = [nuevaNotificacion, ...listaActual];

        this.notificacionesSource.next(listaActualizada);
        this.unreadCountSource.next(this.unreadCountSource.value + 1);
      }
    });
  }

  public updateCont():void {
    const unreadCount = this.notificacionesSource.getValue().length;
    this.unreadCountSource.next(unreadCount);
  }

  
  public marcarComoLeida(idNotificacion: number): void {
    this.http.post(`${this.apiUrl}/${idNotificacion}/Leida`, {}).subscribe(() => {

      // Borrar notificacion de la lista local
      const listaActual = this.notificacionesSource.getValue();
      const listaActualizada = listaActual.filter(notificacion => notificacion.idNotificacion !== idNotificacion);
      this.notificacionesSource.next(listaActualizada);

      //Actualizar contador
        this.updateCont();
    });
  }

  public marcarComoEntregada(idNotificacion: number): void {
    this.http.post(`${this.apiUrl}/${idNotificacion}/Entregada`, {}).subscribe();
  }

  public limpiarNotificaciones(): void {
    this.notificacionesSource.next([]);
  }
}