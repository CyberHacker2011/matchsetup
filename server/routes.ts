import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLaptopSchema, searchLaptopSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all laptops
  app.get("/api/laptops", async (req, res) => {
    try {
      const laptops = await storage.getAllLaptops();
      res.json(laptops);
    } catch (error) {
      console.error("Error fetching laptops:", error);
      res.status(500).json({ error: "Failed to fetch laptops" });
    }
  });

  // Get single laptop by ID
  app.get("/api/laptops/:id", async (req, res) => {
    try {
      const laptop = await storage.getLaptop(req.params.id);
      if (!laptop) {
        return res.status(404).json({ error: "Laptop not found" });
      }
      res.json(laptop);
    } catch (error) {
      console.error("Error fetching laptop:", error);
      res.status(500).json({ error: "Failed to fetch laptop" });
    }
  });

  // Create new laptop
  app.post("/api/laptops", async (req, res) => {
    try {
      const validation = insertLaptopSchema.safeParse(req.body);
      if (!validation.success) {
        const readableError = fromZodError(validation.error);
        return res.status(400).json({ error: readableError.message });
      }

      const laptop = await storage.createLaptop(validation.data);
      res.status(201).json(laptop);
    } catch (error) {
      console.error("Error creating laptop:", error);
      res.status(500).json({ error: "Failed to create laptop" });
    }
  });

  // Update laptop
  app.patch("/api/laptops/:id", async (req, res) => {
    try {
      const validation = insertLaptopSchema.partial().safeParse(req.body);
      if (!validation.success) {
        const readableError = fromZodError(validation.error);
        return res.status(400).json({ error: readableError.message });
      }

      const laptop = await storage.updateLaptop(req.params.id, validation.data);
      if (!laptop) {
        return res.status(404).json({ error: "Laptop not found" });
      }
      res.json(laptop);
    } catch (error) {
      console.error("Error updating laptop:", error);
      res.status(500).json({ error: "Failed to update laptop" });
    }
  });

  // Delete laptop
  app.delete("/api/laptops/:id", async (req, res) => {
    try {
      const success = await storage.deleteLaptop(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Laptop not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting laptop:", error);
      res.status(500).json({ error: "Failed to delete laptop" });
    }
  });

  // Match laptops based on search criteria
  app.post("/api/laptops/match", async (req, res) => {
    try {
      const validation = searchLaptopSchema.safeParse(req.body);
      if (!validation.success) {
        const readableError = fromZodError(validation.error);
        return res.status(400).json({ error: readableError.message });
      }

      const results = await storage.matchLaptops(validation.data);
      res.json(results);
    } catch (error) {
      console.error("Error matching laptops:", error);
      res.status(500).json({ error: "Failed to match laptops" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
