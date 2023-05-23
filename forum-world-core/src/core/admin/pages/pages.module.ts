import { Module } from '@nestjs/common';

import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ContentsModule } from '../_share/contents/contents.module';
import { PagesRepository } from './repositories/pages.repository';

@Module({
  imports: [DatabaseModule, ContentsModule],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository]
})
export class PagesModule {}
