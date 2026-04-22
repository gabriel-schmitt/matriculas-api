export interface IRepository<T> {
  create(curso: Omit<T, 'id'>): Promise<T>;
  findAll({ limit, orderBy }: { limit?: number; orderBy?: string }): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  update(id: number, curso: Omit<T, 'id'>): Promise<T | null>;
  delete(id: number): Promise<void>;
}