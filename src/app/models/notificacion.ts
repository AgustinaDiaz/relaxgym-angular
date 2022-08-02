import { EstadoNotificacion } from "./estado-notificacion";
import { TipoNotificacion } from "./tipo-notificacion";
import { UsuarioNotificacion } from "./usuario-notificacion";

export class Notificacion {
    id!: number;
    idWeb!: string;
    titulo!: string;
    descripcion!: string;
    idEstadoNotificacion!: number;
    estadoNotificacion!: EstadoNotificacion;
    idTipoNotificacion!: number;
    tipoNotificacion!: TipoNotificacion;
    idUsuarios!: Array<number>;
    usuarios!: Array<UsuarioNotificacion>;
}
