import { Post, Body, UseGuards, Controller } from '@nestjs/common'

import { AuthGuard } from '../guards/auth.guard'
import { ReportsService } from './reports.service'
import { User } from 'src/users/entities/user.entity'
import { CreateReportDto } from './dtos/ceate-report-dto'
import { CurrentUser } from 'src/users/decorators/current-user.decorator'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }
}
