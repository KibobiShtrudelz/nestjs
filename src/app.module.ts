import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common'

import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

import { User } from './users/entities/user.entity'
import { Report } from './reports/entities/report.entity'

const dbConfig = require('../ormconfig')
const cookieSession = require('cookie-session')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }
  ]
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: [this.configService.get('COOKIE_KEY')] })).forRoutes('*')
  }
}
