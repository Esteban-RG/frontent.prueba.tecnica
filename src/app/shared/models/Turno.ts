export interface Turno {
    idTurno: number,
    horaInicio: string,
    horaFin: string,
    duracionHoras: number,
    activo: boolean,
    rotativo: boolean,
    codigoTurno: {
        idCodigoTurno: number,
        descripcion: string
    }
}