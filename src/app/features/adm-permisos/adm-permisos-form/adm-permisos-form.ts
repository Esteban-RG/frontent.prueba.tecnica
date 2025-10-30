import { Component, Input, Output, EventEmitter, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // ¡Importante!
import { Observable, take, switchMap, of, map } from 'rxjs'; // ¡Importante!
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoPermiso } from '../../../shared/models/TipoPermiso';
import { Usuario } from '../../../shared/models/Usuario';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../../permisos/permiso-service';
import { UserService } from '../../../core/services/user-service';


@Component({
  selector: 'app-adm-permisos-form',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adm-permisos-form.html',
  styleUrl: './adm-permisos-form.css'
})
export class AdmPermisosForm implements OnInit {
  usuarios$: Observable<Usuario[]>;
  permisoForm: FormGroup;
  
  @Input() tiposPermiso: TipoPermiso[] | null = []; 
  @Output() onSave = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private permisoService: PermisoService,
    private userService: UserService,
    private destroyRef: DestroyRef 
  ){
    this.usuarios$ = this.userService.users$;
    this.permisoForm = this.fb.group({
      usuarioId: [null],
      nombreEmpleado: [null, Validators.required],
      apellidosEmpleado: [null, Validators.required],
      idTipoPermiso: [null, Validators.required],
      fechaPermiso: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsersIfNeeded();
    this.setupUserSelectionListener();
  }

  private loadUsersIfNeeded(): void {
    this.usuarios$.pipe(take(1)).subscribe(currentUsers => {
      if (currentUsers.length === 0) {
        this.userService.getUsers().subscribe({
          error: err => console.error('Error al cargar la lista inicial de usuarios', err)
        });
      }
    });
  }

  private setupUserSelectionListener(): void {
    const usuarioIdControl = this.permisoForm.get('usuarioId');
    if (!usuarioIdControl) return;

    usuarioIdControl.valueChanges.pipe(
      switchMap(selectedUserId => {
        if (!selectedUserId) {
          return of(null);
        }
        return this.usuarios$.pipe(
          take(1),
          map(users => users.find(user => user.id === +selectedUserId) || null)
        );
      }),
      takeUntilDestroyed(this.destroyRef) 
    ).subscribe(selectedUser => {
      if (selectedUser) {
        this.permisoForm.patchValue({
          nombreEmpleado: selectedUser.nombre,
          apellidosEmpleado: selectedUser.apellidos
        }, { emitEvent: false }); 
      } else {
        this.permisoForm.patchValue({
          nombreEmpleado: null,
          apellidosEmpleado: null
        }, { emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.permisoForm.invalid) {
      this.permisoForm.markAllAsTouched(); 
      return;
    }

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