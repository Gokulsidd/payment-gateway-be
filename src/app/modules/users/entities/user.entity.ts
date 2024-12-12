import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
     @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 255
    })
    name: string;

    @Column({
        type: "varchar",
        length: 255
    })
    email: string;

    @Column({
        type: "varchar",
        length: 255
    })
    password: string;
    
    // @Column({
    //     type: "varchar",
    //     length: 255
    // })
    // business_name: string;

    // @Column({
    //     type: "varchar",
    //     length: 255,
    //     nullable: true
    // })
    // webhook_url: string;

    @Column({
        type: "varchar",
        length: 255,
        array: true
    })
    roles: string[];

    @Column({
        type: "date",
    })
    created_at: Date;

    @Column({
        type: "date",
    })
    updated_at: Date;
}