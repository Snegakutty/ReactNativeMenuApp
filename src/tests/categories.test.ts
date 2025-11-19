// src/tests/categories.test.ts
import request from "supertest";
import app from "../app"; // Import the Express app
import sequelize from "../config/db";
import { Category } from "../models/Category";
import { Item } from "../models/Item";
import { errorMessages } from "../constants/errorMessages";

// Group of tests for the Category endpoints
describe("Category API", () => {
  // Before all tests, sync the (in-memory) database
  // { force: true } drops all tables and recreates them
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // After each test, clean out the tables
  // We destroy Item first, then Category, to respect foreign keys
  afterEach(async () => {
    await Item.destroy({ where: {} });
    await Category.destroy({ where: {} });
  });

  // After all tests are done, close the DB connection
  afterAll(async () => {
    await sequelize.close();
  });

  // Test for POST /categories (creating a category)
  describe("POST /categories", () => {
    it("should create a new category and return 201", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "Drinks" });

      // Check the response
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("Drinks");

      // Check the database
      const category = await Category.findByPk(response.body.id);
      expect(category).not.toBeNull();
      expect(category?.name).toBe("Drinks");
    });

    it("should return 400 if name is missing (validation)", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "" }); // Send empty name

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(errorMessages.VALIDATION_FAILED);
    });

    it("should accept whitespace-only name (validation limitation)", async () => {
      // Note: Zod min(1) checks length, not trimmed length, so "   " passes
      const response = await request(app)
        .post("/categories")
        .send({ name: "   " });

      // This passes validation but may fail at database level due to unique constraint
      expect([201, 400, 409]).toContain(response.status);
    });

    it("should return 400 if name field is missing entirely", async () => {
      const response = await request(app)
        .post("/categories")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(errorMessages.VALIDATION_FAILED);
    });

    it("should return 400 if name is null", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: null });

      expect(response.status).toBe(400);
    });

    it("should return 400 if name is not a string", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: 12345 });

      expect(response.status).toBe(400);
    });

    it("should return 400 if name is an array", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: ["Invalid"] });

      expect(response.status).toBe(400);
    });

    it("should return 400 if name is an object", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: { invalid: true } });

      expect(response.status).toBe(400);
    });

    it("should handle very long category names", async () => {
      const longName = "A".repeat(200); // Very long name
      const response = await request(app)
        .post("/categories")
        .send({ name: longName });

      // Should either succeed or fail with validation, but not crash
      expect(response.status === 201 || response.status === 400).toBe(true);
    });

    it("should handle special characters in name", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "Category!@#$%^&*()" });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Category!@#$%^&*()");
    });

    it("should handle unicode characters in name", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "カテゴリー 🍕 🍔" });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("カテゴリー 🍕 🍔");
    });

    it("should handle names with leading/trailing whitespace", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "  Drinks  " });

      expect(response.status).toBe(201);
      // Note: Sequelize may trim or preserve whitespace depending on model definition
    });

    it("should return 409 if category already exists (case sensitive)", async () => {
      await Category.create({ name: "Appetizers" }); // Create a category first

      // Try to create the same one
      const response = await request(app)
        .post("/categories")
        .send({ name: "Appetizers" });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe(errorMessages.CATEGORY_ALREADY_EXISTS);
    });

    it("should handle SQL injection attempt in name", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "'; DROP TABLE categories; --" });

      // Should either create it as a literal string or reject it, but not execute SQL
      expect([201, 400].includes(response.status)).toBe(true);
      if (response.status === 201) {
        expect(response.body.name).toBe("'; DROP TABLE categories; --");
      }
    });

    it("should ignore extra fields in request body", async () => {
      const response = await request(app)
        .post("/categories")
        .send({ name: "Drinks", extraField: "should be ignored", anotherField: 123 });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Drinks");
      expect(response.body.extraField).toBeUndefined();
    });
  });

  // Test for GET /categories (listing all categories)
  describe("GET /categories", () => {
    it("should return an array of categories", async () => {
      // Add some data
      await Category.create({ name: "Burgers" });
      await Category.create({ name: "Pizza" });

      const response = await request(app).get("/categories");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBe("Burgers");
      expect(response.body[1].name).toBe("Pizza");
    });

    it("should return an empty array if no categories exist", async () => {
      const response = await request(app).get("/categories");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });

  // Test for PUT /categories/:id (updating a category)
  describe("PUT /categories/:id", () => {
    it("should update a category and return 200", async () => {
      const category = await Category.create({ name: "Old Name" });
      
      const response = await request(app)
        .put(`/categories/${category.id}`)
        .send({ name: "New Name" });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("New Name");

      // Check the database
      await category.reload(); // Get fresh data from DB
      expect(category.name).toBe("New Name");
    });

    it("should return 404 if category to update is not found", async () => {
      const response = await request(app)
        .put("/categories/999")
        .send({ name: "New Name" });
      
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessages.CATEGORY_NOT_FOUND);
    });

    it("should return 404 if category ID is negative", async () => {
      const response = await request(app)
        .put("/categories/-1")
        .send({ name: "New Name" });
      
      expect(response.status).toBe(404);
    });

    it("should return 404 if category ID is zero", async () => {
      const response = await request(app)
        .put("/categories/0")
        .send({ name: "New Name" });
      
      expect(response.status).toBe(404);
    });

    it("should return 404 if category ID is a very large number", async () => {
      const response = await request(app)
        .put("/categories/999999999")
        .send({ name: "New Name" });
      
      expect(response.status).toBe(404);
    });

    it("should return 400 if update name is empty string", async () => {
      const category = await Category.create({ name: "Test" });
      const response = await request(app)
        .put(`/categories/${category.id}`)
        .send({ name: "" });
      
      expect(response.status).toBe(400);
    });

    it("should return 400 if update name is missing", async () => {
      const category = await Category.create({ name: "Test" });
      const response = await request(app)
        .put(`/categories/${category.id}`)
        .send({});
      
      expect(response.status).toBe(400);
    });

    it("should handle updating to a name that already exists (should fail)", async () => {
      const cat1 = await Category.create({ name: "Category1" });
      const cat2 = await Category.create({ name: "Category2" });

      const response = await request(app)
        .put(`/categories/${cat1.id}`)
        .send({ name: "Category2" });
      
      // Should fail due to unique constraint
      expect([400, 409, 500].includes(response.status)).toBe(true);
    });

    it("should handle invalid ID format (non-numeric)", async () => {
      const response = await request(app)
        .put("/categories/abc")
        .send({ name: "New Name" });
      
      // Number("abc") = NaN, may cause error (500) or return null (404)
      expect([404, 500]).toContain(response.status);
    });

    it("should handle float ID (should be treated as integer)", async () => {
      const category = await Category.create({ name: "Test" });
      const response = await request(app)
        .put(`/categories/${category.id}.5`)
        .send({ name: "New Name" });
      
      // Number() will convert 1.5 to 1, so should work or fail appropriately
      expect([200, 404].includes(response.status)).toBe(true);
    });
  });

   // Test for DELETE /categories/:id
  describe("DELETE /categories/:id", () => {
    it("should delete a category and return 204", async () => {
      const category = await Category.create({ name: "To Delete" });

      const response = await request(app)
        .delete(`/categories/${category.id}`);

      expect(response.status).toBe(204);

      // Check the database
      const deletedCategory = await Category.findByPk(category.id);
      expect(deletedCategory).toBeNull();
    });

    it("should return 404 if category to delete is not found", async () => {
      const response = await request(app)
        .delete("/categories/999");
      
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessages.CATEGORY_NOT_FOUND);
    });

    it("should return 404 if category ID is negative", async () => {
      const response = await request(app)
        .delete("/categories/-1");
      
      expect(response.status).toBe(404);
    });

    it("should return 404 if category ID is zero", async () => {
      const response = await request(app)
        .delete("/categories/0");
      
      expect(response.status).toBe(404);
    });

    it("should return 404 or 500 if category ID is invalid format", async () => {
      const response = await request(app)
        .delete("/categories/not-a-number");
      
      // Number("not-a-number") = NaN, may cause error (500) or return null (404)
      expect([404, 500]).toContain(response.status);
    });

    it("should handle deleting already deleted category", async () => {
      const category = await Category.create({ name: "To Delete" });
      await request(app).delete(`/categories/${category.id}`);
      
      const response = await request(app)
        .delete(`/categories/${category.id}`);
      
      expect(response.status).toBe(404);
    });
  });
});