import { Router } from "express";
import { IesController } from "../controllers/IesController.js";
import { IesModel } from "../models/IesModel.js";
import { IesRepository } from "../repositories/IesRepository.js";

const router = Router();
const iesRepository = new IesRepository();
const iesModel = new IesModel(iesRepository);
const controller = new IesController(iesModel);

router.get("/ranking", controller.getRanking);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
