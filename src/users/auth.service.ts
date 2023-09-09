import { Injectable, BadRequestException } from '@nestjs/common'

import { promisify } from 'util'
import { randomBytes, scrypt as _scrypt } from 'crypto'

import { UsersService } from './users.service'

const scrypt = promisify(_scrypt) // "promisify" прави "scrypt" да работи с промиси, вместо с колбеци

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const users = await this.usersService.find(email)

    if (users.length) {
      throw new BadRequestException('Email in use!')
    }

    const salt = randomBytes(8).toString('hex')
    const hash = (await scrypt(password, salt, 32)) as Buffer // cast-ваме "as Buffer", защото TS не знае, че това е промис и го отчита като "unknown"
    const result = `${salt}.${hash.toString('hex')}`

    const user = await this.usersService.create(email, result)

    return user
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email)

    if (!user) {
      throw new BadRequestException('Invalid email or password')
    }

    const [salt, storedHash] = user.password.split('.')
    const hash = (await scrypt(password, salt, 32)) as Buffer
    const result = hash.toString('hex')

    if (storedHash !== result) {
      throw new BadRequestException('Invalid email or password')
    }

    return user
  }
}
