import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

// we place the connection in the root module before any other modules
// to share the connection across all modules

/*
 * synchronize: true,
 *  Database Sync: When you start your application,
 * TypeORM checks your entities and compares them to the existing database schema.
 * If there are any differences (like new columns or tables that need to be created),
 * it will make those changes automatically.
 *
 * */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
