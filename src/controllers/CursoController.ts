import { Request, Response } from 'express';
import { CursoRepository } from '../repositories/CursoRepository.js';

const repository = new CursoRepository();

export class CursoController {
  async getCursos(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 10;
      const cursos = await repository.findAll(limit);
      res.json(cursos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
