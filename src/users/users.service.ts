import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // Създаваме typeORM repository. Понеже typeORM не работи много добре с TS Generics използваме @InjectRepository
  ) {}

  async create(email: string, password: string) {
    const user = this.userRepository.create({ email, password });

    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async find(email: string) {
    return await this.userRepository.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new Error(`User with ID ${id} not found!`);
      }

      Object.assign(user, attrs);

      return this.userRepository.save(user);
    } catch (error) {
      throw new Error(`Updating user with ID ${id} has thrown an error!`);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new Error(`User with ID ${id} not found!`);
      }

      return this.userRepository.remove(user);
    } catch (error) {
      throw new Error(`Deleting user with ID ${id} has thrown an error!`);
    }
  }
}
