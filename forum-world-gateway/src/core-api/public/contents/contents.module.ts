import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('public/contents')],
  providers: [ContentsService],
  exports: [ContentsService]
})
export class ContentsModule {}
