import { Router } from "express";
import { CursoMatriculaController } from "../controllers/CursoMatriculaController.js";

const router = Router();
const controller = new CursoMatriculaController();

router.get("/", controller.getCursos);

export default router;