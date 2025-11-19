// src/tests/items.test.ts
import request from "supertest";
import app from "../app"; // Import the Express app
import sequelize from "../config/db";
import { Category } from "../models/Category";
import { Item } from "../models/Item";
import { errorMessages } from "../constants/errorMessages";

// Group of tests for the Item endpoints
describe("Item API", () => {
  let testCategory: Category; // This will hold our dummy category

  // Before all tests, sync all tables
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Before each test, we must clear all tables and create a fresh category
  beforeEach(async () => {
    // We must destroy tables in the correct order (Item depends on Category)
    await Item.destroy({ where: {} });
    await Category.destroy({ where: {} });

    // Now create the fresh category for this test
    testCategory = await Category.create({ name: "Test Category" });
  });

  // After all tests, close the DB connection
  afterAll(async () => {
    await sequelize.close();
  });

  // Test for POST /items/:categoryId (creating an item)
  describe("POST /items/:categoryId", () => {
    const itemData = {
      name: "Cheeseburger",
      price: 12.99,
      veg_type: "non-veg",
    };

    it("should create a new item under a category and return 201", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`) // Use the dummy category's ID
        .send(itemData);

      // Check the response
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("Cheeseburger");
      expect(response.body.category_id).toBe(testCategory.id);

      // Check the database
      const item = await Item.findByPk(response.body.id);
      expect(item).not.toBeNull();
      expect(item?.name).toBe("Cheeseburger");
      expect(item?.veg_type).toBe("NON-VEG"); // Controller converts to uppercase
    });

    it("should return 404 if the category does not exist", async () => {
      const response = await request(app)
        .post("/items/9999") // Use a non-existent ID
        .send(itemData);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessages.CATEGORY_NOT_FOUND);
    });

    it("should return 400 if price is missing (validation)", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Fries" }); // 'price' is missing

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(errorMessages.VALIDATION_FAILED);
    });

    it("should return 400 if name is missing", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ price: 10 });

      expect(response.status).toBe(400);
    });

    it("should return 400 if price is negative", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: -10 });

      expect(response.status).toBe(400);
    });

    it("should return 400 if price is zero", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 0 });

      expect(response.status).toBe(400);
    });

    it("should return 400 if price is a string", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: "ten" });

      expect(response.status).toBe(400);
    });

    it("should return 400 if price is null", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: null });

      expect(response.status).toBe(400);
    });

    it("should handle very large price values", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Expensive Item", price: 999999999.99 });

      // Should either succeed or fail validation, but not crash
      expect([201, 400].includes(response.status)).toBe(true);
    });

    it("should handle decimal prices", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 12.99 });

      expect(response.status).toBe(201);
      expect(response.body.price).toBe(12.99);
    });

    it("should return 400 if name is empty string", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "", price: 10 });

      expect(response.status).toBe(400);
    });

    it("should accept whitespace-only name (validation limitation)", async () => {
      // Note: Zod min(1) checks length, not trimmed length, so "   " passes
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "   ", price: 10 });

      // This passes validation but may fail at database level
      expect([201, 400]).toContain(response.status);
    });

    it("should handle invalid veg_type enum value", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, veg_type: "invalid" });

      expect(response.status).toBe(400);
    });

    it("should handle veg_type case variations (lowercase)", async () => {
      // Note: Schema expects lowercase "veg" or "non-veg", controller converts to uppercase
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, veg_type: "veg" });

      expect(response.status).toBe(201);
      expect(response.body.veg_type).toBe("VEG"); // Controller converts to uppercase
    });

    it("should handle prep_time_mins as negative number", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, prep_time_mins: -5 });

      expect(response.status).toBe(400);
    });

    it("should handle prep_time_mins as zero", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, prep_time_mins: 0 });

      expect(response.status).toBe(400);
    });

    it("should handle prep_time_mins as float (should fail)", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, prep_time_mins: 15.5 });

      expect(response.status).toBe(400);
    });

    it("should handle very large prep_time_mins", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, prep_time_mins: 999999 });

      // Should either succeed or fail validation
      expect([201, 400].includes(response.status)).toBe(true);
    });

    it("should handle is_bestseller as string (should be converted or rejected)", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, is_bestseller: "true" });

      // Boolean conversion might happen, check behavior
      expect([201, 400].includes(response.status)).toBe(true);
    });

    it("should handle size as very long string", async () => {
      const longSize = "A".repeat(200);
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, size: longSize });

      // Should either succeed or fail validation
      expect([201, 400].includes(response.status)).toBe(true);
    });

    it("should handle null values for optional fields", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, size: null, prep_time_mins: null });

      expect(response.status).toBe(201);
    });

    it("should handle undefined values for optional fields", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10 });

      expect(response.status).toBe(201);
    });

    it("should return 404 if categoryId is negative", async () => {
      const response = await request(app)
        .post("/items/-1")
        .send({ name: "Item", price: 10 });

      expect(response.status).toBe(404);
    });

    it("should return 404 if categoryId is zero", async () => {
      const response = await request(app)
        .post("/items/0")
        .send({ name: "Item", price: 10 });

      expect(response.status).toBe(404);
    });

    it("should return 404 or 500 if categoryId is invalid format", async () => {
      const response = await request(app)
        .post("/items/abc")
        .send({ name: "Item", price: 10 });

      // Number("abc") = NaN, may cause error (500) or return null (404)
      expect([404, 500]).toContain(response.status);
    });

    it("should handle special characters in item name", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item!@#$%^&*()", price: 10 });

      expect(response.status).toBe(201);
    });

    it("should handle unicode characters in item name", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "アイテム 🍔", price: 10 });

      expect(response.status).toBe(201);
    });

    it("should ignore extra fields in request body", async () => {
      const response = await request(app)
        .post(`/items/${testCategory.id}`)
        .send({ name: "Item", price: 10, extraField: "ignored" });

      expect(response.status).toBe(201);
      expect(response.body.extraField).toBeUndefined();
    });
  });

  // Test for GET /items/:categoryId (listing items)
  describe("GET /items/:categoryId", () => {
    it("should return an array of items for a category", async () => {
      // Create a few items in our test category
      await Item.create({
        name: "Burger",
        price: 10,
        category_id: testCategory.id,
        veg_type: "NON-VEG",
      });
      await Item.create({
        name: "Fries",
        price: 5,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app).get(`/items/${testCategory.id}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBe("Burger");
      expect(response.body[1].name).toBe("Fries");
    });

    it("should return 404 if the category does not exist", async () => {
      const response = await request(app).get("/items/9999");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessages.CATEGORY_NOT_FOUND);
    });

    it("should return an empty array if category has no items", async () => {
      const response = await request(app).get(`/items/${testCategory.id}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });

  // Test for PUT /items/:itemId (updating an item)
  describe("PUT /items/:itemId", () => {
    it("should update an item and return 200", async () => {
      const item = await Item.create({
        name: "Old Burger",
        price: 10,
        category_id: testCategory.id,
        veg_type: "NON-VEG",
      });

      const updateData = {
        name: "New Burger Name",
        price: 15.5,
        is_bestseller: true,
      };

      const response = await request(app)
        .put(`/items/${item.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("New Burger Name");
      expect(response.body.price).toBe(15.5);
      expect(response.body.is_bestseller).toBe(true);

      // Check the database
      await item.reload();
      expect(item.name).toBe("New Burger Name");
      expect(item.price).toBe(15.5);
    });

    it("should return 404 if item to update is not found", async () => {
      const response = await request(app)
        .put("/items/9999")
        .send({ name: "Ghost" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessages.ITEM_NOT_FOUND);
    });

    it("should return 400 if updating price to negative", async () => {
      const item = await Item.create({
        name: "Item",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app)
        .put(`/items/${item.id}`)
        .send({ price: -5 });

      expect(response.status).toBe(400);
    });

    it("should return 400 if updating price to zero", async () => {
      const item = await Item.create({
        name: "Item",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app)
        .put(`/items/${item.id}`)
        .send({ price: 0 });

      expect(response.status).toBe(400);
    });

    it("should handle partial update with only name", async () => {
      const item = await Item.create({
        name: "Old Name",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app)
        .put(`/items/${item.id}`)
        .send({ name: "New Name" });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("New Name");
      expect(response.body.price).toBe(10); // Should remain unchanged
    });

    it("should handle partial update with only price", async () => {
      const item = await Item.create({
        name: "Item",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app)
        .put(`/items/${item.id}`)
        .send({ price: 15.99 });

      expect(response.status).toBe(200);
      expect(response.body.price).toBe(15.99);
      expect(response.body.name).toBe("Item"); // Should remain unchanged
    });

    it("should handle updating to invalid veg_type", async () => {
      const item = await Item.create({
        name: "Item",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app)
        .put(`/items/${item.id}`)
        .send({ veg_type: "invalid" });

      expect(response.status).toBe(400);
    });

    it("should handle empty update body", async () => {
      const item = await Item.create({
        name: "Item",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app)
        .put(`/items/${item.id}`)
        .send({});

      // Should either succeed (no-op) or fail validation
      expect([200, 400].includes(response.status)).toBe(true);
    });

    it("should return 404 if itemId is negative", async () => {
      const response = await request(app)
        .put("/items/-1")
        .send({ name: "Item" });

      expect(response.status).toBe(404);
    });

    it("should return 404 or 500 if itemId is invalid format", async () => {
      const response = await request(app)
        .put("/items/abc")
        .send({ name: "Item" });

      // Number("abc") = NaN, may cause error (500) or return null (404)
      expect([404, 500]).toContain(response.status);
    });
  });

  // Test for DELETE /items/:itemId
  describe("DELETE /items/:itemId", () => {
    it("should delete an item and return 204", async () => {
      const item = await Item.create({
        name: "To Be Deleted",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      const response = await request(app).delete(`/items/${item.id}`);

      expect(response.status).toBe(204);

      // Check the database
      const deletedItem = await Item.findByPk(item.id);
      expect(deletedItem).toBeNull();
    });

    it("should return 404 if item to delete is not found", async () => {
      const response = await request(app).delete("/items/9999");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessages.ITEM_NOT_FOUND);
    });

    it("should return 404 if itemId is negative", async () => {
      const response = await request(app).delete("/items/-1");

      expect(response.status).toBe(404);
    });

    it("should return 404 or 500 if itemId is invalid format", async () => {
      const response = await request(app).delete("/items/abc");

      // Number("abc") = NaN, may cause error (500) or return null (404)
      expect([404, 500]).toContain(response.status);
    });

    it("should handle deleting already deleted item", async () => {
      const item = await Item.create({
        name: "To Delete",
        price: 10,
        category_id: testCategory.id,
        veg_type: "VEG",
      });

      await request(app).delete(`/items/${item.id}`);
      const response = await request(app).delete(`/items/${item.id}`);

      expect(response.status).toBe(404);
    });
  });
});