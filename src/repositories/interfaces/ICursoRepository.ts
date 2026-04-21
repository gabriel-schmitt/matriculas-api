import { ICurso } from "../../models/interfaces/ICurso.js";
import { IRepository } from "./IRepository.js";

export interface ICursoRepository extends IRepository<ICurso> {
  getRankingCursos(limit: number, modalidade: string, ano: number): Promise<any>;
}
