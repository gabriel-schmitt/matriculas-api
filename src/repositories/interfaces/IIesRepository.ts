import { IIes, IIesRanking } from "../../models/interfaces/IIes.js";
import { IRepository } from "./IRepository.js";

export interface IGetRankingIesParams {
  limit?: number;
  modalidade?: string;
  categoria_administrativa?: IGetRankingIesParamsCategoriaAdministrativa;
  ano?: number;
}

export type IGetRankingIesParamsCategoriaAdministrativa = 'Publica' | 'Pública' | 'Privada';

export interface IIesRepository extends IRepository<IIes> {
  getRankingIes(params: IGetRankingIesParams): Promise<IIesRanking[]>;
}
