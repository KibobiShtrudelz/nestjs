import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersModule } from './users/users.module'
import { ReportsModule } from './reports/reports.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

import { User } from './users/entities/user.entity'
import { Report } from './reports/entities/report.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        entities: [User, Report]
      })
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true
    // }),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
