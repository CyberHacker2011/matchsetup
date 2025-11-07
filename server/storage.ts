import { laptops, type Laptop, type InsertLaptop, type SearchLaptop } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, sql } from "drizzle-orm";

export interface IStorage {
  getAllLaptops(): Promise<Laptop[]>;
  getLaptop(id: string): Promise<Laptop | undefined>;
  createLaptop(laptop: InsertLaptop): Promise<Laptop>;
  updateLaptop(id: string, laptop: Partial<InsertLaptop>): Promise<Laptop | undefined>;
  deleteLaptop(id: string): Promise<boolean>;
  matchLaptops(criteria: SearchLaptop): Promise<{ laptop: Laptop; matchScore: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllLaptops(): Promise<Laptop[]> {
    return await db.select().from(laptops);
  }

  async getLaptop(id: string): Promise<Laptop | undefined> {
    const [laptop] = await db.select().from(laptops).where(eq(laptops.id, id));
    return laptop || undefined;
  }

  async createLaptop(insertLaptop: InsertLaptop): Promise<Laptop> {
    const [laptop] = await db
      .insert(laptops)
      .values(insertLaptop)
      .returning();
    return laptop;
  }

  async updateLaptop(id: string, updateData: Partial<InsertLaptop>): Promise<Laptop | undefined> {
    const [laptop] = await db
      .update(laptops)
      .set(updateData)
      .where(eq(laptops.id, id))
      .returning();
    return laptop || undefined;
  }

  async deleteLaptop(id: string): Promise<boolean> {
    const result = await db.delete(laptops).where(eq(laptops.id, id)).returning();
    return result.length > 0;
  }

  async matchLaptops(criteria: SearchLaptop): Promise<{ laptop: Laptop; matchScore: number }[]> {
    // Get all laptops from database
    const allLaptops = await this.getAllLaptops();

    if (allLaptops.length === 0) {
      return [];
    }

    // Calculate match scores for each laptop
    const results = allLaptops.map((laptop) => {
      const matchScore = this.calculateMatchScore(laptop, criteria);
      return { laptop, matchScore };
    });

    // Filter out laptops with 0% match and sort by match score (highest first)
    return results
      .filter((result) => result.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
  }

  private calculateMatchScore(laptop: Laptop, criteria: SearchLaptop): number {
    let totalScore = 0;
    let criteriaCount = 0;

    // Helper function to check text similarity (case-insensitive partial match)
    const textMatch = (laptopValue: string, criteriaValue: string | undefined): number => {
      if (!criteriaValue || criteriaValue.trim() === "") return 0; // No criteria provided, skip
      
      criteriaCount++;
      const laptopLower = laptopValue.toLowerCase();
      const criteriaLower = criteriaValue.toLowerCase().trim();

      // Exact match
      if (laptopLower === criteriaLower) return 1;

      // Contains match
      if (laptopLower.includes(criteriaLower) || criteriaLower.includes(laptopLower)) {
        return 0.7;
      }

      // Partial word match (check if any words match)
      const laptopWords = laptopLower.split(/\s+/);
      const criteriaWords = criteriaLower.split(/\s+/);
      
      let matchingWords = 0;
      for (const criteriaWord of criteriaWords) {
        if (laptopWords.some(laptopWord => 
          laptopWord.includes(criteriaWord) || criteriaWord.includes(laptopWord)
        )) {
          matchingWords++;
        }
      }

      if (matchingWords > 0) {
        return matchingWords / Math.max(criteriaWords.length, laptopWords.length) * 0.5;
      }

      return 0;
    };

    // Helper function for numeric comparisons
    const numericMatch = (laptopValue: string, criteriaValue: string | undefined): number => {
      if (!criteriaValue || criteriaValue.trim() === "") {
        return -1; // Signal to skip this criterion
      }
      
      criteriaCount++;
      const laptopNum = parseFloat(laptopValue);
      const criteriaNum = parseFloat(criteriaValue);

      if (isNaN(laptopNum) || isNaN(criteriaNum)) {
        // Fall back to text match if not numeric
        criteriaCount--; // Remove the count since we're delegating
        return textMatch(laptopValue, criteriaValue);
      }

      // For price and weight - laptop value should be <= criteria (max acceptable)
      const difference = Math.abs(laptopNum - criteriaNum);
      const maxDifference = criteriaNum * 0.3; // Allow 30% difference

      if (laptopNum <= criteriaNum) {
        return 1; // Perfect if within budget/weight
      } else if (difference <= maxDifference) {
        return 1 - (difference / maxDifference) * 0.5; // Partial match
      }

      return 0;
    };

    // Match each field (name removed from criteria)
    totalScore += textMatch(laptop.cpu, criteria.cpu);
    totalScore += textMatch(laptop.gpu, criteria.gpu);
    totalScore += textMatch(laptop.ram, criteria.ram);
    totalScore += textMatch(laptop.storage, criteria.storage);
    totalScore += textMatch(laptop.screenSpecs, criteria.screenSpecs);
    totalScore += textMatch(laptop.useCase, criteria.useCase);
    totalScore += textMatch(laptop.tier, criteria.tier);
    
    // Numeric fields (price and weight) - skip if criteria not provided
    const weightScore = numericMatch(laptop.weight, criteria.weight);
    if (weightScore >= 0) totalScore += weightScore;
    
    const priceScore = numericMatch(laptop.price, criteria.price);
    if (priceScore >= 0) totalScore += priceScore;

    // If no criteria provided, return 0
    if (criteriaCount === 0) return 0;

    // Calculate percentage (0-100)
    return (totalScore / criteriaCount) * 100;
  }
}

export const storage = new DatabaseStorage();
