import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { AlumnoRepository } from '../repositories/alumno.repository';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'asistencia_alumnos';
const DATOS_INICIALES: Alumno[] = [
  { id: 1, nombre: 'García López, María Fernanda', curso: '1ro', email: 'maria.garcia@estudiante.edu', telefono: '+1 234 567 8901' },
  { id: 2, nombre: 'Rodríguez Pérez, Juan Carlos', curso: '1ro', email: 'juan.rodriguez@estudiante.edu', telefono: '+1 234 567 8902' },
  { id: 3, nombre: 'Martínez Silva, Ana Sofía', curso: '2do', email: 'ana.martinez@estudiante.edu', telefono: '+1 234 567 8903' },
  { id: 4, nombre: 'Hernández Díaz, Luis Ángel', curso: '2do', email: 'luis.hernandez@estudiante.edu', telefono: '+1 234 567 8904' },
  { id: 5, nombre: 'González Torres, Carlos Eduardo', curso: '3ro', email: 'carlos.gonzalez@estudiante.edu', telefono: '+1 234 567 8905' },
  { id: 6, nombre: 'López Ramírez, Laura Isabel', curso: '3ro', email: 'laura.lopez@estudiante.edu', telefono: '+1 234 567 8906' },
  { id: 7, nombre: 'Pérez Morales, Diego Alejandro', curso: '4to', email: 'diego.perez@estudiante.edu', telefono: '+1 234 567 8907' },
  { id: 8, nombre: 'Sánchez Castro, Valentina', curso: '5to', email: 'valentina.sanchez@estudiante.edu', telefono: '+1 234 567 8908' }
];

@Injectable({ providedIn: 'root' })
export class AlumnoLocalStorageService extends AlumnoRepository {
  
  private alumnos: Alumno[] = [];

  constructor(private storage: StorageService) {
    super();
    this.cargarDatos();
  }

  private cargarDatos(): void {
    const datos = this.storage.getItem<Alumno[]>(STORAGE_KEY);
    if (datos) {
      this.alumnos = datos;
    } else {
      this.alumnos = [...DATOS_INICIALES];
      this.guardarDatos();
    }
  }

  private guardarDatos(): void {
    this.storage.setItem(STORAGE_KEY, this.alumnos);
  }

  private generarId(): number {
    return this.alumnos.length > 0 
      ? Math.max(...this.alumnos.map(a => a.id)) + 1 
      : 1;
  }

  findAll(): Alumno[] {
    return [...this.alumnos].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  findById(id: number): Alumno | undefined {
    return this.alumnos.find(a => a.id === id);
  }

  findByCurso(curso: string): Alumno[] {
    return this.alumnos.filter(a => a.curso === curso);
  }

  create(item: Omit<Alumno, 'id'>): Alumno {
    const nuevo: Alumno = {
      ...item,
      id: this.generarId()
    };
    this.alumnos.push(nuevo);
    this.guardarDatos();
    return nuevo;
  }

  update(id: number, item: Partial<Alumno>): Alumno | undefined {
    const index = this.alumnos.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    
    this.alumnos[index] = { ...this.alumnos[index], ...item };
    this.guardarDatos();
    return this.alumnos[index];
  }

  delete(id: number): boolean {
    const index = this.alumnos.findIndex(a => a.id === id);
    if (index === -1) return false;
    
    this.alumnos.splice(index, 1);
    this.guardarDatos();
    return true;
  }

  // Para carga de datos de prueba
  cargarDatosPrueba(): void {
    const datosPrueba: Alumno[] = [
      { id: this.generarId(), nombre: 'Torres Mendez, Roberto Carlos', curso: '1ro', email: 'roberto.torres@estudiante.edu', telefono: '+1 234 567 9001' },
      { id: this.generarId(), nombre: 'Vargas Jimenez, Patricia Elizabeth', curso: '2do', email: 'patricia.vargas@estudiante.edu', telefono: '+1 234 567 9002' },
      { id: this.generarId(), nombre: 'Castillo Ruiz, Fernando Jose', curso: '3ro', email: 'fernando.castillo@estudiante.edu', telefono: '+1 234 567 9003' },
      { id: this.generarId(), nombre: 'Mendoza Ortiz, Gabriela Maria', curso: '4to', email: 'gabriela.mendoza@estudiante.edu', telefono: '+1 234 567 9004' },
      { id: this.generarId(), nombre: 'Rios Paredes, Alejandro David', curso: '5to', email: 'alejandro.rios@estudiante.edu', telefono: '+1 234 567 9005' }
    ];
    this.alumnos.push(...datosPrueba);
    this.guardarDatos();
  }

  limpiarDatos(): void {
    this.alumnos = [];
    this.guardarDatos();
  }
}