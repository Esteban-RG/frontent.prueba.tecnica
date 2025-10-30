import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from './core/services/signalr-service';
import { AuthService } from './core/services/auth-service';
import { NotificacionService } from './core/services/notificacion-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit, OnDestroy {
  constructor(
    private signalrService: SignalrService,
    private authService: AuthService,
    private notificacionService: NotificacionService
  ){}
  
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.signalrService.startConnection();
        this.notificacionService.loadInitialNotificaciones();
      } else {
        this.signalrService.stopConnection();
        this.notificacionService.limpiarNotificaciones();
      }
    });
  }

  ngOnDestroy(): void {
    this.signalrService.stopConnection();
  }
}
