import { db } from "./db";
import { laptops } from "@shared/schema";

// Realistic 2025 laptops currently on sale
const laptops2025 = [
  // Gaming Laptops
  {
    name: "ASUS ROG Strix G16 (2024)",
    storage: "1TB NVMe SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-13650HX",
    gpu: "NVIDIA RTX 4060",
    screenSpecs: '16" WUXGA 165Hz',
    weight: "2.50",
    price: "1399.99",
    useCase: "Gaming",
    tier: "Mid-Range",
  },
  {
    name: "MSI Katana 15 (2024)",
    storage: "512GB NVMe SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-13620H",
    gpu: "NVIDIA RTX 4050",
    screenSpecs: '15.6" FHD 144Hz',
    weight: "2.25",
    price: "999.99",
    useCase: "Gaming",
    tier: "Budget",
  },
  {
    name: "Lenovo Legion Pro 5i Gen 9",
    storage: "1TB NVMe SSD",
    ram: "32GB DDR5",
    cpu: "Intel Core i9-14900HX",
    gpu: "NVIDIA RTX 4070",
    screenSpecs: '16" WQXGA 240Hz',
    weight: "2.45",
    price: "1899.99",
    useCase: "Gaming",
    tier: "Premium",
  },
  {
    name: "Alienware m16 R2",
    storage: "2TB NVMe SSD",
    ram: "32GB DDR5",
    cpu: "Intel Core i9-14900HX",
    gpu: "NVIDIA RTX 4080",
    screenSpecs: '16" QHD+ 240Hz',
    weight: "2.68",
    price: "2599.99",
    useCase: "Gaming",
    tier: "Flagship",
  },
  
  // Business Laptops
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    storage: "512GB NVMe SSD",
    ram: "16GB LPDDR5",
    cpu: "Intel Core Ultra 7 155U",
    gpu: "Intel Arc Graphics",
    screenSpecs: '14" WUXGA IPS',
    weight: "1.12",
    price: "1549.99",
    useCase: "Business",
    tier: "Premium",
  },
  {
    name: "Dell Latitude 5440",
    storage: "256GB NVMe SSD",
    ram: "8GB DDR5",
    cpu: "Intel Core i5-1345U",
    gpu: "Intel Iris Xe",
    screenSpecs: '14" FHD',
    weight: "1.56",
    price: "899.99",
    useCase: "Business",
    tier: "Mid-Range",
  },
  {
    name: "HP EliteBook 840 G10",
    storage: "512GB NVMe SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-1365U",
    gpu: "Intel Iris Xe",
    screenSpecs: '14" FHD',
    weight: "1.36",
    price: "1299.99",
    useCase: "Business",
    tier: "Premium",
  },
  {
    name: "Microsoft Surface Laptop 6",
    storage: "256GB SSD",
    ram: "16GB LPDDR5x",
    cpu: "Intel Core Ultra 5 135H",
    gpu: "Intel Arc Graphics",
    screenSpecs: '13.5" PixelSense',
    weight: "1.35",
    price: "1099.99",
    useCase: "Business",
    tier: "Mid-Range",
  },

  // Content Creation Laptops
  {
    name: "MacBook Pro 14 M3 Pro",
    storage: "512GB SSD",
    ram: "18GB Unified",
    cpu: "Apple M3 Pro",
    gpu: "14-Core GPU",
    screenSpecs: '14.2" Liquid Retina XDR',
    weight: "1.61",
    price: "1999.00",
    useCase: "Content Creation",
    tier: "Flagship",
  },
  {
    name: "ASUS ProArt Studiobook 16",
    storage: "1TB NVMe SSD",
    ram: "32GB DDR5",
    cpu: "Intel Core i9-13980HX",
    gpu: "NVIDIA RTX 4070",
    screenSpecs: '16" 4K OLED',
    weight: "2.40",
    price: "2299.99",
    useCase: "Content Creation",
    tier: "Flagship",
  },
  {
    name: "Dell XPS 15 (9530)",
    storage: "512GB NVMe SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-13700H",
    gpu: "NVIDIA RTX 4050",
    screenSpecs: '15.6" FHD+ IPS',
    weight: "1.86",
    price: "1699.99",
    useCase: "Content Creation",
    tier: "Premium",
  },
  {
    name: "HP Envy 16 (2024)",
    storage: "1TB NVMe SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-13700H",
    gpu: "NVIDIA RTX 4060",
    screenSpecs: '16" WQUXGA IPS',
    weight: "2.20",
    price: "1499.99",
    useCase: "Content Creation",
    tier: "Mid-Range",
  },

  // General Use / Everyday Laptops
  {
    name: "Acer Aspire 5 A515-58M",
    storage: "512GB NVMe SSD",
    ram: "8GB DDR5",
    cpu: "Intel Core i5-1335U",
    gpu: "Intel Iris Xe",
    screenSpecs: '15.6" FHD IPS',
    weight: "1.77",
    price: "549.99",
    useCase: "General Use",
    tier: "Budget",
  },
  {
    name: "HP Pavilion 15 (2024)",
    storage: "512GB SSD",
    ram: "16GB DDR4",
    cpu: "AMD Ryzen 5 7530U",
    gpu: "AMD Radeon Graphics",
    screenSpecs: '15.6" FHD IPS',
    weight: "1.75",
    price: "649.99",
    useCase: "General Use",
    tier: "Budget",
  },
  {
    name: "Lenovo IdeaPad Flex 5i Gen 9",
    storage: "512GB NVMe SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-1355U",
    gpu: "Intel Iris Xe",
    screenSpecs: '14" WUXGA Touch',
    weight: "1.55",
    price: "799.99",
    useCase: "General Use",
    tier: "Mid-Range",
  },
  {
    name: "ASUS Zenbook 14 OLED",
    storage: "512GB NVMe SSD",
    ram: "16GB LPDDR5",
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc Graphics",
    screenSpecs: '14" 2.8K OLED',
    weight: "1.20",
    price: "1099.99",
    useCase: "General Use",
    tier: "Premium",
  },

  // Ultra-portable / Thin & Light
  {
    name: "LG Gram 17 (2024)",
    storage: "1TB NVMe SSD",
    ram: "16GB LPDDR5",
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc Graphics",
    screenSpecs: '17" WQXGA IPS',
    weight: "1.35",
    price: "1799.99",
    useCase: "Business",
    tier: "Premium",
  },
  {
    name: "MacBook Air 15 M3",
    storage: "512GB SSD",
    ram: "16GB Unified",
    cpu: "Apple M3",
    gpu: "10-Core GPU",
    screenSpecs: '15.3" Liquid Retina',
    weight: "1.51",
    price: "1499.00",
    useCase: "General Use",
    tier: "Premium",
  },
  {
    name: "Dell XPS 13 Plus (9340)",
    storage: "512GB NVMe SSD",
    ram: "16GB LPDDR5x",
    cpu: "Intel Core Ultra 7 165U",
    gpu: "Intel Arc Graphics",
    screenSpecs: '13.4" FHD+ OLED',
    weight: "1.24",
    price: "1399.99",
    useCase: "Business",
    tier: "Premium",
  },
  {
    name: "ASUS Vivobook S 15 OLED",
    storage: "512GB NVMe SSD",
    ram: "16GB LPDDR5",
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc Graphics",
    screenSpecs: '15.6" 3K OLED',
    weight: "1.50",
    price: "899.99",
    useCase: "General Use",
    tier: "Mid-Range",
  },
];

async function seed() {
  console.log("Starting database seed with 2025 laptops...");

  try {
    // Clear existing laptops
    await db.delete(laptops);
    console.log("Cleared existing laptop data");

    // Insert 2025 laptops
    await db.insert(laptops).values(laptops2025);
    console.log(`Successfully seeded ${laptops2025.length} 2025 laptops!`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
