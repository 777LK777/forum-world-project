import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { CoreApiModule } from '../_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('/public')],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}
