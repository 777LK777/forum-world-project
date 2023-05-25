import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { CoreApiModule } from '../_shared/core-api-module/core-api.module';
import { PagesModule } from './pages/pages.module';
import { ContentsModule } from './contents/contents.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [CoreApiModule.forFeature('/public'), PagesModule, ContentsModule, CountriesModule],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}
