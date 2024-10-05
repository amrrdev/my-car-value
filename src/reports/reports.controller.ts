import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { Serialize } from 'test';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly repostService: ReportsService) {}

  @Post()
  @UseInterceptors(CurrentUserInterceptor)
  @Serialize(ReportDto)
  createReport(@Body() createReportDto: CreateReportDto, @CurrentUser() user: User) {
    return this.repostService.createReport(createReportDto, user);
  }

  @Get()
  createEstimate(@Query() query: GetEstimateDto) {
    return this.repostService.createEstimate(query);
  }

  @UseInterceptors(CurrentUserInterceptor)
  @Patch(':id')
  @UseGuards(AdminGuard)
  approvedReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() approveReportDto: ApproveReportDto,
  ) {
    return this.repostService.changeApproval(id, approveReportDto.approved);
  }
}
