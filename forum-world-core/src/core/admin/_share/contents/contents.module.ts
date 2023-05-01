import { Module } from '@nestjs/common';
import { ContentsRepository } from './repositories/contents.repository';
import { DatabaseModule } from 'src/database/database.module';
import { ContentsService } from './contents.service';

@Module({
    imports: [DatabaseModule],
    exports: [ContentsService],
    providers: [ContentsRepository, ContentsService]
})
export class ContentsModule {}
