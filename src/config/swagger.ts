import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Qper API", version: "1.0.0" },
  },
  apis: ["./src/api/**/*.ts"],
};

const specs = swaggerJSDoc(options);

const setUpSwagger = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setUpSwagger;
