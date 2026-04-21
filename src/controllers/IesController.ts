import { Request, Response } from 'express';
import { IesRepository } from '../repositories/IesRepository.js';

const repository = new IesRepository();

export class IesController {
  async getIes(req: Request, res: Response) {
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
