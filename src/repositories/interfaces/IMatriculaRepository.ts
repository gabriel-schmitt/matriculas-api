import { IMatricula, ITotalMatriculadosAno } from "../../models/interfaces/IMatricula.js";
import { IRepository } from "./IRepository.js";

export interface IGetTotalMatriculadosParams {
  modalidade?: string;
}

export interface IMatriculaRepository extends IRepository<IMatricula> {
  getTotalMatriculados(params: IGetTotalMatriculadosParams): Promise<ITotalMatriculadosAno[]>;
}
