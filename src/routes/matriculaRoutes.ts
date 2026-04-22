import { Router } from "express";
import { MatriculaController } from "../controllers/MatriculaController.js";

const router = Router();
const controller = new MatriculaController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
