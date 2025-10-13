import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPermiso } from '../../shared/models/TipoPermiso';


@Injectable({
  providedIn: 'root'
})
export class TiposPermisoService {
  private apiUrl = 'https://localhost:44325/api/TipoPermiso';

  constructor(private http: HttpClient) { }

  getTiposPermiso(): Observable<TipoPermiso[]> {
    return this.http.get<TipoPermiso[]>(this.apiUrl);
  }

  addTipoPermiso(permisoData: Partial<TipoPermiso>): Observable<TipoPermiso> {
    return this.http.post<TipoPermiso>(this.apiUrl, permisoData);
  }

  updateTipoPermiso(id: number, permisoData: Partial<TipoPermiso>): Observable<TipoPermiso> {
    return this.http.put<TipoPermiso>(`${this.apiUrl}/${id}`, permisoData);
  }

  
}