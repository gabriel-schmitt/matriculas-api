import { IEntity } from "./IEntity.js";

export interface IIes extends IEntity {
  estado: string;
  cidade: string;
  nome: string;
  sigla: string;
  organizacao: string;
  categoria_administrativa: string;
}

export interface IIesRanking {
  id: number;
  nome: string;
  sigla: string;
  categoria_administrativa: string;
  total_matriculas: number;
}
