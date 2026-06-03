import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoLocalStorageService } from '../../services/alumno.service';
import { AsistenciaLocalStorageService } from '../../services/asistencia.service';
import { AlumnoAsistencia } from '../../models/alumno.model';
import { CURSOS_PREDEFINIDOS, MATERIAS_PREDEFINIDAS } from '../../models/curso.model';

interface CursoOption {
  value: string;
  label: string;
}

interface MateriaOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-asistencia.component.html',
  styleUrls: ['./registrar-asistencia.component.scss']
})
export class RegistrarAsistenciaComponent {
  cursoSeleccionado: string = '';
  materiaSeleccionada: string = '';
  fecha: string = '';
  alumnos: AlumnoAsistencia[] = [];

  cursos: CursoOption[] = CURSOS_PREDEFINIDOS;

  materias: MateriaOption[] = MATERIAS_PREDEFINIDAS;

  guardado: boolean = false;

  constructor(
    private alumnoService: AlumnoLocalStorageService,
    private asistenciaService: AsistenciaLocalStorageService
  ) {
    const hoy = new Date();
    this.fecha = hoy.toISOString().split('T')[0];
  }

  cargarAlumnosDelCurso() {
    if (!this.cursoSeleccionado) return;

    const alumnosDelCurso = this.alumnoService.findByCurso(this.cursoSeleccionado);

    this.alumnos = alumnosDelCurso.map(alumno => ({
      id: alumno.id,
      nombre: alumno.nombre,
      presente: true,
      estado: 'Presente'
    }));

    this.guardado = false;
  }

  onCursoChange() {
    this.cargarAlumnosDelCurso();
  }

  toggleAsistencia(alumno: AlumnoAsistencia) {
    alumno.presente = !alumno.presente;
    alumno.estado = alumno.presente ? 'Presente' : 'Ausente';
  }

    seleccionarTodo() {
    this.alumnos.forEach(alumno => {
      alumno.presente = true;
      alumno.estado = 'Presente';
    });
  }

  deseleccionarTodo() {
    this.alumnos.forEach(alumno => {
      alumno.presente = false;
      alumno.estado = 'Ausente';
    });
  }

  guardarAsistencia() {
    if (!this.cursoSeleccionado || !this.materiaSeleccionada) return;

    const cursoLabel = this.cursos.find(c => c.value === this.cursoSeleccionado)?.label || this.cursoSeleccionado;
    const materiaLabel = this.materias.find(m => m.value === this.materiaSeleccionada)?.label || this.materiaSeleccionada;

        this.asistenciaService.create({
      fecha: this.fecha,
      curso: cursoLabel,
      materia: materiaLabel,
      registradoPor: 'profesor@escuela.edu',
      horaModificacion: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      presentes: this.presentesCount,
      ausentes: this.ausentesCount,
      alumnos: this.alumnos.map(a => ({
        ...a,
        estado: a.presente ? 'Presente' : 'Ausente'
      }))
    });

    this.guardado = true;
  }

  notificarWhatsApp() {
    if (!this.guardado) return;

    const ausentes = this.alumnos.filter(a => !a.presente);
    const mensaje = `Reporte de Asistencia - ${this.cursoSeleccionado} - ${this.materiaSeleccionada}%0AFecha: ${this.fecha}%0A%0AAusentes: ${ausentes.length}%0APresentes: ${this.alumnos.length - ausentes.length}`;
    window.open(`https://wa.me/?text=${mensaje}`, '_blank');
  }

  get presentesCount(): number {
    return this.alumnos.filter(a => a.presente).length;
  }

  get ausentesCount(): number {
    return this.alumnos.filter(a => !a.presente).length;
  }
}