import { IModel } from "./IModel.js";

export interface ICurso extends IModel {
  nome: string;
  nome_detalhado: string;
  modalidade: string;
  grau: string;
}