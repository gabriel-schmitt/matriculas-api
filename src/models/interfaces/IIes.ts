import { IModel } from "./IModel.js";

export interface IIes extends IModel {
  estado: string;
  cidade: string;
  nome: string;
  sigla: string;
  organizacao: string;
  categoria_administrativa: string;
}
