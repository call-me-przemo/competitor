import { fastify } from 'fastify';
import { app } from './app/app';

fastify({
  logger: {
    level: process.env.LOG_LEVEL,
  },
})
  .register(app)
  .listen({ port: Number(process.env.APP_PORT), host: process.env.APP_HOST });
