import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { ThemesModule } from './themes/themes.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [CountriesModule, ThemesModule, PostsModule]
})
export class AdminModule {}
