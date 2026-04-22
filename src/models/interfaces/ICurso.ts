import { IEntity } from "./IEntity.js";

export interface ICurso extends IEntity {
  nome: string;
  nome_detalhado: string;
  modalidade: ICursoModalidade;
  grau: string;
}

export interface ICursoRanking extends ICurso {
  total_matriculas: number;
}

export type ICursoModalidade = "Presencial" | "EaD";