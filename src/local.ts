import app from './server';
import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

const logger = pino();

async function startServer() {
    try {
        const port = Number(process.env.PORT) || 3000;
        
        app.listen({ port }, (err: Error | null, address: string) => {
            if (err) {
                logger.error('Error starting server:', err.message);
                process.exit(1);
            }
            logger.info(`Server is running locally on  ${address}`);
        });
    } catch (error) {
        logger.error('Error starting application:', error);
        process.exit(1);
    }
}

startServer();