import "dotenv/config";
import { Router } from "express";
import { getUnits } from "../controllers/unit.controller";
import {
  getUserDevices,
  getDeviceByKey,
  createDevice,
} from "../controllers/device.controller";
import {
  getStreamByKey,
  createStream,
  postMeasurement,
} from "../controllers/stream.controller";

export const routes = Router();

/**
 * @openapi
 * /units:
 *   get:
 *     summary: Lista todas as unidades de medida cadastradas
 *     tags:
 *       - Units
 *     responses:
 *       200:
 *         description: Lista de unidades retornada com sucesso
 */
routes.get("/units", getUnits);

/**
 * @openapi
 * /devices:
 *   get:
 *     summary: Lista os dispositivos do usuário
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *           default: 1
 *         description: ID do usuário proprietário dos dispositivos
 *     responses:
 *       200:
 *         description: Lista de dispositivos do usuário
 *   post:
 *     summary: Cadastra um novo dispositivo
 *     tags:
 *       - Devices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *             properties:
 *               label:
 *                 type: string
 *                 example: Sensor de Temperatura Sala 1
 *               description:
 *                 type: string
 *                 example: Dispositivo localizado no segundo andar
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Dispositivo cadastrado com sucesso
 *       500:
 *         description: Erro interno ao cadastrar dispositivo
 */
routes.get("/devices", getUserDevices);
routes.post("/devices", createDevice);

/**
 * @openapi
 * /devices/{key}:
 *   get:
 *     summary: Obtém um dispositivo e seus dados detalhados via chave (key)
 *     tags:
 *       - Devices
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave única hexadecimal do dispositivo
 *     responses:
 *       200:
 *         description: Dados do dispositivo e suas streams associadas
 *       404:
 *         description: Dispositivo não encontrado
 */
routes.get("/devices/:key", getDeviceByKey);

/**
 * @openapi
 * /devices/{deviceKey}/streams:
 *   post:
 *     summary: Cria uma nova stream de dados associada a um dispositivo
 *     tags:
 *       - Streams
 *     parameters:
 *       - in: path
 *         name: deviceKey
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave única do dispositivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - unitId
 *             properties:
 *               label:
 *                 type: string
 *                 example: Temperatura Interna
 *               unitId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Stream criada com sucesso
 *       404:
 *         description: Dispositivo não encontrado
 */
routes.post("/devices/:deviceKey/streams", createStream);

/**
 * @openapi
 * /streams/{key}:
 *   get:
 *     summary: Consulta dados de uma stream específica
 *     tags:
 *       - Streams
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave única da stream
 *     responses:
 *       200:
 *         description: Dados da stream retornados com sucesso
 *       404:
 *         description: Stream não encontrada
 */
routes.get("/streams/:key", getStreamByKey);

/**
 * @openapi
 * /streams/{streamKey}/measurements:
 *   post:
 *     summary: Envia uma nova medição de sensor para uma stream
 *     tags:
 *       - Measurements
 *     parameters:
 *       - in: path
 *         name: streamKey
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave única da stream de destino
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: number
 *                 example: 25.4
 *               timestamp:
 *                 type: integer
 *                 example: 1700000000
 *     responses:
 *       201:
 *         description: Medição registrada com sucesso
 *       404:
 *         description: Stream não encontrada
 */
routes.post("/streams/:streamKey/measurements", postMeasurement);