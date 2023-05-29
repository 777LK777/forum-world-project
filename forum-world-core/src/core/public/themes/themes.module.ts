import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { DatabaseModule } from 'src/database/database.module';
import { ThemesRepository } from './repositories/themes.repository';
import { ThemesController } from './themes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ThemesRepository, ThemesService],
  controllers: [ThemesController]
})
export class ThemesModule {}
