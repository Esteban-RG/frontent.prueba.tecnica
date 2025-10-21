import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Permiso } from '../../../shared/models/Permiso';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-permisos-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './permisos-table.html',
})


export class PermisosTable {

  @Input() permisos: Permiso[] | null = [];
  @Output() onDetails = new EventEmitter<Permiso>();


  constructor(
      private authService: AuthService
    ){}

  handleDetails(permiso: Permiso) {
    this.onDetails.emit(permiso);
  }
}
