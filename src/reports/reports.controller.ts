import { Post, Body, UseGuards, Controller } from '@nestjs/common'

import { AuthGuard } from '../guards/auth.guard'
import { ReportsService } from './reports.service'
import { CreateReportDto } from './dtos/ceate-report-dto'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body)
  }
}
