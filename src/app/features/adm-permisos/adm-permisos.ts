import { Component, OnInit, ViewChild } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { catchError, Observable, of } from 'rxjs';
import { Usuario } from '../../shared/models/Usuario';
import { UserService } from '../../core/services/user-service';
import { ChangeDetectorRef } from '@angular/core';
import { TiposPermisoService } from '../tipos-permiso/tipos-permiso-service';
import { TipoPermiso } from '../../shared/models/TipoPermiso';
import { Modal } from "../../shared/components/modal/modal";
import { AdmPermisosForm } from "./adm-permisos-form/adm-permisos-form";
import { CommonModule } from '@angular/common';
import { Card } from "../../shared/components/card/card";
import { SolicitudesTable } from "../solicitudes/solicitudes-table/solicitudes-table";
import { Permiso } from '../../shared/models/Permiso';
import { PermisoService } from '../permisos/permiso-service';
import { AuthService } from '../../core/services/auth-service';


@Component({
  selector: 'app-adm-permisos',
  imports: [CommonModule, Navbar, Modal, AdmPermisosForm, Card, SolicitudesTable],
  templateUrl: './adm-permisos.html',
  styleUrl: './adm-permisos.css'
})
export class AdmPermisos implements OnInit{

  @ViewChild('PermisoFormModal') modalPermisoForm!: Modal;
  
  listaDeUsuarios$!: Observable<Usuario[]>;
  listaDeTipos$!: Observable<TipoPermiso[]>;
  listaDePermisos$!: Observable<Permiso[]>;
  isAdmin: boolean = false;
  
  constructor(
    private userService: UserService,
    private tiposPermisoService: TiposPermisoService, 
    private permisoService: PermisoService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ){
    this.isAdmin = this.authService.hasRole('Administrador');
  }
  
  ngOnInit(): void {
    this.recargarUsuarios();
    this.recargarTiposPermiso();
    this.recargarPermisos();
  }
  
  recargarUsuarios() {
    this.listaDeUsuarios$ = this.userService.getUsers().pipe(catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return of([]);
      })
    );
    this.cdr.detectChanges(); 
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

}
