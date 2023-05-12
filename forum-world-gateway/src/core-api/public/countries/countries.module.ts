import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('/public')],
  providers: [CountriesService],
  controllers: [CountriesController]
})
export class CountriesModule {}
