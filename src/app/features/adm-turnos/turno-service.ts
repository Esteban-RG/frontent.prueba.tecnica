import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Turno } from '../../shared/models/Turno';
import { environment } from '../../../environments/environment';


export interface HorarioConTurno {
  idHorario: number;
  idUsuario: number;
  idTurno: number;
  turno: Turno;
}

export interface NewHorario {
  idUsuario: number;
  idTurno: number;
  fechaInicio: Date;
  fechaFin: Date | null; 
  esPredeterminado: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  
  private apiUrl = `${environment.apiUrl}/api/Turno`; 
  private apiHorariosUrl = `${environment.apiUrl}/api/Horario`; 


  private turnosSource = new BehaviorSubject<Turno[]>([]);
  public turnos$ = this.turnosSource.asObservable();

  constructor(private http: HttpClient) { }
  

  public loadTurnos(): void {
    this.http.get<Turno[]>(this.apiUrl).pipe(
      catchError(() => of([])) 
    ).subscribe(turnos => {
      this.turnosSource.next(turnos);
    });
  }


  public loadTurnosByUser(idUsuario: number): Observable<Turno[]> {
    return this.http.get<HorarioConTurno[]>(`${this.apiHorariosUrl}/Usuario/${idUsuario}`).pipe(
      map(horarios => horarios.map(h => h.turno)), // Transforma el array de Horario a Turno
      catchError(() => of([])) // En caso de error, devuelve un array vacío.
    );
  }


  public addTurnoToUser(userId: number, turnoId: number, fechaInicioStr: string, fechaFinStr: string | null): Observable<HorarioConTurno> {
    const newHorario: NewHorario = {
      idUsuario: userId,
      idTurno: turnoId,
      fechaInicio: new Date(fechaInicioStr), // Convertimos el string a Date
      fechaFin: fechaFinStr ? new Date(fechaFinStr) : null, // Convierte solo si existe
      esPredeterminado: false // Asumimos false, esto podría necesitar lógica de negocio
    };

    return this.http.post<HorarioConTurno>(`${this.apiHorariosUrl}/AsignarTurno`, newHorario);
  }

 
  public removeTurnoFromUser(userId: number, turnoId: number): Observable<void> {
    console.warn('El método removeTurnoFromUser no está implementado.');
    // return this.http.delete<void>(`${this.apiHorariosUrl}/DesasignarTurno/${userId}/${turnoId}`);
    return of(); 
  }


  public addTurno(turno: Partial<Turno>): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno).pipe(tap(() => {
      this.loadTurnos(); 
    }));
  }

  public updateTurno(turno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${turno.idTurno}`, turno).pipe(tap(() => {
      this.loadTurnos();
    }));
  }

  public deleteTurno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => {
      this.loadTurnos();
    }));
  }
}