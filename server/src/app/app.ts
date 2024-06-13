import { FastifyInstance } from 'fastify';
import { fastifySensible } from '@fastify/sensible';
import { join } from 'path';
import { seedDb } from './database/seeders';
import { DatabaseService } from './services';
import { competitionsRoutes } from './routes/competitions';

export async function app(fastify: FastifyInstance) {
  // initialize global services
  const databaseService = new DatabaseService();

  // register global plugins
  fastify.register(fastifySensible);
  fastify.decorate('databaseService', databaseService);

  // register dev plugins
  if (process.env.NODE_ENV === 'dev') {
    fastify.register(import('@fastify/static'), {
      root: join(__dirname, '..', '..', '..', 'public'),
      prefix: '/public',
    });
    fastify.register(import('@fastify/swagger'), {
      swagger: {
        info: { title: 'Competitor REST API', version: '0.0.0' },
      },
    });
    fastify.register(import('@fastify/swagger-ui'));

    await seedDb();
  }

  // register routes
  fastify.register(competitionsRoutes, { prefix: '/competitions' });
}

// declare registered services for typescript support
declare module 'fastify' {
  export interface FastifyInstance {
    databaseService: DatabaseService;
  }
}
