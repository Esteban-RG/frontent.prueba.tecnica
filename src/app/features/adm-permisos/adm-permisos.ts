import { Component, OnInit, ViewChild } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { catchError, Observable, of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { TiposPermisoService } from '../../core/services/tipos-permiso-service';
import { TipoPermiso } from '../../shared/models/TipoPermiso';
import { Modal } from "../../shared/components/modal/modal";
import { AdmPermisosForm } from "./adm-permisos-form/adm-permisos-form";
import { CommonModule } from '@angular/common';
import { Card } from "../../shared/components/card/card";
import { SolicitudesTable } from "../solicitudes/solicitudes-table/solicitudes-table";
import { Permiso } from '../../shared/models/Permiso';
import { PermisoService } from '../permisos/permiso-service';
import { PermisoSearch } from "../permisos/permiso-search/permiso-search";


@Component({
  selector: 'app-adm-permisos',
  imports: [CommonModule, Navbar, Modal, AdmPermisosForm, Card, SolicitudesTable, PermisoSearch],
  templateUrl: './adm-permisos.html',
  styleUrl: './adm-permisos.css'
})
export class AdmPermisos implements OnInit{


  @ViewChild('PermisoFormModal') modalPermisoForm!: Modal;
  
  listaDeTipos$!: Observable<TipoPermiso[]>;
  listaDePermisos$!: Observable<Permiso[]>;

  constructor(
    private tiposPermisoService: TiposPermisoService, 
    private permisoService: PermisoService,
    private cdr: ChangeDetectorRef
  ){ }
  
  ngOnInit(): void {
    this.recargarTiposPermiso();
  }
  
  
  recargarTiposPermiso() {
    this.listaDeTipos$ = this.tiposPermisoService.getTiposPermiso().pipe(
      catchError((error) => {
        console.error('Error al obtener los tipos de permiso:', error);
        return of([]);
      })
    );
    this.cdr.detectChanges(); 
  }

  recargarPermisos() {
    this.listaDePermisos$ = this.permisoService.getPermisos().pipe(
      catchError((error) => {
        console.error('Error al obtener los permisos:', error);
        return of([]);
      })
    );
    this.cdr.detectChanges(); 
  }

  addNewPermiso() {
    if (this.modalPermisoForm) {
      this.modalPermisoForm.open();
    }
  }
  onSearch(permisos: Permiso[]) {
    this.listaDePermisos$ = of(permisos);
  }

}
