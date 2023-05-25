import { Module } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { DatabaseModule } from 'src/database/database.module';
import { CountriesRepository } from './repositories/countries.repository';
import { CountriesController } from './countries.controller';

@Module({
  imports: [DatabaseModule],
  exports: [CountriesService],
  providers: [CountriesService, CountriesRepository],
  controllers: [CountriesController]
})
export class CountriesModule {}
