import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { ThemesModule } from './themes/themes.module';
import { PostsModule } from './posts/posts.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [CountriesModule, ThemesModule, PostsModule, PagesModule]
})
export class AdminModule {}
