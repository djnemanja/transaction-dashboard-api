import { FastifyInstance } from 'fastify';
import { TransactionService } from './transaction.service';
import { Transaction } from './types/transaction.entity';

export async function transactionRoutes(fastify: FastifyInstance) {
  const transactionService = new TransactionService();

  fastify.post('/transactions', async (request, reply) => {
    try {
      const transactionData = request.body as Partial<Transaction>;
      const transaction = await transactionService.create(transactionData);
      return reply.status(200).send(transaction);
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  });

  fastify.put('/transactions/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const transactionData = request.body as Partial<Transaction>;
      const transaction = await transactionService.update(id, transactionData);
      return reply.status(200).send(transaction);
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  });

  fastify.delete('/transactions/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      await transactionService.delete(id);
      return reply.status(200).send({ message: 'Transaction deleted successfully' });
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  });

  fastify.get('/transactions/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const transaction = await transactionService.findOne(id);
      return reply.status(200).send(transaction);
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  });

  fastify.get('/transactions', async (request, reply) => {
    try {
      const { page = 1, limit = 10, category, status } = request.query as { page: number; limit: number; category?: string; status?: string };
      const { transactions, total } = await transactionService.findAll(page, limit, category, status);
      return reply.status(200).send({ transactions, total, page, limit });
    } catch (err) {
      return reply.status(400).send({ error: (err as Error).message });
    }
  });
}
