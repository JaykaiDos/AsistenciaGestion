export interface Curso {
  value: string;
  label: string;
}

export interface Materia {
  value: string;
  label: string;
}

export const CURSOS_PREDEFINIDOS: Curso[] = [
  { value: '1ro', label: '1ro Año - Bachillerato' },
  { value: '2do', label: '2do Año - Bachillerato' },
  { value: '3ro', label: '3ro Año - Bachillerato' },
  { value: '4to', label: '4to Año - Bachillerato' },
  { value: '5to', label: '5to Año - Bachillerato' }
];

export const MATERIAS_PREDEFINIDAS: Materia[] = [
  { value: 'programacion', label: 'Programación' },
  { value: 'matematica', label: 'Matemática' },
  { value: 'lengua', label: 'Lengua y Literatura' },
  { value: 'fisica', label: 'Física' },
  { value: 'quimica', label: 'Química' },
  { value: 'historia', label: 'Historia' },
  { value: 'ingles', label: 'Inglés Técnico' }
];