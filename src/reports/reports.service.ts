import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Report } from './entities/report.entity'
import { User } from 'src/users/entities/user.entity'
import { CreateReportDto } from './dtos/ceate-report-dto'

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(reportDto)
    report.user = user // Зад колисите репозиторито ще закачи към "report"-а САМО "userId"-то към "report" обекта

    return this.reportsRepository.save(report)
  }
}
