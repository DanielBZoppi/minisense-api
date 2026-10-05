import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import crypto from "crypto";
import { z } from "zod";


const createStreamSchema = z.object({
  label: z.string({ message: "label é obrigatório" }).min(1),
  unitId: z.number({ message: "unitId é obrigatório" }).int().positive(),
});

const postMeasurementSchema = z.object({
  timestamp: z.number({ message: "timestamp é obrigatório" }).int().positive(),
  value: z.number({ message: "value é obrigatório" }),
});


export const getStreamByKey = async (req: Request, res: Response) => {
  const key = req.params.key as string;

  const stream = await prisma.dataStream.findUnique({
    where: { key },
    include: {
      _count: { select: { measurements: true } },
      measurements: {
        orderBy: { timestamp: "desc" },
        select: { timestamp: true, value: true },
      },
    },
  });

  if (!stream) {
    return res.status(404).json({ error: "Stream not found" });
  }

  return res.json({
    oid: stream.id,
    key: stream.key,
    label: stream.label,
    unitId: stream.unitId,
    deviceId: stream.deviceId,
    measurementCount: stream._count.measurements,
    measurements: stream.measurements.map((m: { timestamp: bigint; value: number }) => ({
      timestamp: Number(m.timestamp),
      value: m.value,
    })),
  });
};


export const createStream = async (req: Request, res: Response) => {
  const deviceKey = req.params.deviceKey as string;


  const parseResult = createStreamSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Payload inválido",
      details: parseResult.error.format(),
    });
  }

  const { label, unitId } = parseResult.data;

  const device = await prisma.sensorDevice.findUnique({
    where: { key: deviceKey },
  });

  if (!device) {
    return res.status(404).json({ error: "Device not found" });
  }

  const generatedKey = crypto.randomBytes(16).toString("hex");

  const stream = await prisma.dataStream.create({
    data: {
      key: generatedKey,
      label,
      unitId,
      deviceId: device.id,
    },
  });

  return res.status(201).json({
    id: stream.id,
    key: stream.key,
    label: stream.label,
    unitId: stream.unitId,
    deviceId: stream.deviceId,
    measurementCount: 0,
  });
};


export const postMeasurement = async (req: Request, res: Response) => {
  const streamKey = req.params.streamKey as string;

  // Validação do body com Zod
  const parseResult = postMeasurementSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Payload inválido",
      details: parseResult.error.format(),
    });
  }

  const { timestamp, value } = parseResult.data;

  const stream = await prisma.dataStream.findUnique({
    where: { key: streamKey },
  });

  if (!stream) {
    return res.status(404).json({ error: "Stream not found" });
  }

  const measurement = await prisma.sensorData.create({
    data: {
      streamId: stream.id,
      timestamp: BigInt(timestamp),
      value,
    },
  });

  return res.status(201).json({
    id: measurement.id,
    timestamp: Number(measurement.timestamp),
    value: measurement.value,
    unitId: stream.unitId,
  });
};