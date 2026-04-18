import { Router } from "express";
import { CursoController } from "../controllers/CursoController.js";

const router = Router();
const controller = new CursoController();

router.get("/", controller.getCursos);

export default router;