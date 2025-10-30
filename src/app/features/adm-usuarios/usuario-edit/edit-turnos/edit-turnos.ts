import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../../../../shared/models/Turno';
import { TurnoService } from '../../../adm-turnos/turno-service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../shared/models/Usuario';

@Component({
  selector: 'app-edit-turnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-turnos.html',
  styleUrl: './edit-turnos.css'
})
export class EditTurnos implements OnInit, OnChanges{
  turnos$!: Observable<Turno[]>;
  turnosByUser!: Observable<Turno[]>;

  @Input() usuario: Usuario | null = null;

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.turnos$ = this.turnoService.turnos$;
    this.turnoService.loadTurnos();

    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.usuario && this.usuario.id) {
      this.turnosByUser = this.turnoService.loadTurnosByUser(this.usuario.id);
    }
  }

  
  handleAdd(idTurno: string, fechaInicio: string, fechaFin: string): void {
    if (!this.usuario || !this.usuario.id) {
      console.error('Error: No se ha proporcionado un usuario válido.');
      return;
    }

    if (!fechaInicio) {
      console.error('Error: La fecha de inicio es obligatoria.');
      return;
    }

    const turnoId = parseInt(idTurno, 10);
    if (isNaN(turnoId)) {
      console.error('Error: El ID del turno no es válido.');
      return;
    }

    // El servicio se encargará de la conversión de string a Date
    this.turnoService.addTurnoToUser(this.usuario.id, turnoId, fechaInicio, fechaFin).subscribe(() => {
      if(this.usuario?.id) {
        this.turnosByUser = this.turnoService.loadTurnosByUser(this.usuario.id);
        alert("Se ha registrado un horario correctamente");
      }
    });
  }


  handleDelete(idTurno: number): void {
    if (!this.usuario || !this.usuario.id) {
      console.error('Error: No se ha proporcionado un usuario válido.');
      return;
    }
    this.turnoService.removeTurnoFromUser(this.usuario.id, idTurno).subscribe(() => {
      if(this.usuario?.id) {
        this.turnosByUser = this.turnoService.loadTurnosByUser(this.usuario.id);
      }
    });
  }
}
