import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { SignalrService } from '../../../../core/services/signalr-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../../core/services/notificacion-service';
import { Notificacion } from '../../../models/Notificacion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification-badge',
  imports: [CommonModule],
  templateUrl: './notification-badge.html',
  styleUrl: './notification-badge.css'
})
export class NotificationBadge {

  unreadCount$: Observable<number>;
  notificaciones$: Observable<Notificacion[]>;

  public isDropdownOpen = false;

  constructor(
    private elRef: ElementRef,
    private signalrService: SignalrService,
    private notificacionService: NotificacionService
  ){
    this.unreadCount$ = this.notificacionService.unreadCount$;
    this.notificaciones$ = this.notificacionService.notificaciones$;
  }

 
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isDropdownOpen && !this.elRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  atenderNotificacion(notificacion: Notificacion): void { 
    console.log('Atendiendo:', notificacion);
    this.notificacionService.marcarComoLeida(notificacion.idNotificacion);
    this.notificacionService.loadInitialNotificaciones();
    this.isDropdownOpen = false;
  }
}
