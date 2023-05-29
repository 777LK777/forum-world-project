import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CoreApiModule } from 'src/core-api/_shared/core-api-module/core-api.module';

@Module({
  exports: [ThemesService],
  imports: [CoreApiModule.forFeature('/public/themes')],
  providers: [ThemesService]
})
export class ThemesModule {}
