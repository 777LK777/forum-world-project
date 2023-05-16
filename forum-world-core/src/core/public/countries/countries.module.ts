import { Module } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { DatabaseModule } from 'src/database/database.module';
import { CountriesRepository } from './repositories/countries.repository';

@Module({
  imports: [DatabaseModule],
  exports: [CountriesService],
  providers: [CountriesService, CountriesRepository]
})
export class CountriesModule {}
