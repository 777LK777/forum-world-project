import { Module } from '@nestjs/common';

import { CoreModule } from './core-api/core.module';

@Module({
  imports: [
    CoreModule
  ],
})
export class AppModule {}
