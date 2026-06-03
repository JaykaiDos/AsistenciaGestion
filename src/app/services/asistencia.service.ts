import { Injectable } from '@angular/core';
import { RegistroAsistencia } from '../models/asistencia.model';
import { AsistenciaRepository } from '../repositories/asistencia.repository';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'asistencia_registros';

@Injectable({ providedIn: 'root' })
export class AsistenciaLocalStorageService extends AsistenciaRepository {
  
  private registros: RegistroAsistencia[] = [];

  constructor(private storage: StorageService) {
    super();
    this.cargarDatos();
  }

  private cargarDatos(): void {
    const datos = this.storage.getItem<RegistroAsistencia[]>(STORAGE_KEY);
    this.registros = datos || [];
  }

  private guardarDatos(): void {
    this.storage.setItem(STORAGE_KEY, this.registros);
  }

  private generarId(): number {
    return this.registros.length > 0 
      ? Math.max(...this.registros.map(r => r.id)) + 1 
      : 1;
  }

  findAll(): RegistroAsistencia[] {
    return [...this.registros].sort((a, b) => 
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  }

  findById(id: number): RegistroAsistencia | undefined {
    return this.registros.find(r => r.id === id);
  }

  findByFecha(fecha: string): RegistroAsistencia[] {
    return this.registros.filter(r => r.fecha === fecha);
  }

  findByCursoMateriaFecha(curso: string, materia: string, fecha: string): RegistroAsistencia | undefined {
    return this.registros.find(r => 
      r.curso === curso && r.materia === materia && r.fecha === fecha
    );
  }

  create(item: Omit<RegistroAsistencia, 'id'>): RegistroAsistencia {
    // Evitar duplicados por curso/materia/fecha
    const existente = this.findByCursoMateriaFecha(item.curso, item.materia, item.fecha);
    if (existente) {
      // Actualizar existente
      return this.update(existente.id, item) || this.crearNuevo(item);
    }
    return this.crearNuevo(item);
  }

  private crearNuevo(item: Omit<RegistroAsistencia, 'id'>): RegistroAsistencia {
    const nuevo: RegistroAsistencia = {
      ...item,
      id: this.generarId()
    };
    this.registros.push(nuevo);
    this.guardarDatos();
    return nuevo;
  }

  update(id: number, item: Partial<RegistroAsistencia>): RegistroAsistencia | undefined {
    const index = this.registros.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    
    this.registros[index] = { ...this.registros[index], ...item };
    this.guardarDatos();
    return this.registros[index];
  }

  delete(id: number): boolean {
    const index = this.registros.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    this.registros.splice(index, 1);
    this.guardarDatos();
    return true;
  }

  limpiarRegistros(): void {
    this.registros = [];
    this.guardarDatos();
  }
}