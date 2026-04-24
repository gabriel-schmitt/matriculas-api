import { IIesRepository, IGetRankingIesParams } from "../repositories/interfaces/IIesRepository.js";
import { Model } from "./@Model.js";
import { IIes, IIesRanking } from "./interfaces/IIes.js";

export class IesModel extends Model<IIes, IIesRepository> {
  constructor(repository: IIesRepository) {
    super(repository);
  }

  async getRankingIes(params: IGetRankingIesParams): Promise<IIesRanking[]> {
    return this.repository.getRankingIes(params);
  }
}
