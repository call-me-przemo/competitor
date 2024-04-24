import { FastifyInstance } from 'fastify';
import { fastifySensible } from '@fastify/sensible';
import root from './routes/root';
import { join } from 'path';

export async function app(fastify: FastifyInstance) {
  // register global plugins
  fastify.register(fastifySensible);

  // register dev plugins
  if (process.env.NODE_ENV === 'dev') {
    fastify.register(import('@fastify/static'), {
      root: join(__dirname, 'public'),
      prefix: '/public',
    });
  }

  // register routes
  fastify.register(root, { prefix: '/root' });
}
