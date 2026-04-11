import { Request, Response } from 'express';
import { CursoMatriculaRepository } from '../repositories/CursoMatriculaRepository.js';

const repository = new CursoMatriculaRepository();

export class CursoMatriculaController {
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
