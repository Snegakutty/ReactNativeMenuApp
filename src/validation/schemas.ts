
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  veg_type: z.enum(["veg", "non-veg"]).optional(),
  is_bestseller: z.boolean().optional(),
  size: z.string().optional().nullable(),
  prep_time_mins: z.number().int().positive().optional().nullable(),
});

export const globalAddonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
});

export const linkAddonSchema = z.object({
  name: z.string().min(1, "Addon name is required"),
  price: z.number().positive("Price must be positive").optional(),
});