import "dotenv/config";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getUnits = async (_req: Request, res: Response) => {
  const units = await prisma.measurementUnit.findMany({
    select: { id: true, symbol: true, description: true },
  });
  return res.json(units);
};