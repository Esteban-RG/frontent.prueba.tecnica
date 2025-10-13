import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permiso } from '../../shared/models/Permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private apiUrl = 'https://localhost:44325/api/Permiso';

  constructor(private http: HttpClient) { }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.apiUrl);
  }

  addPermiso(permisoData: Partial<Permiso>): Observable<Permiso> {
    return this.http.post<Permiso>(this.apiUrl, permisoData);
  }

  updatePermiso(id: number, permisoData: Partial<Permiso>): Observable<Permiso> {
    return this.http.put<Permiso>(`${this.apiUrl}/${id}`, permisoData);
  }
  
  deletePermiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
