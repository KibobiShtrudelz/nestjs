import { Post, Body, Patch, Param, UseGuards, Controller } from '@nestjs/common'

import { ReportDto } from './dtos/report.dto'
import { AuthGuard } from '../guards/auth.guard'
import { ReportsService } from './reports.service'
import { AdminGuard } from 'src/guards/admin.guard'
import { User } from 'src/users/entities/user.entity'
import { CreateReportDto } from './dtos/ceate-report-dto'
import { ApproveReportDto } from './dtos/approve-report.dto'
import { Serialize } from 'src/interceptors/serialize.interceptopr'
import { CurrentUser } from 'src/users/decorators/current-user.decorator'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

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
