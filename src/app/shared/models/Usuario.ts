export interface Usuario {
    emit(usuario: Usuario): unknown;
    id: number;
    nombre: string;
    apellidos: string;
    email: string
}