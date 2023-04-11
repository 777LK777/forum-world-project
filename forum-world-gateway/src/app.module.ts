import { Module } from '@nestjs/common';
import { CoreApiModule } from './core-api/core-api.module';

@Module({
  imports: [CoreApiModule],
})
export class AppModule {}
