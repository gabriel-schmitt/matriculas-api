import { Request, Response } from 'express';
import { Controller } from './@Controller.js';
import { ICurso, ICursoModalidade } from '../models/interfaces/ICurso.js';
import { CursoModel } from '../models/CursoModel.js';
import { IGetRankingCursosParams } from '../repositories/interfaces/ICursoRepository.js';
import { parseModalidadeQuery } from '../utils/parseModalidadeQuery.js';
import { firstQueryValue } from '../utils/queryString.js';

export class CursoController extends Controller<ICurso, CursoModel> {
  constructor(model: CursoModel) {
    super(model);
  }

  getRanking = async (req: Request, res: Response) => {
    const params: IGetRankingCursosParams = {};

    const limitStr = firstQueryValue(req.query.limit);
    if (limitStr) {
      const n = parseInt(limitStr, 10);
      if (!Number.isNaN(n)) params.limit = n;
    }
    const m = parseModalidadeQuery(firstQueryValue(req.query.modalidade));
    if (m) params.modalidade = m as ICursoModalidade;
    const anoStr = firstQueryValue(req.query.ano);
    if (anoStr) {
      const y = parseInt(anoStr, 10);
      if (!Number.isNaN(y)) params.ano = y;
    }

    this.model.getRanking(params)
      .then(ranking => res.json(ranking))
      .catch(err => res.status(500).json({ error: err.message }));
  }
}
