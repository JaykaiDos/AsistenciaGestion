// Interfaz base que será implementada por LocalStorage y luego por API
export interface BaseRepository<T, ID = number> {
  findAll(): T[];
  findById(id: ID): T | undefined;
  create(item: Omit<T, 'id'>): T;
  update(id: ID, item: Partial<T>): T | undefined;
  delete(id: ID): boolean;
}