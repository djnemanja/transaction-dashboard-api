import { Repository } from 'typeorm';
import { Transaction } from './types/transaction.entity';
import { AppDataSource } from '../../config/database';

export class TransactionService {
  private transactionRepository: Repository<Transaction>;

  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transaction);
  }

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create(transactionData);
    return await this.transactionRepository.save(transaction);
  }

  async update(id: string, transactionData: Partial<Transaction>): Promise<Transaction | null> {
    await this.transactionRepository.update(id, transactionData);
    return await this.transactionRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async findOne(id: string): Promise<Transaction | null> {
    return await this.transactionRepository.findOne({ where: { id } });
  }

  async findAll(page: number = 1, limit: number = 10, category?: string | null, status?: string | null): Promise<{ transactions: Transaction[] | null; total: number }> {
    const offset = (page - 1) * limit;
    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;
    const transactions = await this.transactionRepository.find({
      where,
      skip: offset,
      take: limit,
      order: {
        date: 'desc',
      },
    });
    const total = await this.transactionRepository.count({ where });
    return { transactions, total };
  }
}
