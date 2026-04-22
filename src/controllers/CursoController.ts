import { Request, Response } from 'express';
import { Controller } from './@Controller.js';
import { ICurso } from '../models/interfaces/ICurso.js';
import { CursoModel } from '../models/CursoModel.js';
import { IGetRankingCursosParams } from '../repositories/interfaces/ICursoRepository.js';

export class CursoController extends Controller<ICurso, CursoModel> {
  constructor(model: CursoModel) {
    super(model);
  }

  getRanking = async (req: Request, res: Response) => {
    const { limit, modalidade, ano } = req.query;
    const params: IGetRankingCursosParams = {};

    if (limit) params.limit = parseInt(limit as string);
    if (modalidade) params.modalidade = modalidade as any;
    if (ano) params.ano = parseInt(ano as string);

    this.model.getRanking(params)
      .then(ranking => res.json(ranking))
      .catch(err => res.status(500).json({ error: err.message }));
  }
}
