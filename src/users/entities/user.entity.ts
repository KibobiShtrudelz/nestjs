import {
  Column,
  Entity,
  OneToMany,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  PrimaryGeneratedColumn
} from 'typeorm'
import { IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'

import { Report } from '../../reports/entities/report.entity'

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
  @Exclude()
  password: string

  @OneToMany(() => Report, report => report.user) // Всеки user има много reports
  reports: Report[]

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
