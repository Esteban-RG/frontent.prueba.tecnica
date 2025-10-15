import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PermisoService } from '../permiso-service';
import { Permiso } from '../../../shared/models/Permiso';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permisos-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './permisos-table.html',
})


export class PermisosTable {

  @Input() permisos: Permiso[] | null = [];
  @Input() isAdmin: boolean = false;
  @Output() onDetails = new EventEmitter<Permiso>();


  constructor(
      private permisoService: PermisoService,
    ){}

  handleDetails(permiso: Permiso) {
    this.onDetails.emit(permiso);
  }
}
