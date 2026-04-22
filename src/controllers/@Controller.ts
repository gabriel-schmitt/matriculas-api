import { Request, Response } from "express";
import { IEntity } from "../models/interfaces/IEntity.js";
import { IModel } from "../models/interfaces/IModel.js";
import { internalServerError } from "../exceptions/internalServerError.js";
import { notFound } from "../exceptions/notFound.js";

export abstract class Controller<E extends IEntity> {
  constructor(protected model: IModel<E>) {}

  getAll = async (req: Request, res: Response) => {
    const params: { limit?: number; orderBy?: string } = {};

    if (req.query.limit) params.limit = parseInt(req.query.limit as string);
    if (req.query.orderBy) params.orderBy = req.query.orderBy as string;

    this.model
      .findAll(params)
      .then((items) => res.json(items))
      .catch((error) => {
        console.error(error);
        const { status, message } = internalServerError;
        res.status(status).json({ error: message });
      });
  }

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    this.model
      .findById(id)
      .then((item) => {
        if (!item) {
          const { status, message } = notFound;
          res.status(status).json({ error: message });
          return;
        }

        res.json(item);
      })
      .catch((error) => {
        console.error(error);
        const { status, message } = internalServerError;
        res.status(status).json({ error: message });
      });
  }

  create = async (req: Request, res: Response) => {
    const data = req.body;

    this.model
      .create(data)
      .then((item) => res.status(201).json(item))
      .catch((error) => {
        console.error(error);
        const { status, message } = internalServerError;
        res.status(status).json({ error: message });
      });
  }

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;

    this.model
      .update(id, data)
      .then((item) => {
        if (!item) {
          const { status, message } = notFound;
          res.status(status).json({ error: message });
          return;
        }

        res.json(item);
      })
      .catch((error) => {
        console.error(error);
        const { status, message } = internalServerError;
        res.status(status).json({ error: message });
      });
  }

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    this.model
      .delete(id)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        console.error(error);
        const { status, message } = internalServerError;
        res.status(status).json({ error: message });
      });
  }
}
