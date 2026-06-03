import { BaseRepository } from './interfaces/base.repository';
import { RegistroAsistencia } from '../models/asistencia.model';

export abstract class AsistenciaRepository implements BaseRepository<RegistroAsistencia> {
  abstract findAll(): RegistroAsistencia[];
  abstract findById(id: number): RegistroAsistencia | undefined;
  abstract create(item: Omit<RegistroAsistencia, 'id'>): RegistroAsistencia;
  abstract update(id: number, item: Partial<RegistroAsistencia>): RegistroAsistencia | undefined;
  abstract delete(id: number): boolean;
  
  // Métodos específicos de asistencia
  abstract findByFecha(fecha: string): RegistroAsistencia[];
  abstract findByCursoMateriaFecha(curso: string, materia: string, fecha: string): RegistroAsistencia | undefined;
}