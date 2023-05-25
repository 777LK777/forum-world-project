import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { DatabaseModule } from 'src/database/database.module';
import { ContentsRepository } from './repositories/contents.repository';
import { ContentsController } from './contents.controller';

@Module({
  imports: [DatabaseModule],
  exports: [ContentsService],
  providers: [ContentsRepository, ContentsService],
  controllers: [ContentsController]
})
export class ContentsModule {}
