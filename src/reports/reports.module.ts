import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Report } from './entities/report.entity'
import { ReportsService } from './reports.service'
import { ReportsController } from './reports.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Report])], // Това създава "repository"-то за нас
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
