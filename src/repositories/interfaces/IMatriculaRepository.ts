import { IMatricula } from "../../models/interfaces/IMatricula.js";
import { IRepository } from "./IRepository.js";

export interface IMatriculaRepository extends IRepository<IMatricula> {
  getTotalMatriculados(ano?: number, modalidade?: string): Promise<any>;
}
