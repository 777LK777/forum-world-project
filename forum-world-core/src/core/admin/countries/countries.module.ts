import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountriesRepository } from './repository/countries.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesRepository]
})
export class CountriesModule {}
