import Fastify from 'fastify';
import cors from '@fastify/cors';
import { initDatabase } from './config/database';
import { propertyRoutes } from './routes/property.routes';

const PORT = process.env.PORT || 3001;

async function buildServer() {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
      },
    },
  });
  
  // CORS configuration
  await fastify.register(cors, {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400, // 24 heures en secondes
  });
  
  // Health check
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });
  
  // Register routes
  fastify.register(propertyRoutes, { prefix: '/api/properties' });
  
  // Global error handler
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);
    
    interface FastifyError extends Error {
      statusCode?: number;
    }
    
    const err = error as FastifyError;
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Une erreur interne est survenue';
    
    reply.status(statusCode).send({
      success: false,
      error: message,
      statusCode,
    });
  });
  
  return fastify;
}

async function start() {
  try {
    // Initialiser la base de données
    await initDatabase();
    
    // Construire et démarrer le serveur
    const fastify = await buildServer();
    
    await fastify.listen({ port: Number(PORT), host: '0.0.0.0' });
    
    console.log(`
    🚀 Serveur démarré avec succès !
    📍 API : http://localhost:${PORT}
    🏥 Health : http://localhost:${PORT}/health
    📚 Routes : http://localhost:${PORT}/api/properties
    `);
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

start();