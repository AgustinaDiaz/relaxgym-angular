import { EstadoUsuario } from "./estado-usuario";
import { Rol } from "./rol";

export class Usuario {
    id!: number;
    idWeb!: string;
    nombre!: string;
    apellido!: string;
    nombreCompleto!: string;
    email!: string;
    telefono!: number;
    nombreUsuario!: string;
    claveUsuario!: string;
    fechaAlta!: Date;
    idEstadoUsuario!: number;
    estadoUsuario!: EstadoUsuario;
    selected!: boolean;
    idRol!: number;
    rol!: Rol;
}
