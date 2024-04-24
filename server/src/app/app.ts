import { FastifyInstance } from 'fastify';
import { fastifySensible } from '@fastify/sensible';
import root from './routes/root';

export async function app(fastify: FastifyInstance) {
  // register global plugins
  fastify.register(fastifySensible);

  // register routes
  fastify.register(root, { prefix: '/root' });
}
