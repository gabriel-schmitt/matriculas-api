import { ICurso } from "../models/interfaces/ICurso.js";
import { Repository } from "./@Repository.js";
import { ICursoRepository } from "./interfaces/ICursoRepository.js";

export class CursoRepository extends Repository<ICurso> implements ICursoRepository {
  constructor() {
    super("curso");
  }
}