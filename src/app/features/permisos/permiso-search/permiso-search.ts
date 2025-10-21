import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { PermisoService } from '../permiso-service';
import { Permiso } from '../../../shared/models/Permiso';

@Component({
  selector: 'app-permiso-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './permiso-search.html',
  styleUrls: ['./permiso-search.css']
})
export class PermisoSearch implements OnInit {
  @Output() onSearch = new EventEmitter<Permiso[]>();

  searchForm: FormGroup;

  constructor(private permisoService: PermisoService) {
    this.searchForm = new FormGroup({
      'TipoPermisoId': new FormControl(''),
      'idEstatusPermiso': new FormControl('')
    });
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(
      startWith(this.searchForm.value), // Emit initial value
      debounceTime(300),
      switchMap(values => {
        const { TipoPermisoId, idEstatusPermiso } = values;
        return this.permisoService.searchPermisos(TipoPermisoId | 0, idEstatusPermiso | 0);
      })
    ).subscribe(permisos => {
      this.onSearch.emit(permisos);
    });
  }

}
