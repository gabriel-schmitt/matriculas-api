import { Request, Response } from 'express';
import { Controller } from './@Controller.js';
import { IIes } from '../models/interfaces/IIes.js';
import { IesModel } from '../models/IesModel.js';
import { IGetRankingIesParams, IGetRankingIesParamsCategoriaAdministrativa } from '../repositories/interfaces/IIesRepository.js';
import { parseModalidadeQuery } from '../utils/parseModalidadeQuery.js';
import { firstQueryValue } from '../utils/queryString.js';

export class IesController extends Controller<IIes, IesModel> {
  constructor(model: IesModel) {
    super(model);
  }

  getRanking = async (req: Request, res: Response) => {
    try {
      const params: IGetRankingIesParams = {};

      const limitStr = firstQueryValue(req.query.limit);
      if (limitStr) {
        const n = parseInt(limitStr, 10);
        if (!Number.isNaN(n)) params.limit = n;
      }
      const mod = parseModalidadeQuery(firstQueryValue(req.query.modalidade));
      if (mod) params.modalidade = mod;
      const catStr = firstQueryValue(req.query.categoria_administrativa);
      if (catStr) {
        params.categoria_administrativa =
          catStr as IGetRankingIesParamsCategoriaAdministrativa;
      }
      const anoStr = firstQueryValue(req.query.ano);
      if (anoStr) {
        const y = parseInt(anoStr, 10);
        if (!Number.isNaN(y)) params.ano = y;
      }

      const ranking = await this.model.getRankingIes(params);
      res.json(ranking);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
