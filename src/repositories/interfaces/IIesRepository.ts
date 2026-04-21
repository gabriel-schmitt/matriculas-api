import { IIes } from "../../models/interfaces/IIes.js";
import { IRepository } from "./IRepository.js";

export interface IIesRepository extends IRepository<IIes> {
  getRankingIes(limit: number, modalidade: string, tipoCategoria: string, ano: number): Promise<any>;
}
