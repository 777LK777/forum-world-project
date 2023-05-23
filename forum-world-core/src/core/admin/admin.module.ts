import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { ThemesModule } from './themes/themes.module';
import { PostsModule } from './posts/posts.module';
import { ContentsModule } from './_share/contents/contents.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [CountriesModule, ThemesModule, PostsModule, ContentsModule, PagesModule]
})
export class AdminModule {}
