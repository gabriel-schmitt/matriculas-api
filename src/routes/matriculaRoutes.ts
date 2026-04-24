import { Router } from "express";
import { MatriculaController } from "../controllers/MatriculaController.js";
import { MatriculaModel } from "../models/MatriculaModel.js";
import { MatriculaRepository } from "../repositories/MatriculaRepository.js";

const router = Router();
const matriculaRepository = new MatriculaRepository();
const matriculaModel = new MatriculaModel(matriculaRepository);
const controller = new MatriculaController(matriculaModel);

router.get("/total-por-ano", controller.getTotalPorAno);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
