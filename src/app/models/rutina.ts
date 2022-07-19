import { EjercicioRutina } from "./ejercicio-rutina";
import { UsuarioRutina } from "./usuario-rutina";

export class Rutina {
    id!: number;
    idWeb!: string;
    nombre!: string;
    descripcion!: string;
    nivel!: string;
    ejercicios!: Array<EjercicioRutina>;
    usuarios!:  Array<UsuarioRutina>;
}
