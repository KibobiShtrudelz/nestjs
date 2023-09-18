import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  ;(app as any).set('etag', false)

  app.use((request, response, next) => {
    response.removeHeader('X-Powered-By')
    response.removeHeader('date')

    next()
  })

  await app.listen(3333)
}

bootstrap()
