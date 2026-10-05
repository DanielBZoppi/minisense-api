import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { routes } from "./routes/index";

export const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", routes);