import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Permiso } from '../../../shared/models/Permiso';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-permiso-details',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './permiso-details.html',
  styleUrl: './permiso-details.css'
})
export class PermisoDetails {
  @Input() permiso: Permiso | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
