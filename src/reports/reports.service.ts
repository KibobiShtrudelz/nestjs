import { Injectable, NotFoundException } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Report } from './entities/report.entity'
import { User } from 'src/users/entities/user.entity'
import { GetEstimateDto } from './dtos/get-estimate.dto'
import { CreateReportDto } from './dtos/ceate-report-dto'

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly reportsRepository: Repository<Report>) {}

  createEstimate({ lng, lat, make, year, model, mileage }: GetEstimateDto) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne()
  }

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
