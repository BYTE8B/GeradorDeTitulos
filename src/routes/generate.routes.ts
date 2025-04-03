import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { generateController, generateWithCustomSeedController } from '../controllers/generate.controller';
import { generateDocSchema } from '../docs/generate.docs';

export default async function generateRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.post('/', { schema: generateDocSchema }, generateController);
    fastify.post('/custom', { schema: generateDocSchema }, generateWithCustomSeedController);
}