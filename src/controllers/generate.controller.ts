import { FastifyRequest, FastifyReply } from "fastify";
import { generateRandomSeed } from "../plugins/generateRandomSeed";
import { sendToGist } from "../plugins/sendToGist";
import { generateBodySchema, PrizeType } from "../schemas/generate.schema";
import { Static } from "@sinclair/typebox";

type GenerateBody = Static<typeof generateBodySchema>;

export async function generateController(
    request: FastifyRequest<{ Body: GenerateBody }>, 
    reply: FastifyReply
) {
    const { amount, title, seed, type, description, value, image } = request.body;
    try {
        let seedNumber = seed;
        if(!seedNumber){
            seedNumber = Math.floor(Math.random() * 10000000);
        }

        const currentDate = new Date();
        const random = generateRandomSeed(seedNumber, currentDate);

        const uniqueNumbers = new Set<{ value: number; type: PrizeType; description: string; image: string; ticket_number: string }>();
        
        while (uniqueNumbers.size < amount) {
            
            const randomValue = (random() % 9999999) + 1;
            
            const formattedNumber = randomValue.toString().padStart(7, '0');
            uniqueNumbers.add({
                value: value,
                type: type,
                description: description || '',
                image: image || '',
                ticket_number: formattedNumber
            });
        }

        const gistUrl = await sendToGist(JSON.stringify(Array.from(uniqueNumbers)), title, seedNumber, currentDate.toISOString());

        return reply.send({ 
            title,
            generatedAt: currentDate.toISOString(),
            totalAmount: amount,
            gistUrl,
            data: Array.from(uniqueNumbers),
            seed: seedNumber
        });
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ message: 'Erro interno no servidor' });
    }
}

export async function generateWithCustomSeedController(request: FastifyRequest, reply: FastifyReply) {
    const { amount, prize, title, seed, date } = request.body as { amount: number; prize: number; title: string; seed: number; date: string };

    try {
        const currentDate = new Date(date);
        const random = generateRandomSeed(seed, currentDate);

        const uniqueNumbers = new Set<{ ticket: string; prize: number }>();
        
        while (uniqueNumbers.size < amount) {
            
            const randomValue = (random() % 9999999) + 1;
            
            const formattedNumber = randomValue.toString().padStart(7, '0');
            uniqueNumbers.add({
                ticket: formattedNumber,
                prize: prize
            });
        }

        return reply.send({ 
            data: Array.from(uniqueNumbers),
            title,
            generatedAt: currentDate.toISOString(),
            totalAmount: amount
        });
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ message: 'Erro interno no servidor' });
    }
}
