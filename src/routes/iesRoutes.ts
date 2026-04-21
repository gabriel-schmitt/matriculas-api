import { Router } from "express";
import { IesController } from "../controllers/IesController.js";

const router = Router();
const controller = new IesController();

router.get("/", controller.getIes);

export default router;
