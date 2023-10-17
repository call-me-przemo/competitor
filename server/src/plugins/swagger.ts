import fp from "fastify-plugin";
import { fastifySwagger, FastifySwaggerOptions } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { config } from "../config";

export default fp<FastifySwaggerOptions>(async (fastify) => {
  if (config.environment === "development") {
    fastify.register(fastifySwagger, {
      swagger: {
        info: { title: "Competitor REST API", version: "0.0.0" },
      },
    });
    fastify.register(fastifySwaggerUi);
  }
});
