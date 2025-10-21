import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Permiso } from '../../../shared/models/Permiso';
import { PermisoService } from '../../permisos/permiso-service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-solicitudes-table',
  imports: [CommonModule, DatePipe],
  templateUrl: './solicitudes-table.html',
})
export class SolicitudesTable {
  isAdmin$: Observable<boolean>;
  isSuper$: Observable<boolean>;

  @Input() solicitudes: Permiso[] | null = [];
  @Output() onDelete = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<Permiso>();

  constructor(
        private permisoService: PermisoService,
        private authService: AuthService
      ){
        this.isAdmin$ = this.authService.hasRole('Administrador');
        this.isSuper$ = this.authService.hasRole('Supervisor');
      }

  handleDelete(id: number) {
      Swal.fire({
        title: "Eliminar solicitud",
        text: "¿Estás seguro de que deseas eliminar esta solicitud?",
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

    handleDeny(_t18: Permiso) {
      Swal.fire({
        title: "Rechazar solicitud",
        text: "¿Estás seguro de que deseas rechazar esta solicitud?",
        icon: "warning",
        input: "text",
        inputLabel: "Comentarios:",
        showCancelButton: true,
        confirmButtonText: "Sí, rechazar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.permisoService.denyPermiso(_t18.id, result.value).subscribe(() => {
            this.onDelete.emit();
          });
        }
      });
    }

    handleAccept(_t18: Permiso) {
      Swal.fire({
        title: "Aceptar solicitud",
        text: "¿Estás seguro de que deseas aceptar esta solicitud?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, aceptar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) { 
          this.permisoService.aprovePermiso(_t18.id).subscribe(() => {
            this.onDelete.emit();
          });
        }
      });
    }
    
    handleEdit(_t18: Permiso) {
      this.onEdit.emit(_t18);
    }
      
}
