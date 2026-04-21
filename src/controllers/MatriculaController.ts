import { Request, Response } from 'express';
import { MatriculaRepository } from '../repositories/MatriculaRepository.js';

const repository = new MatriculaRepository();

export class MatriculaController {
  async getMatriculas(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 10;
      const data = await repository.findAll(limit);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
