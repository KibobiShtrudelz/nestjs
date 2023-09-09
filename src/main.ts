import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

// import { CookieSession } from 'cookie-session' // Заради TS настройки НЕ можем да използваме "import" синтаксиса

import { AppModule } from './app.module'

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieSession({ keys: ['abvgzputklmn'] }))

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3333)
}

bootstrap()
