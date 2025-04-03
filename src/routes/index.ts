import { FastifyInstance, FastifyPluginOptions } from "fastify";
import generateRoutes from "./generate.routes";

export default async function routes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.register(generateRoutes, { prefix: '/generate' });
  }