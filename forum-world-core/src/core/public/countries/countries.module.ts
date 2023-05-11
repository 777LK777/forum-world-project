import { Module } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CountriesRepository } from './repositories/countries.repository';

@Module({
  imports: [DatabaseModule],
  providers: [CountriesService, CountriesRepository],
  controllers: [CountriesController]
})
export class CountriesModule {}
