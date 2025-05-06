import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { AppDataSource } from './config/database';
import { transactionRoutes } from './modules/transactions/transactions.routes';

async function buildApp() {
  const app = fastify();
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }

  await app.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.register(transactionRoutes);

  return app;
}

async function start() {
  try {
    const app = await buildApp();
    await app.listen({ 
      port: Number(process.env.PORT) || 3005, 
      host: process.env.HOST || "0.0.0.0"
    });
    console.log(`Server is running`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
