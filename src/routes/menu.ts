import { Router } from "express";
import { MenuController } from "../controllers/MenuController";

const router = Router();

router.get("/full", MenuController.getFullMenu);

export default router;
