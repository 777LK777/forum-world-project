import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PagesRepository } from './repositories/pages.repository';

@Module({
  imports: [DatabaseModule],
  providers: [PagesService, PagesRepository],
  controllers: [PagesController]
})
export class PagesModule {}
