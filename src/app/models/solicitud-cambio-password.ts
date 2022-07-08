import { EstadoSolicitud } from "./estado-solicitud";
import { Usuario } from "./usuario";

export class SolicitudCambioPassword {
    id!: number;
    idWeb!: string;
    fechaSolicitud!: Date;
    fechaConfirmacion!: Date;
    antiguaClave!: string;
    nuevaClave!: string;
    idEstadoSolicitud!: number;
    estadoSolicitud!: EstadoSolicitud;
    idUsuario!: number;
    usuario!: Usuario;
}
