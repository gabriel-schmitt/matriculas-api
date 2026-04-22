import { Router } from "express";
import { CursoController } from "../controllers/CursoController.js";

const router = Router();
const controller = new CursoController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;