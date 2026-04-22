import { IMatriculaRepository, IGetTotalMatriculadosParams } from "../repositories/interfaces/IMatriculaRepository.js";
import { Model } from "./@Model.js";
import { IMatricula, ITotalMatriculadosAno } from "./interfaces/IMatricula.js";

export class MatriculaModel extends Model<IMatricula, IMatriculaRepository> {
  constructor(repository: IMatriculaRepository) {
    super(repository);
  }

  async getTotalMatriculados(params: IGetTotalMatriculadosParams): Promise<ITotalMatriculadosAno[]> {
    return this.repository.getTotalMatriculados(params);
  }
}
