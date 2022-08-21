import { EjercicioRutina } from "./ejercicio-rutina";
import { UsuarioRutina } from "./usuario-rutina";

export class Rutina {
    id!: number;
    idWeb!: string;
    nombre!: string;
    descripcion!: string;
    nivel!: string;
    idUsuarioCreador!: number;
    ejercicios!: Array<EjercicioRutina>;
    usuarios!:  Array<UsuarioRutina>;
}
