import { Component, ViewChild, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { PermisosTable } from "./permisos-table/permisos-table";
import { PermisoService } from './permiso-service'; 
import { TiposPermisoService } from '../../core/services/tipos-permiso-service';
import { Permiso } from '../../shared/models/Permiso';
import { TipoPermiso } from '../../shared/models/TipoPermiso';
import { Modal } from '../../shared/components/modal/modal';
import { Navbar } from '../../shared/components/navbar/navbar'; 
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { SolicitudesForm } from '../solicitudes/solicitudes-form/solicitudes-form';
import { Card } from "../../shared/components/card/card";
import { PermisoDetails } from './permiso-details/permiso-details';
import { PermisoSearch } from "./permiso-search/permiso-search";


@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, PermisosTable, Navbar, Card, Modal, SolicitudesForm, PermisoDetails],
  templateUrl: './permisos.html',
})

export class Permisos implements OnInit{
  isEmpl$: Observable<boolean>;

  @ViewChild('SolicitudFormModal') modalPermisoForm!: Modal;
  @ViewChild('PermisoDetailsModal') modalPermisoDetails!: Modal;


  permisoSeleccionado: Permiso | null = null;
  listaDePermisos$!: Observable<Permiso[]>;
  listaTiposPermiso$!: Observable<TipoPermiso[]>;
  listaSolicitudes$!: Observable<Permiso[]>;


  constructor(
    private permisosService: PermisoService,
    private tiposPermisoService: TiposPermisoService, 
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ){
    this.isEmpl$ = this.authService.hasRole('Empleado');
  }

  ngOnInit(): void {
    this.recargarPermisos();
    this.recargarTiposPermiso();
  }

  recargarPermisos(permisos?: Permiso[]) {
    if (permisos) {
      this.listaDePermisos$ = of(permisos);
    } else {
      this.listaDePermisos$ = this.permisosService.getMyPermisos().pipe(
        catchError((error) => {
          console.error('Error al obtener los permisos:', error);
          return of([]);
        })
      );
    }
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

  showDetails(permiso: Permiso) {
    this.permisoSeleccionado = permiso;
    if (this.modalPermisoDetails) {
      this.modalPermisoDetails.open();
    }
  }

  addNewSolicitud() {
    if (this.modalPermisoForm) {
      this.modalPermisoForm.open();
    }
  }
}
