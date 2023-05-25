import { Module } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  exports: [CountriesService],
  imports: [CoreApiModule.forFeature('/public/countries')],
  providers: [CountriesService]
})
export class CountriesModule {}
