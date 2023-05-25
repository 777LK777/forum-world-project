import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('/public/pages')],
  providers: [PagesService],
  exports: [PagesService]
})
export class PagesModule {}
