import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { EndUser } from "../../endUser/entities/endUser.entity";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "varchar", length: 255 })
    currency: string;

    @Column({ type: "varchar", length: 50 })
    payment_status: string; // e.g., "pending", "completed", "failed"

    @ManyToOne(() => Client, (client) => client.transactions)
    client: Client;

    @ManyToOne(() => EndUser, (endUser) => endUser.id)
    end_user: EndUser;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
