import { Request, Response } from 'express';
import { Controller } from './@Controller.js';
import { IMatricula } from '../models/interfaces/IMatricula.js';
import { MatriculaModel } from '../models/MatriculaModel.js';
import { IGetTotalMatriculadosParams } from '../repositories/interfaces/IMatriculaRepository.js';

export class MatriculaController extends Controller<IMatricula, MatriculaModel> {
  constructor(model: MatriculaModel) {
    super(model);
  }

  getTotalPorAno = async (req: Request, res: Response) => {
    try {
      const { modalidade } = req.query;
      const params: IGetTotalMatriculadosParams = {};

      if (modalidade) params.modalidade = modalidade as string;

      const total = await this.model.getTotalMatriculados(params);
      res.json(total);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
