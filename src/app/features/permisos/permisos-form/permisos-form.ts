import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../../../core/services/permiso-service';
import { Permiso } from '../../../shared/models/Permiso';
import { TipoPermiso } from '../../../shared/models/TipoPermiso';
import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-permisos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './permisos-form.html',
})
export class PermisosForm implements OnInit, OnChanges {
  @Input() permiso?: Permiso; 
  @Input() tiposPermiso: TipoPermiso[] | null = []; 
  @Output() onSave = new EventEmitter<void>(); 

  permisoForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private permisoService: PermisoService
  ) {
    this.permisoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      idTipoPermiso: [null, Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkModeAndPatchForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['permiso']) {
      this.checkModeAndPatchForm();
    }
  }

  private checkModeAndPatchForm(): void {
    this.isEditMode = !!this.permiso;
    if (this.isEditMode && this.permiso) {
      // Usamos patchValue para llenar el formulario con los datos a editar
      this.permisoForm.patchValue({
        nombre: this.permiso.nombre,
        apellidos: this.permiso.apellidos,
        idTipoPermiso: this.permiso.tipoPermiso?.id,
        // Formateamos la fecha para el input type="date"
        fecha: new Date(this.permiso.fecha).toISOString().substring(0, 10)
      });
    } else {
      this.permisoForm.reset();
    }
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

    const request$ = this.isEditMode && this.permiso
      ? this.permisoService.updatePermiso(this.permiso.id, formValue)
      : this.permisoService.addPermiso(formValue);

    request$.subscribe({
      next: () => {
        Swal.fire({
        text: "Permiso guardado correctamente",
        icon: "success"
      });
        this.onSave.emit(); 
        if (!this.isEditMode) {
          this.permisoForm.reset();
        }
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
