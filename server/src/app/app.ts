import { FastifyInstance } from 'fastify';
import { fastifySensible } from '@fastify/sensible';
import root from './routes/root';
import { join } from 'path';
import { seedDb } from './database/seeders';

export async function app(fastify: FastifyInstance) {
  // register global plugins
  fastify.register(fastifySensible);

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
  fastify.register(root, { prefix: '/root' });
}
