import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Usuario } from '../../../shared/models/Usuario';
import { UserService } from '../../../core/services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios-table',
  imports: [CommonModule],
  templateUrl: './usuarios-table.html',
  styleUrl: './usuarios-table.css'
})
export class UsuariosTable implements OnInit{

  usuarios$: Observable<Usuario[]>;
  @Output() usuario = new EventEmitter<Usuario>();

  constructor(
    private userService: UserService
  ){
    this.usuarios$ = this.userService.users$;
  }

  ngOnInit(): void {
    this.loadUsers();
  }
 

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
          error: err => console.error('Error al cargar la lista inicial de usuarios', err)
    });
  }

  handleEdit(usuario: Usuario) {
    this.usuario.emit(usuario);
  }
}
