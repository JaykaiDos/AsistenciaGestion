import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoLocalStorageService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-administrar-matricula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrar-matricula.component.html',
  styleUrls: ['./administrar-matricula.component.scss']
})
export class AdministrarMatriculaComponent {
  nombreNuevo: string = '';
  cursoSeleccionado: string = '';
  emailNuevo: string = '';
  telefonoNuevo: string = '';

  cursos = [
    { value: '1ro', label: '1ro Año - Bachillerato' },
    { value: '2do', label: '2do Año - Bachillerato' },
    { value: '3ro', label: '3ro Año - Bachillerato' },
    { value: '4to', label: '4to Año - Bachillerato' },
    { value: '5to', label: '5to Año - Bachillerato' }
  ];

  mostrarExito: boolean = false;
  mensajeExito: string = '';

  constructor(private alumnoService: AlumnoLocalStorageService) { }

  get alumnos(): Alumno[] {
    return this.alumnoService.findAll();
  }

  get alumnosOrdenados(): Alumno[] {
    return [...this.alumnos].sort((a, b) => {
      if (a.curso !== b.curso) {
        return a.curso.localeCompare(b.curso);
      }
      return a.nombre.localeCompare(b.nombre);
    });
  }

  registrarAlumno() {
    if (!this.nombreNuevo.trim() || !this.cursoSeleccionado) {
      return;
    }

    this.alumnoService.create({
      nombre: this.nombreNuevo,
      curso: this.cursoSeleccionado,
      email: this.emailNuevo,
      telefono: this.telefonoNuevo
    });

    this.limpiarFormulario();
    this.mostrarMensaje('Alumno registrado correctamente');
  }

  eliminarAlumno(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      this.alumnoService.delete(id);
      this.mostrarMensaje('Alumno eliminado correctamente');
    }
  }

  cargarDatosPrueba() {
    this.alumnoService.cargarDatosPrueba();
    this.mostrarMensaje('Datos de prueba cargados exitosamente');
  }

  limpiarBaseDatos() {
    if (confirm('¿Estás seguro de que deseas limpiar toda la base de datos? Esta acción no se puede deshacer.')) {
      this.alumnoService.limpiarDatos();
      this.mostrarMensaje('Base de datos limpiada correctamente');
    }
  }

  limpiarFormulario() {
    this.nombreNuevo = '';
    this.cursoSeleccionado = '';
    this.emailNuevo = '';
    this.telefonoNuevo = '';
  }

  mostrarMensaje(mensaje: string) {
    this.mensajeExito = mensaje;
    this.mostrarExito = true;
    setTimeout(() => {
      this.mostrarExito = false;
    }, 3000);
  }

  getCursoLabel(valor: string): string {
    const curso = this.cursos.find(c => c.value === valor);
    return curso ? curso.label : valor;
  }
}