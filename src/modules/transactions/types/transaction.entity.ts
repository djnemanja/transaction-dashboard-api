import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TransactionStatus } from '../enums/transaction.enum';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  category: string;

  @Column({ type: 'enum', enum: TransactionStatus })
  status: TransactionStatus;
}
