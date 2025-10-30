import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/models/Usuario';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/User`;

  constructor(private http: HttpClient) { }

  private usersSource = new BehaviorSubject<Usuario[]>([]);
  public users$ = this.usersSource.asObservable();


  public getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      tap(usuarios => {
        this.usersSource.next(usuarios);
        console.log('Obtención de usuarios completada y estado actualizado.');
      }),
      catchError(error => {
        console.error('Error al obtener los usuarios:', error);
        return throwError(() => error);
      })
    );
  }

  getUserById(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
  
}
