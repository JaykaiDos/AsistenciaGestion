export interface Alumno {
  id: number;
  nombre: string;
  curso: string;
  email: string;
  telefono: string;
}

export interface AlumnoAsistencia {
  id: number;
  nombre: string;
  presente: boolean;
  estado: 'Presente' | 'Ausente';
}