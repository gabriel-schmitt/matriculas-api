import { Request, Response } from 'express';
import { Controller } from './@Controller.js';
import { IMatricula } from '../models/interfaces/IMatricula.js';
import { MatriculaModel } from '../models/MatriculaModel.js';
import { IGetTotalMatriculadosParams } from '../repositories/interfaces/IMatriculaRepository.js';
import { parseModalidadeQuery } from '../utils/parseModalidadeQuery.js';
import { firstQueryValue } from '../utils/queryString.js';

export class MatriculaController extends Controller<IMatricula, MatriculaModel> {
  constructor(model: MatriculaModel) {
    super(model);
  }

  getTotalPorAno = async (req: Request, res: Response) => {
    try {
      const params: IGetTotalMatriculadosParams = {};

      const m = parseModalidadeQuery(firstQueryValue(req.query.modalidade));
      if (m) params.modalidade = m;

      const total = await this.model.getTotalMatriculados(params);
      res.json(total);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
