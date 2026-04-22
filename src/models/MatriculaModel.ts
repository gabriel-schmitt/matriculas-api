import { IMatriculaRepository } from "../repositories/interfaces/IMatriculaRepository.js";
import { Model } from "./@Model.js";
import { IMatricula } from "./interfaces/IMatricula.js";

export class Matricula extends Model<IMatricula, IMatriculaRepository> {
  constructor(repository: IMatriculaRepository) {
    super(repository);
  }
}
