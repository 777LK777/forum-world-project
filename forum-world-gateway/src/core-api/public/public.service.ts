import { Injectable } from '@nestjs/common';

import { HomePageDto } from './dto/homePage-dto';
import { CountryPageDto } from './dto/countryPage-dto';
import { PagesService } from './pages/pages.service';
import { ContentsService } from './contents/contents.service';
import { CountriesService } from './countries/countries.service';
import { PostsService } from './posts/posts.service'
import { ThemesService } from './themes/themes.service';

@Injectable()
export class PublicService {
    
    constructor(
        private readonly pagesService: PagesService,
        private readonly countriesService: CountriesService,
        private readonly themesService: ThemesService,
        private readonly postsService: PostsService,
        private readonly contentsService: ContentsService) { }
    
    async getHomePageData(): Promise<HomePageDto> {
        const countries = await  this.countriesService.getCountries();

        const homePageDto = await this.pagesService.getHomePageData();
        const homePageContent = homePageDto.contentId ? await this.contentsService.getContent(homePageDto.contentId) : { data: {}};

        const basicPages = await this.pagesService.getBasicPages();

        return { countries: countries, content: homePageContent, basicPages: basicPages }
    }

    async getCountryPageDto(countryPathFragment: string): Promise<CountryPageDto> {
        const basicPages = await this.pagesService.getBasicPages();

        const countryContentData = await this.countriesService.getCountryContentData(countryPathFragment);
        const posts = await this.postsService.getSuperPosts(countryContentData.id);

        const content = countryContentData.contentId ? await this.contentsService.getContent(countryContentData.contentId) : { data: {}};
        
        const themeIds = await this.postsService.getPostThemeIds(countryContentData.id);

        const themes = themeIds.length > 0 ? await this.themesService.getThemes(themeIds) : [];

        return { posts: posts, themes: themes, content: content, basicPages: basicPages }
    }
}
