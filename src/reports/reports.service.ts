import { Injectable, NotFoundException } from '@nestjs/common'

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
    report.user = user

    return this.reportsRepository.save(report)
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportsRepository.findOne({ where: { id: parseInt(id) } })

    if (!report) {
      throw new NotFoundException('Report not found')
    }

    report.approved = approved
    return this.reportsRepository.save(report)
  }
}
