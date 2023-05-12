import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { DatabaseModule } from 'src/database/database.module';
import { ContentsRepository } from './repositories/contents.repository';

@Module({
  imports: [DatabaseModule],
  exports: [ContentsService],
  providers: [ContentsRepository, ContentsService]
})
export class ContentsModule {}
