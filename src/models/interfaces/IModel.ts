import { IEntity } from "./IEntity.js";

export interface IModel<M extends IEntity> {
  findAll(options?: { limit?: number; orderBy?: string }): Promise<M[]>;
  findById(id: number): Promise<M | null>;
  create(model: Omit<M, "id">): Promise<M>;
  update(id: number, model: Omit<M, "id">): Promise<M | null>;
  delete(id: number): Promise<void>;
}
