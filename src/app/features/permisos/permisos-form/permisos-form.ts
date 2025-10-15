import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../permiso-service';
import { Permiso } from '../../../shared/models/Permiso';
import { TipoPermiso } from '../../../shared/models/TipoPermiso';
import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-permisos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './permisos-form.html',
})
export class PermisosForm {
  @Input() tiposPermiso: TipoPermiso[] | null = []; 
  @Output() onSave = new EventEmitter<void>(); 

  permisoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private permisoService: PermisoService
  ) {
    this.permisoForm = this.fb.group({
      idTipoPermiso: [null, Validators.required],
      fecha: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.permisoForm.invalid) {
      Swal.fire({
        text: "Por favor, complete todos los campos requeridos.",
        icon: "info"
      });
      return;
    }

    const formValue = this.permisoForm.value;

    const request$ = this.permisoService.addPermiso(formValue);

    request$.subscribe({
      next: () => {
        Swal.fire({
        text: "Permiso guardado correctamente",
        icon: "success"
      });
        this.onSave.emit(); 
      },
      error: (err) => {
        console.error('Error al guardar el permiso:', err);
        
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al guardar.",
          icon: "error"
        });
      }
    });
  }
}
