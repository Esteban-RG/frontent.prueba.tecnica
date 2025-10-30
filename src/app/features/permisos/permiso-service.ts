import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permiso } from '../../shared/models/Permiso';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private apiUrl = `${environment.apiUrl}/api/Permiso`;

  constructor(private http: HttpClient) { }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.apiUrl);
  }

  getPendingPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${this.apiUrl}/EstatusPendiente`);
  }

  getMyPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${this.apiUrl}/MisPermisos`);
  }

  searchPermisos(tipoPermisoId: number, idEstatusPermiso: number): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${this.apiUrl}/Search?TipoPermisoId=${tipoPermisoId}&IdEstatusPermiso=${idEstatusPermiso}`);
  }

  addSolicitud(permisoData: Partial<Permiso>): Observable<Permiso> {
    return this.http.post<Permiso>(`${this.apiUrl}/Solicitud`, permisoData);
  }

  addPermiso(permisoData: Partial<Permiso>): Observable<Permiso> {
    return this.http.post<Permiso>(this.apiUrl, permisoData);
  }
  
  deletePermiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePermiso(permisoData: Partial<Permiso>): Observable<Permiso> {
    return this.http.put<Permiso>(`${this.apiUrl}/${permisoData.id}`, permisoData);
  }

  aprovePermiso(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/Aprobar/${id}`, {});
  }

  denyPermiso(id: number, comentariosSupervisor: string): Observable<void> { 
    return this.http.patch<void>(`${this.apiUrl}/Rechazar/${id}`, {comentariosSupervisor});
  } 
}
