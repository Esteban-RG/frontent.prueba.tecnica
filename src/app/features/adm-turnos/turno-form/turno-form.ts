import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnoService } from '../turno-service';
import { CommonModule } from '@angular/common';
import { Turno } from '../../../shared/models/Turno';

@Component({
  selector: 'app-turno-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './turno-form.html',
  styleUrl: './turno-form.css'
})
export class TurnoForm implements OnChanges {
  @Input() turno: Turno | null = null;
  turnoForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private turnoService: TurnoService
  ){
    this.turnoForm = this.fb.group({
      idTurno: [null],
      idCodigoTurno: [null, Validators.required],
      horaInicio: [null, Validators.required],
      horaFin: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['turno'] && changes['turno'].currentValue) {
      this.isEdit = true;
      this.turnoForm.get('idTurno')?.setValue(this.turno?.idTurno);
      this.turnoForm.get('idCodigoTurno')?.setValue(this.turno?.codigoTurno.idCodigoTurno);
      this.turnoForm.get('horaInicio')?.setValue(this.turno?.horaInicio.slice(0, 5));
      this.turnoForm.get('horaFin')?.setValue(this.turno?.horaFin.slice(0, 5));
    } else {
      this.isEdit = false;
      this.turnoForm.reset();
    }
  }


  onSubmit() {
    const formValue = this.turnoForm.value;
    if(this.isEdit) {
      this.turnoService.updateTurno(formValue).subscribe({
        next: () => {
          alert('Turno actualizado correctamente');
          this.turnoService.loadTurnos();
          this.turnoForm.reset();
          this.isEdit = false;
        },
        error: (err) => {
          console.error('Error al actualizar el turno:', err);
        }
      });
    } else {
      this.turnoService.addTurno(formValue).subscribe({
        next: () => {
          alert('Turno guardado correctamente');
          this.turnoService.loadTurnos();
          this.turnoForm.reset();
        },
        error: (err) => {
          console.error('Error al guardar el permiso:', err);
        }
      });
    }
  }
}
