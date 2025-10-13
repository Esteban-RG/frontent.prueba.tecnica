import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PermisosForm } from './permisos-form/permisos-form';
import { PermisosTable } from "./permisos-table/permisos-table";
import { PermisoService } from '../../core/services/permiso-service'; 
import { TiposPermisoService } from '../../core/services/tipos-permiso-service';
import { Permiso } from '../../shared/models/Permiso';
import { TipoPermiso } from '../../shared/models/TipoPermiso';
import { Modal } from '../../shared/components/modal/modal';
import { Navbar } from '../../shared/components/navbar/navbar'; 
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, PermisosTable, PermisosForm, Modal, Navbar],
  templateUrl: './permisos.html',
})

export class Permisos implements OnInit{

  @ViewChild('PermisoFormModal') modalPermisoForm!: Modal;

  permisoSeleccionado?: Permiso;
  listaDePermisos$!: Observable<Permiso[]>;
  listaTiposPermiso$!: Observable<TipoPermiso[]>;

  constructor(
    private permisosService: PermisoService,
    private tiposPermisoService: TiposPermisoService, 
    private cdr: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.recargarPermisos();
    this.recargarTiposPermiso();
  }
  

  seleccionarPermisoParaEditar(permiso: Permiso) {
    this.permisoSeleccionado = permiso;
  }

  recargarPermisos() {
    this.listaDePermisos$ = this.permisosService.getPermisos().pipe(
      catchError((error) => {
        console.error('Error al obtener los permisos:', error);
        return of([]);
      })
    );
    this.cdr.detectChanges();
  }

  recargarTiposPermiso() {
    this.listaTiposPermiso$ = this.tiposPermisoService.getTiposPermiso().pipe(
      catchError((error) => {
        console.error('Error al obtener los tipos de permiso:', error);
        return of([]);
      })
    );
    this.cdr.detectChanges();
  }

  seleccionarPermiso($event: Permiso) {
    this.permisoSeleccionado = $event;

    if (this.modalPermisoForm) {
      this.modalPermisoForm.open();
    }
  }

  addNewPermission() {
    this.permisoSeleccionado = undefined;
    if (this.modalPermisoForm) {
      this.modalPermisoForm.open();
    }
  }
}
