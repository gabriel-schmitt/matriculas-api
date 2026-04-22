import { Router } from "express";
import { IesController } from "../controllers/IesController.js";

const router = Router();
const controller = new IesController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
