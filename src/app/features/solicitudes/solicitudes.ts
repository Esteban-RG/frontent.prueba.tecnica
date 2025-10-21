import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { TipoPermiso } from '../../shared/models/TipoPermiso';
import { catchError, Observable, of } from 'rxjs';
import { Modal } from '../../shared/components/modal/modal';
import { PermisoService } from '../permisos/permiso-service';
import { Permiso } from '../../shared/models/Permiso';
import { TiposPermisoService } from '../tipos-permiso/tipos-permiso-service';
import { CommonModule } from '@angular/common';
import { SolicitudesTable } from './solicitudes-table/solicitudes-table';
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'app-solicitudes',
  imports: [CommonModule, Navbar, SolicitudesTable, Card],
  templateUrl: './solicitudes.html',
})
export class Solicitudes{


  @ViewChild('SolicitudFormModal') modalPermisoForm!: Modal;

  listaTiposPermiso$!: Observable<TipoPermiso[]>;
  listaDeSolicitudes$!: Observable<Permiso[]>;


  constructor(
    private permisoService: PermisoService,
    private tiposPermisoService: TiposPermisoService, 
    private cdr: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.recargarTiposPermiso();
    this.recargarSolicitudes();
  }

  recargarSolicitudes() {
      this.listaDeSolicitudes$ = this.permisoService.getPendingPermisos().pipe(
        catchError((error) => {
          console.error('Error al obtener las solicitudes:', error);
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

      addNewSolicitud() {
    if (this.modalPermisoForm) {
      this.modalPermisoForm.open();
    }
  }

  onSearch(permisos: Permiso[]) {
    this.listaDeSolicitudes$ = of(permisos);
  }
}
