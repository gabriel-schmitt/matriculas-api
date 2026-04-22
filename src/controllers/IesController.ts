import { Request, Response } from 'express';
import { Controller } from './@Controller.js';
import { IIes } from '../models/interfaces/IIes.js';
import { IesModel } from '../models/IesModel.js';
import { IGetRankingIesParams, IGetRankingIesParamsCategoriaAdministrativa } from '../repositories/interfaces/IIesRepository.js';

export class IesController extends Controller<IIes, IesModel> {
  constructor(model: IesModel) {
    super(model);
  }

  getRanking = async (req: Request, res: Response) => {
    try {
      const { limit, modalidade, categoria_administrativa, ano } = req.query;
      const params: IGetRankingIesParams = {};

      if (limit) params.limit = parseInt(limit as string);
      if (modalidade) params.modalidade = modalidade as string;
      if (categoria_administrativa) params.categoria_administrativa = categoria_administrativa as IGetRankingIesParamsCategoriaAdministrativa;
      if (ano) params.ano = parseInt(ano as string);

      const ranking = await this.model.getRankingIes(params);
      res.json(ranking);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
