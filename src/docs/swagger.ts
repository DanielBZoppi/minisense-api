import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MiniSense IoT API",
      version: "1.0.0",
      description: "API RESTful para gerenciamento de dispositivos e streams de dados IoT.",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor Local / Docker",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.{ts,js}")],
};

export const swaggerSpec = swaggerJSDoc(options);