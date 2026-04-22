import { ICurso, ICursoModalidade } from "../../models/interfaces/ICurso.js";
import { IRepository } from "./IRepository.js";

export interface IGetRankingCursosParams {
  limit?: number;
  modalidade?: ICursoModalidade;
  ano?: number;
}

export interface ICursoRepository extends IRepository<ICurso> {
  getRankingCursos(params: IGetRankingCursosParams): Promise<any>;
}


