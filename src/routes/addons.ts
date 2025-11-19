// src/routes/addons.ts
import { Router } from "express";
import { AddonController } from "../controllers/AddonController";
import { validate } from "../middleware/validate";
import { globalAddonSchema, linkAddonSchema } from "../validation/schemas";

const router = Router();

// --- Global Addon Routes (Independent of Items) ---

router.get("/", AddonController.listAll);
router.post("/create", validate(globalAddonSchema), AddonController.createGlobal);
router.put(
  "/update/:addonId",
  validate(globalAddonSchema.partial()),
  AddonController.update
);
router.delete("/:addonId", AddonController.deleteGlobal);

// --- Item-Specific Addon Routes (Linking) ---

// Add/link addon to item
router.post("/:itemId", validate(linkAddonSchema), AddonController.add);

// List addons for item
router.get("/:itemId", AddonController.list);

// Unlink/delete addon from item
router.delete("/:itemId/:addonId", AddonController.remove);

export default router;