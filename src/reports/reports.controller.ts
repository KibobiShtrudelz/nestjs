import { Get, Post, Body, Patch, Param, Query, UseGuards, Controller } from '@nestjs/common'

import { ReportsService } from './reports.service'

import { AuthGuard } from '../guards/auth.guard'
import { AdminGuard } from 'src/guards/admin.guard'

import { User } from 'src/users/entities/user.entity'

import { ReportDto } from './dtos/report.dto'
import { GetEstimateDto } from './dtos/get-estimate.dto'
import { CreateReportDto } from './dtos/ceate-report-dto'
import { ApproveReportDto } from './dtos/approve-report.dto'

import { Serialize } from 'src/interceptors/serialize.interceptopr'
import { CurrentUser } from 'src/users/decorators/current-user.decorator'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log('query:', query)
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved)
  }
}
