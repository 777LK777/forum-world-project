import { Injectable } from '@nestjs/common';

import { HomePageDto } from './dto/homePage-dto';
import { CountryPageDto } from './dto/countryPage-dto';
import { PagesService } from './pages/pages.service';
import { ContentsService } from './contents/contents.service';
import { CountriesService } from './countries/countries.service';
import { PostsService } from './posts/posts.service'
import { ThemesService } from './themes/themes.service';
import { SuperPostPageDto } from './dto/superPostPage-dto';
import { CountryNameDto } from './countries/dto/country-name-dto';
import { ThemePageDto } from './dto/themePage-dto';
import { ThemeDto } from './themes/dto/theme-dto';
import { PostPageDto } from './dto/postPage-dto';
import { BasicPageDto } from './dto/basicPage-dto';

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

    async getSuperPostPageDto(countryPathFragment: string, postId: number): Promise<SuperPostPageDto> {
        const countryName = await this.countriesService.getCountryName(countryPathFragment);

        const postContentLink = await this.postsService.getSuperPostContentLink(countryName.id, postId);

        const content = postContentLink.contentId ? await this.contentsService.getContent(postContentLink.contentId) : { data: {}};

        const posts = await this.postsService.getSuperPosts(countryName.id);

        const basicPages = await this.pagesService.getBasicPages();

        const themeIds = await this.postsService.getPostThemeIds(countryName.id);

        const themes = themeIds.length > 0 ? await this.themesService.getThemes(themeIds) : [];

        return { 
            country: new CountryNameDto(countryName.name, countryName.pathFragment),
            content: content,
            posts: posts,
            basicPages: basicPages,
            themes: themes
        }
    }

    async getThemePageDto(countryPathFragment: string, themePathFragment: string): Promise<ThemePageDto> {
        const country = await this.countriesService.getCountryName(countryPathFragment);

        const theme = await this.themesService.getTheme(themePathFragment);

        const posts = await this.postsService.getPosts(country.id, theme.id);

        const superPosts = await this.postsService.getSuperPosts(country.id);

        const basicPages = await this.pagesService.getBasicPages();        

        const themeIds = await this.postsService.getPostThemeIds(country.id);

        const themes = themeIds.length > 0 ? await this.themesService.getThemes(themeIds) : [];

        return {
            country: new CountryNameDto(country.name, country.pathFragment),
            theme: new ThemeDto(theme.name, theme.pathFragment),
            basicPages: basicPages,
            superPosts: superPosts,
            posts: posts,
            themes: themes };
    }

    async getPostPageData(countryPathFragment, themePathFragment, postId): Promise<PostPageDto> {
        const country = await this.countriesService.getCountryName(countryPathFragment);

        const theme = await this.themesService.getTheme(themePathFragment);

        const postContentLink = await this.postsService.getPostContentLink(country.id, theme.id, postId);

        const content = postContentLink.contentId ? await this.contentsService.getContent(postContentLink.contentId) : { data: {}};
        
        const basicPages = await this.pagesService.getBasicPages();        

        const themeIds = await this.postsService.getPostThemeIds(country.id);

        const themes = themeIds.length > 0 ? await this.themesService.getThemes(themeIds) : [];        
        
        return {
            country: new CountryNameDto(country.name, country.pathFragment),
            theme: new ThemeDto(theme.name, theme.pathFragment),
            postId: postId, content: content, basicPages: basicPages, themes: themes };
    }
    
    async getBasicPageData(basicPagePathFragment: string) : Promise<BasicPageDto> {
        const pageContentLink = await this.pagesService.getBasicPageContentLink(basicPagePathFragment);

        const content = pageContentLink.contentId ? await this.contentsService.getContent(pageContentLink.contentId) : { data: {}};

        const basicPages = await this.pagesService.getBasicPages();

        return { basicPages: basicPages, content: content };
    }
}
