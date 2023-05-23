import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('/admin/pages')],
  providers: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
