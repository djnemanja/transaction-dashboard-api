import { DataSource } from 'typeorm';
import { Transaction } from '../modules/transactions/types/transaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'transaction_dashboard',
  synchronize: true,
  logging: true,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
