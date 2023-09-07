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

    // 75. Creating a User 00:00
  }

  signIn(email: string, password: string) {}
}
