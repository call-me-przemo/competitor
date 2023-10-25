import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { schema } from "./schema";
import { Controller } from "./controller";
import { Service } from "./service";

const competitions: FastifyPluginAsyncTypebox = async (
  fastify,
): Promise<void> => {
  const service = new Service(fastify.prisma);
  const controller = new Controller(service);

  fastify.get("/", schema.list, controller.list);
};

export default competitions;
