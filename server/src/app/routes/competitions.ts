import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { competitionsSchema } from '../schemas';
import { CompetitionsController } from '../controllers';

export const competitionsRoutes: FastifyPluginAsyncTypebox = async (
  fastify,
): Promise<void> => {
  const competitionsController = new CompetitionsController(
    fastify.databaseService,
  );

  fastify.get('/', competitionsSchema.list, competitionsController.list);
};
