import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const laptops = pgTable("laptops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  storage: text("storage").notNull(), // e.g., "512GB SSD", "1TB HDD"
  ram: text("ram").notNull(), // e.g., "16GB", "32GB DDR4"
  cpu: text("cpu").notNull(), // e.g., "Intel i7-12700H", "AMD Ryzen 9 5900HX"
  gpu: text("gpu").notNull(), // e.g., "NVIDIA RTX 3060", "Integrated"
  screenSpecs: text("screen_specs").notNull(), // e.g., "15.6\" FHD 144Hz", "14\" 4K OLED"
  weight: decimal("weight", { precision: 4, scale: 2 }).notNull(), // in kg, e.g., 1.85
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // in USD
  useCase: text("use_case").notNull(), // e.g., "Gaming", "Business", "Content Creation"
  tier: text("tier").notNull(), // e.g., "Budget", "Mid-Range", "Premium", "Flagship"
});

export const insertLaptopSchema = createInsertSchema(laptops).omit({
  id: true,
});

export type InsertLaptop = z.infer<typeof insertLaptopSchema>;
export type Laptop = typeof laptops.$inferSelect;

// Search criteria schema for matching - all fields optional (name removed)
export const searchLaptopSchema = z.object({
  storage: z.string().optional(),
  ram: z.string().optional(),
  cpu: z.string().optional(),
  gpu: z.string().optional(),
  screenSpecs: z.string().optional(),
  weight: z.string().optional(),
  price: z.string().optional(),
  useCase: z.string().optional(),
  tier: z.string().optional(),
});

export type SearchLaptop = z.infer<typeof searchLaptopSchema>;
