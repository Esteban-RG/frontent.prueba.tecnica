import { Component, Input } from '@angular/core';
import { Usuario } from '../../../shared/models/Usuario';
import { EditTurnos } from "./edit-turnos/edit-turnos";

@Component({
  selector: 'app-usuario-edit',
  imports: [EditTurnos],
  templateUrl: './usuario-edit.html',
  styleUrl: './usuario-edit.css'
})
export class UsuarioEdit {
  @Input() usuario: Usuario | null = null;
}
