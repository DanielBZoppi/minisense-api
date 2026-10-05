import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import crypto from "crypto";

export const getUserDevices = async (req: Request, res: Response) => {
  const userId = Number(req.query.userId) || 1;

  const devices = await prisma.sensorDevice.findMany({
    where: { userId },
    include: {
      streams: {
        include: {
          _count: { select: { measurements: true } },
        },
      },
    },
  });

  const response = devices.map((device) => ({
    id: device.id,
    key: device.key,
    label: device.label,
    description: device.description,
    streams: device.streams.map((stream) => ({
      id: stream.id,
      key: stream.key,
      label: stream.label,
      unitId: stream.unitId,
      deviceId: stream.deviceId,
      measurementCount: stream._count.measurements,
    })),
  }));

  return res.json(response);
};

export const getDeviceByKey = async (req: Request, res: Response) => {
  const key = req.params.key as string;

  const device = await prisma.sensorDevice.findUnique({
    where: { key },
    include: {
      streams: {
        include: {
          _count: { select: { measurements: true } },
          measurements: {
            take: 5,
            orderBy: { timestamp: "desc" },
            select: { timestamp: true, value: true },
          },
        },
      },
    },
  });

  if (!device) {
    return res.status(404).json({ error: "Device not found" });
  }

  const response = {
    id: device.id,
    key: device.key,
    label: device.label,
    description: device.description,
    streams: device.streams.map((stream) => ({
      id: stream.id,
      key: stream.key,
      label: stream.label,
      unitId: stream.unitId,
      deviceId: stream.deviceId,
      measurementCount: stream._count.measurements,
      measurements: stream.measurements.map((m: { timestamp: bigint; value: number }) => ({
        timestamp: Number(m.timestamp),
        value: m.value,
      })),
    })),
  };

  return res.json(response);
};

export const createDevice = async (req: Request, res: Response) => {
  try {
    const { label, description, userId = 1 } = req.body;

    // Garante que o usuário existe antes de tentar vincular o dispositivo
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: "Usuario Padrao",
        email: "usuario@minisense.io",
      },
    });

    const generatedKey = crypto.randomBytes(16).toString("hex");

    const device = await prisma.sensorDevice.create({
      data: {
        key: generatedKey,
        label,
        description,
        userId,
      },
    });

    return res.status(201).json({
      id: device.id,
      key: device.key,
      label: device.label,
      description: device.description,
    });
  } catch (error) {
    console.error("Erro ao criar dispositivo:", error);
    return res.status(500).json({ error: "Erro interno ao cadastrar dispositivo" });
  }
};