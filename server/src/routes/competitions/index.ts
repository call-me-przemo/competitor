import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { competitionsSchema } from "../../schemas";
import { CompetitionsDatabaseService } from "../../services/database";
import { CompetitionsController } from "../../controllers";

const competitions: FastifyPluginAsyncTypebox = async (
  fastify,
): Promise<void> => {
  const databaseService = new CompetitionsDatabaseService(fastify.prisma);
  const competitionsController = new CompetitionsController(databaseService);

  fastify.get("/", competitionsSchema.list, competitionsController.list);
};

export default competitions;
