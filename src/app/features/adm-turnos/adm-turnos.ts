import { Component, OnInit, ViewChild } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { TurnoForm } from './turno-form/turno-form';
import { Modal } from "../../shared/components/modal/modal";
import { Turno } from '../../shared/models/Turno';
import { Observable } from 'rxjs';
import { TurnoService } from './turno-service';
import { Card } from "../../shared/components/card/card";
import { TurnosTable } from "./turnos-table/turnos-table";

@Component({
  selector: 'app-adm-turnos',
  standalone: true,
  imports: [Navbar, Modal, TurnoForm, Card, TurnosTable],
  templateUrl: './adm-turnos.html',
  styleUrl: './adm-turnos.css'
})

export class AdmTurnos{
  @ViewChild('TurnoFormModal') modalTurnoForm!: Modal;
  selectedTurno: Turno | null = null;

  addNewTurno() {
    this.selectedTurno = null;
    if (this.modalTurnoForm) {
      this.modalTurnoForm.open();
    }
  }

  handleEditTurno(turno: Turno) {
    this.selectedTurno = turno;
    if (this.modalTurnoForm) {
      this.modalTurnoForm.open();
    }
  }

  closeModal() {
    this.selectedTurno = null;
    if (this.modalTurnoForm) {
      this.modalTurnoForm.close();
    }
  }
}
