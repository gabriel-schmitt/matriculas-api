import { IEntity } from "./IEntity.js";

export interface IMatricula extends IEntity {
  curso_ies_id: number;
  ano: number;
  quantidade: number;
}
