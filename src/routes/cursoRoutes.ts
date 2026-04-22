import { Router } from "express";
import { CursoController } from "../controllers/CursoController.js";
import { CursoRepository } from "../repositories/CursoRepository.js";
import { CursoModel } from "../models/CursoModel.js";

const router = Router();

const cursoRepository = new CursoRepository();
const cursoModel = new CursoModel(cursoRepository);
const cursoController = new CursoController(cursoModel);

router.get("/ranking", cursoController.getRanking);

router.get("/", cursoController.getAll);
router.get("/:id", cursoController.getById);
router.post("/", cursoController.create);
router.put("/:id", cursoController.update);
router.delete("/:id", cursoController.delete);

export default router;