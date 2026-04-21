import { Router } from "express";
import { MatriculaController } from "../controllers/MatriculaController.js";

const router = Router();
const controller = new MatriculaController();

router.get("/", controller.getMatriculas);

export default router;
