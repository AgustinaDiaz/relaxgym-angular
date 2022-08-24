import { Clase } from "./clase";
import { UsuarioTurno } from "./usuario-turno";

export class Turno {
    id!: number;
    idWeb!: string;
    idClase!: number;
    clase!: Clase;
    cantidadAlumnos!: number;
    observacion!: string;
    fechaHora!: Date;
    idEntrenadorAsignado!: number;
    usuarios!:  Array<UsuarioTurno>;
}
