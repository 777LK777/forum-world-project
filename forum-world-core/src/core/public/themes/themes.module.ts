import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { DatabaseModule } from 'src/database/database.module';
import { ThemesRepository } from './repositories/themes.repository';

@Module({
  imports: [DatabaseModule],
  exports: [ThemesService],
  providers: [ThemesRepository, ThemesService]
})
export class ThemesModule {}
