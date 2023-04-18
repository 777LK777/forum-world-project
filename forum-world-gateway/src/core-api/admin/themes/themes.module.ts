import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  imports: [CoreApiModule.forFeature('/admin')],
  providers: [ThemesService],
  controllers: [ThemesController]
})
export class ThemesModule {} 
