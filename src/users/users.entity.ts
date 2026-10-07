import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users') //unless name of table passed as tring, Entity-class is taken as table name,(all lowercase)
export class User{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string

    @Column({unique:true})
    email!:string

    @Column({default:18,nullable: true})// @Column() creates a NOT NULL constraint in PG,do this for optional column
    age?:number
//Above field will have age set to 18,if not provided.
//However,we can set or update age to NULL as well

    @CreateDateColumn()
    createdAt!:Date;

    @UpdateDateColumn()
    updatedAt!:Date;
}

// id:number works, but at times TS strict-features may throw an error, so use id!:number (it isnt not number, so its ok!)
// id!:number tells that its definite to have some value