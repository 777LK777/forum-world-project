import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [CountriesModule, ThemesModule]
})
export class AdminModule {}
