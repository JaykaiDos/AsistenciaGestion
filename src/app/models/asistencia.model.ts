import { AlumnoAsistencia } from './alumno.model';

export interface RegistroAsistencia {
  id: number;
  fecha: string;
  curso: string;
  materia: string;
  registradoPor: string;
  horaModificacion: string;
  presentes: number;
  ausentes: number;
  alumnos: AlumnoAsistencia[];
}

export interface FiltroAsistencia {
  fecha?: string;
  curso?: string;
  materia?: string;
}