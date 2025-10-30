import { Component, ViewChild } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { UsuariosTable } from "./usuarios-table/usuarios-table";
import { Card } from "../../shared/components/card/card";
import { UsuarioEdit } from "./usuario-edit/usuario-edit";
import { Modal } from "../../shared/components/modal/modal";
import { Usuario } from '../../shared/models/Usuario';

@Component({
  selector: 'app-adm-usuarios',
  standalone: true,
  imports: [Navbar, UsuariosTable, Card, UsuarioEdit, Modal],
  templateUrl: './adm-usuarios.html',
  styleUrl: './adm-usuarios.css'
})
export class AdmUsuarios {
  @ViewChild('UsuarioModal') modalUsuario!: Modal;
  selectedUsuario: Usuario | null = null;
  
  openModal(usuario: Usuario){
    this.selectedUsuario = usuario;
    if (this.modalUsuario) {
      this.modalUsuario.open();
    }
  }

  closeModal() {
    this.selectedUsuario = null;
    if (this.modalUsuario) {
      this.modalUsuario.close();
    }
  }
}
