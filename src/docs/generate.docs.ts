import { generateResponseSchema, generateBodySchema, generateWithCustomSeedBodySchema } from "../schemas/generate.schema";
import { Type } from "@sinclair/typebox";

export const generateDocSchema = {
    description: 'Gera números aleatórios',
    tags: ['Generate'],
    body: generateBodySchema,
    response: {
        200: generateResponseSchema,
        400: Type.Object({ errors: Type.Any() }),
        401: Type.Object({ message: Type.String() }),
        500: Type.Object({ message: Type.String() }),
    }
}

export const generateWithCustomSeedDocSchema = {
    description: 'Gera números aleatórios com um seed personalizado',
    tags: ['Generate'],
    body: generateWithCustomSeedBodySchema,
    response: {
        200: generateResponseSchema,
        400: Type.Object({ errors: Type.Any() }),
        401: Type.Object({ message: Type.String() }),
        500: Type.Object({ message: Type.String() }),
    }
}

