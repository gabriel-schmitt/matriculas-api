import { IEntity } from "./IEntity.js";

export interface ICurso extends IEntity {
  nome: string;
  nome_detalhado: string;
  modalidade: ICursoModalidade;
  grau: string;
}

export type ICursoModalidade = "Presencial" | "EaD";