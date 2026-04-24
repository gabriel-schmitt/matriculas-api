import { ICurso, ICursoRanking, ICursoModalidade } from "../../models/interfaces/ICurso.js";
import { IRepository } from "./IRepository.js";

export interface IGetRankingCursosParams {
  limit?: number;
  modalidade?: ICursoModalidade;
  ano?: number;
}

export interface ICursoRepository extends IRepository<ICurso> {
  getRanking(params: IGetRankingCursosParams): Promise<ICursoRanking[]>;
}


