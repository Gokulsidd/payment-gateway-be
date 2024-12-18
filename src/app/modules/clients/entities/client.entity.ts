import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { User } from '../../users/entities/user.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' }) // Foreign key column in clients table
  user: User;

  @Column({ type: "uuid" }) 
  user_id: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  business_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  webhook_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  api_key: string;

  @Column({ type: 'boolean', default: true })
  is_Active: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
