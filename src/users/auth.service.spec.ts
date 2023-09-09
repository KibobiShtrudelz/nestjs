import { Test } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'

import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    // Create a fake copy of the users service
    const fakeUsersService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User)
    }

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile()

    service = module.get(AuthService)
  })

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined()
  })

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp('some@email.io', 'sampasuard')

    expect(user.password).not.toEqual('sampasuard')

    const [salt, hash] = user.password.split('.')

    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })
})
