import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { PostsModule } from './posts/posts.module';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { ThemesModule } from './themes/themes.module';
import { ContentsModule } from './contents/contents.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [CountriesModule, ThemesModule, PostsModule, ContentsModule, PagesModule],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}
