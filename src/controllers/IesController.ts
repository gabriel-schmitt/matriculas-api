import { Request, Response } from 'express';
import { IesRepository } from '../repositories/IesRepository.js';
import { Controller } from './@Controller.js';
import { IIes } from '../models/interfaces/IIes.js';

export class IesController extends Controller<IIes> {
  constructor(repository = new IesRepository()) {
    super(repository);
  }
}
