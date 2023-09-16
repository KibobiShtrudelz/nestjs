import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Report } from './entities/report.entity'
import { CreateReportDto } from './dtos/ceate-report-dto'

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  create(reportDto: CreateReportDto) {
    const report = this.reportsRepository.create(reportDto)
    return this.reportsRepository.save(report)
  }
}
