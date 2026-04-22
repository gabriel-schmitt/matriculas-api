import { IRepository } from "../repositories/interfaces/IRepository.js";
import { IEntity } from "./interfaces/IEntity.js";
import { IModel } from "./interfaces/IModel.js";

export abstract class Model<M extends IEntity, R extends IRepository<M>> implements IModel<M> {
  constructor(protected readonly repository: R) {}

  findAll({
    limit = 10,
    orderBy = "id",
  }: { limit?: number; orderBy?: string } = {}) {
    return this.repository.findAll({ limit, orderBy });
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  create(model: Omit<M, "id">) {
    return this.repository.create(model);
  }

  update(id: number, model: Omit<M, "id">) {
    return this.repository.update(id, model);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
