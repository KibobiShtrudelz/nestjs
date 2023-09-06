import {
  Column,
  Entity,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  PrimaryGeneratedColumn
} from 'typeorm'
import { IsEmail } from 'class-validator'

// typeORM hooks ни позволяват да дефинираме функции в ентитито,
// които могат да бъдат извиквани
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsEmail()
  email: string

  @Column()
  password: string

  @AfterInsert() // Всеки път, когато създаваме user в DB-то ни typeORM ще извиква този метод
  logInsert() {
    console.log(`Inserted User with ID ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with ID ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User with ID ${this.id}`)
  }
}
