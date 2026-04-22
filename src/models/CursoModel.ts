import { ICursoRepository, IGetRankingCursosParams } from "../repositories/interfaces/ICursoRepository.js";
import { Model } from "./@Model.js";
import { ICurso } from "./interfaces/ICurso.js";

export class CursoModel extends Model<ICurso, ICursoRepository> {
  constructor(
    repository: ICursoRepository
  ) {
    super(repository);
  }

  getRankingCursos(params: IGetRankingCursosParams) {
    return this.repository.getRankingCursos(params);
  }
}