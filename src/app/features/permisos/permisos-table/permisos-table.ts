import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PermisoService } from '../../../core/services/permiso-service';
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
  @Output() onDelete = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<Permiso>();


  constructor(
      private permisoService: PermisoService,
    ){}

  handleDelete(id: number) {

    Swal.fire({
      title: "Eliminar permiso",
      text: "¿Estás seguro de que deseas eliminar este permiso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) { 
        this.permisoService.deletePermiso(id).subscribe(() => {
          this.onDelete.emit();
        });
      }
    });

  }

  handleEdit(permiso: Permiso) {
    this.onEdit.emit(permiso);
  }

}
