import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { HttpModule } from '@nestjs/axios';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [
    HttpModule,
    CoreApiModule.forFeature('/admin/countries')],
  providers: [CountriesService],
  controllers: [CountriesController]
})
export class CountriesModule {}
