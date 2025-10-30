export interface Notificacion{
    idNotificacion: number,
    titulo: string,
    mensaje: string,
    payload: string,
    fechaCreacion: Date,
    fechaEnvioProgramada: Date,
    tipoNotificacion: {
        idTipoNotificacion: number,
        descripcion: string
    }
    nivelNotificacion: {
        idNivelnotificacion: number,
        descripcion: string
    }
    estatusNotificacion: {
        idEstatusNotificacion: number,
        descripcion: string
    }

}