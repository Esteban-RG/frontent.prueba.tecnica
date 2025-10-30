import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../../../shared/models/Turno';
import { TurnoService } from '../turno-service';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos-table',
  standalone: true,
  imports: [CommonModule, SlicePipe],
  templateUrl: './turnos-table.html',
  styleUrl: './turnos-table.css'
})
export class TurnosTable implements OnInit {
    @Output() editTurno = new EventEmitter<Turno>();
    turnos$!: Observable<Turno[]>;
    constructor(
    private turnoService: TurnoService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.turnos$ = this.turnoService.turnos$;
    this.recargarTurnos();
  }

  recargarTurnos() {
    this.turnoService.loadTurnos();
    this.cdr.detectChanges(); 
  }

  handleEdit(turno: Turno) {
    this.editTurno.emit(turno);
  }

  handleDelete(id: number) {
    Swal.fire({
      title: "Eliminar turno",
      text: "¿Estás seguro de que deseas eliminar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) { 
        this.deleteTurno(id);
      }
    });
  }

  deleteTurno(id: number) {
    this.turnoService.deleteTurno(id).subscribe(() => {
      this.recargarTurnos();
    });
  }
}
