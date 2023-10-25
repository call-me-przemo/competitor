import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

export default fp((fastify, options, done) => {
  const prisma = new PrismaClient();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (fasitfy) => {
    await prisma.$disconnect();
  });

  done();
});

declare module "fastify" {
  export interface FastifyInstance {
    prisma: PrismaClient;
  }
}
