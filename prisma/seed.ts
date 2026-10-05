import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });


const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({ adapter });

async function main() {
  const units = [
    { id: 1, symbol: "ºC", description: "Celsius" },
    { id: 2, symbol: "mg/m³", description: "Megagram per cubic metre" },
    { id: 3, symbol: "hPA", description: "hectopascal" },
    { id: 4, symbol: "lux", description: "Lux" },
    { id: 5, symbol: "%", description: "Percent" },
  ];

  for (const unit of units) {
    await prisma.measurementUnit.upsert({
      where: { id: unit.id },
      update: {},
      create: unit,
    });
  }

  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Usuario Teste",
      email: "teste@minisense.io",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });