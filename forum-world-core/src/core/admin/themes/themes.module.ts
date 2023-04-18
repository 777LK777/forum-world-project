import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { ThemesRepository } from './repositories/themes.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ThemesController],
  providers: [ThemesService, ThemesRepository],
})
export class ThemesModule {}
