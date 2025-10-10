export interface Permiso {
  id: number;
  nombre: string;
  apellidos: string;
  tipoPermiso: {
    id: number;
    descripcion: string;
  }
  fecha: Date;
}