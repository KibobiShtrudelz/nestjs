import { Test } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'

import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('AuthService', () => {
  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeUsersService = {
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

  it('throws an error if user signs up with email that is in use', async () => {
    // Така презаписваме "find" метода от fakeUsersService, за да можем
    // да използваме "find", както ни е необходим тук, т.е. да връща обект с потребител
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'ko@staa.men', password: '1' } as User])
    await expect(service.signUp('ko@staa.men', 'staa')).rejects.toThrow(BadRequestException)

    // Когато директно връщаме нещо в колбека не бива да ползваме "done()", който идва като аргумент в колбека.
    // TS изпръцква с async колбеците и затова или го правим така, както е написано или в къдрави скоби ползваме done(),
    // който идва като аргумент от асинхронният колбек
  })

  it('throws if signIn is called with an unused email', async () => {
    await expect(service.signIn('asdflkj@asdlfkj.com', 'passdflkj')).rejects.toThrow(
      BadRequestException
    )
  })

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ email: 'asdf@asdf.com', password: 'laskdjf' } as User])

    await expect(service.signIn('laskdjf@alskdfj.com', 'passowrd')).rejects.toThrow(
      BadRequestException
    )
  })
})
