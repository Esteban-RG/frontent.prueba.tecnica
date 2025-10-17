import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { TipoPermiso } from '../../../shared/models/TipoPermiso';
import { Usuario } from '../../../shared/models/Usuario';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PermisoService } from '../../permisos/permiso-service';

@Component({
  selector: 'app-adm-permisos-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adm-permisos-form.html',
  styleUrl: './adm-permisos-form.css'
})
export class AdmPermisosForm implements OnInit {
  @Input() tiposPermiso: TipoPermiso[] | null = []; 
  @Input() usuarios: Usuario[] | null = []; 
  @Output() onSave = new EventEmitter<void>();
  permisoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private permisoService: PermisoService,
    private cdr: ChangeDetectorRef
  ){
    this.permisoForm = this.fb.group({
      usuarioId: [null],
      nombreEmpleado: [null, Validators.required],
      apellidosEmpleado: [null, Validators.required],
      idTipoPermiso: [null, Validators.required],
      fechaPermiso: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.permisoForm.get('usuarioId')?.valueChanges.subscribe(userId => {
      if (userId) {
        const selectedUser = this.usuarios?.find(user => user.id === +userId);
        if (selectedUser) {
          this.permisoForm.patchValue({
            nombreEmpleado: selectedUser.nombre,
            apellidosEmpleado: selectedUser.apellidos
          });
        }
      } else {
        this.permisoForm.patchValue({
          nombreEmpleado: null,
          apellidosEmpleado: null
        });
      }

    });
    this.cdr.detectChanges(); 

  }

  onSubmit() {
    const formValue = this.permisoForm.value;

    this.permisoService.addPermiso(formValue).subscribe({
      next: () => {
        alert('Permiso guardado correctamente');
        this.onSave.emit(); 
        this.permisoForm.reset();
      },
      error: (err) => {
        console.error('Error al guardar el permiso:', err);
      }
    });

  }
}
