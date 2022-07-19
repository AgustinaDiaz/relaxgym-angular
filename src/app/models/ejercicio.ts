import { TipoEjercicio } from "./tipo-ejercicio";

export class Ejercicio {
    id!: number;
    idWeb!: string;
    nombre!: string;
    descripcion!: string;
    urlEjercicio!: string;
    selected!: boolean;
    cantidadRepeticiones!: number;
    series!: number;
    idTipoEjercicio!: number;
    tipoEjercicio!: TipoEjercicio;
}
