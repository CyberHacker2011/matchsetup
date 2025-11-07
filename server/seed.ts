import { db } from "./db";
import { laptops } from "@shared/schema";

const sampleLaptops = [
  {
    name: "Dell XPS 15",
    storage: "512GB NVMe SSD",
    ram: "16GB DDR4",
    cpu: "Intel Core i7-12700H",
    gpu: "NVIDIA GeForce RTX 3050",
    screenSpecs: '15.6" FHD+ 1920x1200',
    weight: "1.86",
    price: "1599.99",
    useCase: "Content Creation",
    tier: "Premium",
  },
  {
    name: "MacBook Pro 14",
    storage: "512GB SSD",
    ram: "16GB Unified",
    cpu: "Apple M3 Pro",
    gpu: "Integrated GPU",
    screenSpecs: '14.2" Liquid Retina XDR',
    weight: "1.55",
    price: "1999.00",
    useCase: "Content Creation",
    tier: "Flagship",
  },
  {
    name: "ASUS ROG Strix G15",
    storage: "1TB NVMe SSD",
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 9 7940HS",
    gpu: "NVIDIA RTX 4060",
    screenSpecs: '15.6" QHD 165Hz',
    weight: "2.30",
    price: "1799.99",
    useCase: "Gaming",
    tier: "Premium",
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    storage: "512GB SSD",
    ram: "16GB LPDDR5",
    cpu: "Intel Core i7-1365U",
    gpu: "Integrated Intel Iris Xe",
    screenSpecs: '14" WUXGA IPS',
    weight: "1.12",
    price: "1449.00",
    useCase: "Business",
    tier: "Premium",
  },
  {
    name: "HP Pavilion 15",
    storage: "256GB SSD",
    ram: "8GB DDR4",
    cpu: "Intel Core i5-1235U",
    gpu: "Integrated Intel UHD",
    screenSpecs: '15.6" FHD IPS',
    weight: "1.75",
    price: "649.99",
    useCase: "Business",
    tier: "Budget",
  },
  {
    name: "MSI Stealth 16",
    storage: "1TB NVMe SSD",
    ram: "32GB DDR5",
    cpu: "Intel Core i9-13900H",
    gpu: "NVIDIA RTX 4070",
    screenSpecs: '16" QHD+ 240Hz',
    weight: "1.99",
    price: "2299.00",
    useCase: "Gaming",
    tier: "Flagship",
  },
  {
    name: "Acer Aspire 5",
    storage: "512GB SSD",
    ram: "8GB DDR4",
    cpu: "AMD Ryzen 5 5500U",
    gpu: "Integrated Radeon",
    screenSpecs: '15.6" FHD IPS',
    weight: "1.80",
    price: "549.99",
    useCase: "General Use",
    tier: "Budget",
  },
  {
    name: "Razer Blade 15",
    storage: "1TB SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-13800H",
    gpu: "NVIDIA RTX 4060",
    screenSpecs: '15.6" FHD 360Hz',
    weight: "2.01",
    price: "2199.99",
    useCase: "Gaming",
    tier: "Premium",
  },
  {
    name: "Microsoft Surface Laptop 5",
    storage: "512GB SSD",
    ram: "16GB LPDDR5",
    cpu: "Intel Core i7-1255U",
    gpu: "Integrated Intel Iris Xe",
    screenSpecs: '13.5" PixelSense',
    weight: "1.27",
    price: "1399.99",
    useCase: "Business",
    tier: "Mid-Range",
  },
  {
    name: "LG Gram 17",
    storage: "1TB SSD",
    ram: "16GB DDR5",
    cpu: "Intel Core i7-1360P",
    gpu: "Integrated Intel Iris Xe",
    screenSpecs: '17" WQXGA IPS',
    weight: "1.35",
    price: "1699.00",
    useCase: "Content Creation",
    tier: "Mid-Range",
  },
];

async function seed() {
  console.log("Starting database seed...");

  try {
    // Check if laptops already exist
    const existing = await db.select().from(laptops);
    if (existing.length > 0) {
      console.log(`Database already has ${existing.length} laptops. Skipping seed.`);
      return;
    }

    // Insert sample laptops
    await db.insert(laptops).values(sampleLaptops);
    console.log(`Successfully seeded ${sampleLaptops.length} laptops!`);
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
