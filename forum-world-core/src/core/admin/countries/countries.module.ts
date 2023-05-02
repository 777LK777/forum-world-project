import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountriesRepository } from './repositories/countries.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ContentsModule } from '../_share/contents/contents.module';

@Module({
  imports: [DatabaseModule, ContentsModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesRepository]
})
export class CountriesModule {}
