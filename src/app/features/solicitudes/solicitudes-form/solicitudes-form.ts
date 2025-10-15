import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../../permisos/permiso-service';
import { TipoPermiso } from '../../../shared/models/TipoPermiso';
import { Usuario } from '../../../shared/models/Usuario';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitudes-form.html',
})
export class SolicitudesForm {
  @Input() tiposPermiso: TipoPermiso[] | null = []; 
  @Input() listaUsuarios: Usuario[] | null = []; 
  @Output() onSave = new EventEmitter<void>(); 

  solicitudForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private permisoService: PermisoService
  ){
    this.solicitudForm = this.fb.group({
      idTipoPermiso: [null, Validators.required],
      fechaPermiso: ['', Validators.required]
    });
  }
 
  onSubmit(): void {
    if (this.solicitudForm.invalid) {
      Swal.fire({
        text: "Por favor, complete todos los campos requeridos.",
        icon: "info"
      });
      return;
    }

    const formValue = this.solicitudForm.value;

    this.permisoService.addPermiso(formValue).subscribe({
      next: () => {
        Swal.fire({
        text: "Solicitud guardada correctamente",
        icon: "success"
      });
        this.onSave.emit(); 
        this.solicitudForm.reset();
      },
      error: (err) => {
        console.error('Error al guardar la solicitud:', err);
        
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al guardar.",
          icon: "error"
        });
      }
    });
  }

  
}
