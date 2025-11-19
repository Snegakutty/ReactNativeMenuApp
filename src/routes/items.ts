// src/routes/items.ts
import { Router } from "express";
import { ItemController } from "../controllers/ItemController";
import { validate } from "../middleware/validate";
import { itemSchema } from "../validation/schemas";

const router = Router();

// Create item under category
router.post("/:categoryId", validate(itemSchema), ItemController.create);

// List items under category
router.get("/:categoryId", ItemController.list);

// Update item by its own ID
router.put("/:itemId", validate(itemSchema.partial()), ItemController.update);

// Delete item by its own ID
router.delete("/:itemId", ItemController.remove);

export default router;