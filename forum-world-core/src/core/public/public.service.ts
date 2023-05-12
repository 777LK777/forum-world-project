import { Injectable } from '@nestjs/common';
import { HomePageDto } from './dto/homePage-dto';
import { CountriesService } from './countries/countries.service';
import { CountryPageDto } from './dto/country-page-dto';
import { PostsService } from './posts/posts.service';
import { ThemesService } from './themes/themes.service';
import { ContentsService } from './contents/contents.service';

@Injectable()
export class PublicService {
    constructor(
        private readonly countriesService: CountriesService,
        private readonly themesService: ThemesService,
        private readonly postsService: PostsService,
        private readonly contentService: ContentsService) {}

    async getHomePageData(): Promise<HomePageDto> {
        const countries = await this.countriesService.getCountries();
        return {content: {}, countries: countries}
    }

    async getCountryPageData(countryPathFragment: string): Promise<CountryPageDto> {
        const themes = await this.themesService.getThemes(countryPathFragment);
        const posts = await this.postsService.getSuperPosts(countryPathFragment);
        const content = await this.contentService.getCountryContent(countryPathFragment);
        return { posts: posts, themes: themes, content: content.content };
    }
}
