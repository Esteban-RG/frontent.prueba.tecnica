export interface Permiso {
  id: number;
  nombreEmpleado: string;
  apellidosEmpleado: string;
  tipoPermiso: {
    id: number;
    descripcion: string;
  }
  estatusPermiso: {
    id: number;
    descripcion: string;
  }
  fechaPermiso: Date;
  fechaRevision: Date;
  comentariosSupervisor: string;
}