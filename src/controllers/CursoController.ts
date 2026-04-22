import { Request, Response } from 'express';
import { CursoRepository } from '../repositories/CursoRepository.js';
import { Controller } from './@Controller.js';
import { ICurso } from '../models/interfaces/ICurso.js';

export class CursoController extends Controller<ICurso> {
  constructor(repository = new CursoRepository()) {
    super(repository);
  }
}
