import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaLocalStorageService } from '../../services/asistencia.service';
import { RegistroAsistencia } from '../../models/asistencia.model';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  fechaFiltro: string = '';
  cursoFiltro: string = '';
  registroSeleccionado: RegistroAsistencia | null = null;
  mostrandoDetalle: boolean = false;

  cursos = [
    { value: '1ro', label: '1ro Año' },
    { value: '2do', label: '2do Año' },
    { value: '3ro', label: '3ro Año' },
    { value: '4to', label: '4to Año' },
    { value: '5to', label: '5to Año' }
  ];

  constructor(private asistenciaService: AsistenciaLocalStorageService) {}

  get registros(): RegistroAsistencia[] {
    return this.asistenciaService.findAll();
  }

  get registrosFiltrados(): RegistroAsistencia[] {
    return this.registros.filter(registro => {
      const coincideFecha = !this.fechaFiltro || registro.fecha === this.fechaFiltro;
      const coincideCurso = !this.cursoFiltro || registro.curso.includes(this.cursoFiltro);
      return coincideFecha && coincideCurso;
    });
  }

  verDetalle(registro: RegistroAsistencia) {
    this.registroSeleccionado = registro;
    this.mostrandoDetalle = true;
  }

  cerrarDetalle() {
    this.mostrandoDetalle = false;
    this.registroSeleccionado = null;
  }

  getEstadoClass(estado: string): string {
    return estado === 'Presente' ? 'presente' : 'ausente';
  }

  getTotalPresentes(): number {
    return this.registros.reduce((acc, reg) => acc + reg.presentes, 0);
  }

  getTotalAusentes(): number {
    return this.registros.reduce((acc, reg) => acc + reg.ausentes, 0);
  }

  limpiarHistorial() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los registros de asistencia? Esta acción no se puede deshacer.')) {
      this.asistenciaService.limpiarRegistros();
      this.mostrandoDetalle = false;
      this.registroSeleccionado = null;
      alert('Historial limpiado correctamente');
    }
  }
}