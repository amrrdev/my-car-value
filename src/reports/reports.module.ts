import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UsersModule],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
