import { TipoEjercicio } from "./tipo-ejercicio";

export class Ejercicio {
    id!: number;
    idWeb!: string;
    nombre!: string;
    descripcion!: string;
    urlEjercicio!: string;
    idTipoEjercicio!: number;
    tipoEjercicio!: TipoEjercicio;
}
