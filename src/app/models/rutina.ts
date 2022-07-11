import { EjercicioRutina } from "./ejercicio-rutina";

export class Rutina {
    id!: number;
    idWeb!: string;
    nombre!: string;
    descripcion!: string;
    cantidadRondas!: number;
    nivel!: number;
    ejercicios!: EjercicioRutina;
}
