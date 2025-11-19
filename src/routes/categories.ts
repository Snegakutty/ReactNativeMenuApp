// src/routes/categories.ts
import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { validate } from "../middleware/validate";
import { categorySchema } from "../validation/schemas";

const router = Router();

router.post("/", validate(categorySchema), CategoryController.create);
router.get("/", CategoryController.list);
router.put("/:id", validate(categorySchema), CategoryController.update); // Use :id
router.delete("/:id", CategoryController.remove); // Use :id

export default router;