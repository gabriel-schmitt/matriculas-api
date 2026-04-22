import { Request, Response } from 'express';
import { MatriculaRepository } from '../repositories/MatriculaRepository.js';
import { Controller } from './@Controller.js';
import { IMatricula } from '../models/interfaces/IMatricula.js';

export class MatriculaController extends Controller<IMatricula> {
  constructor(repository = new MatriculaRepository()) {
    super(repository);
  }
}
