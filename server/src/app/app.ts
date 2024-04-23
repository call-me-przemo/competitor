import { FastifyInstance } from 'fastify';
import { fastifySensible } from '@fastify/sensible';
import root from './routes/root';

export async function app(fastify: FastifyInstance) {
  fastify.register(fastifySensible);

  fastify.register(root, { prefix: '/root' });
}
