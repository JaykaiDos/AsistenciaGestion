import { BaseRepository } from './interfaces/base.repository';
import { Alumno } from '../models/alumno.model';

// Clase abstracta que será implementada por LocalStorageRepo y luego ApiRepo
export abstract class AlumnoRepository implements BaseRepository<Alumno> {
  abstract findAll(): Alumno[];
  abstract findById(id: number): Alumno | undefined;
  abstract create(item: Omit<Alumno, 'id'>): Alumno;
  abstract update(id: number, item: Partial<Alumno>): Alumno | undefined;
  abstract delete(id: number): boolean;
}