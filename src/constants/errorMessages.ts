// src/constants/errorMessages.ts
export const errorMessages = {
  // Not Found (404)
  CATEGORY_NOT_FOUND: "Category not found",
  ITEM_NOT_FOUND: "Item not found",
  ADDON_NOT_FOUND: "Addon not found",
  ADDON_LINK_NOT_FOUND: "Addon link not found for this item",

  // Conflict (409)
  CATEGORY_ALREADY_EXISTS: "Category with this name already exists",
  ADDON_ALREADY_EXISTS: "Addon with this name already exists",
  ADDON_LINK_ALREADY_EXISTS: "Addon is already linked to this item",

  // Validation (400)
  VALIDATION_FAILED: "Validation failed",
  NAME_REQUIRED: "Name is required",
  PRICE_REQUIRED: "Price is required",

  // Server (500)
  INTERNAL_SERVER_ERROR: "Internal server error",
};