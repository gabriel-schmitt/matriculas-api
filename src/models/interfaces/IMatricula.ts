import { IModel } from "./IModel.js";

export interface IMatricula extends IModel {
  curso_ies_id: number;
  ano: number;
  quantidade: number;
}
