import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { PagesModule } from './pages/pages.module';
import { ContentsModule } from './contents/contents.module';
import { CountriesModule } from './countries/countries.module';
import { PostsModule } from './posts/posts.module';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [
    PagesModule,
    CountriesModule,
    ThemesModule,
    PostsModule,
    ContentsModule],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule {}
