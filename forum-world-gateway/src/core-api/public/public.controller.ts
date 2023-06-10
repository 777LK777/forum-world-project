import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';
import { HomePageDto } from './dto/homePage-dto';
import { CountryPageDto } from './dto/countryPage-dto';
import { SuperPostPageDto } from './dto/superPostPage-dto';
import { ThemePageDto } from './dto/themePage-dto';
import { PostPageDto } from './dto/postPage-dto';
import { BasicPageDto } from './dto/basicPage-dto';

@Controller('api/public')
export class PublicController {
    
    constructor(private readonly service: PublicService) { }

    @Get()
    async getHomePageData(): Promise<HomePageDto> {
        return await this.service.getHomePageData();
    }

    @Get('/countries/:countryPathFragment')
    async getCountryPageData(@Param('countryPathFragment') countryPathFragment: string): Promise<CountryPageDto> {
        return await this.service.getCountryPageDto(countryPathFragment);
    }

    @Get('/posts/super')
    async getSuperPostPageData(@Query('countryPathFragment') countryPathFragment: string, @Query('postId') postId: number): Promise<SuperPostPageDto> {
        return await this.service.getSuperPostPageDto(countryPathFragment, postId);
    }

    @Get('/theme')
    async getThemePageData(
        @Query('countryPathFragment') countryPathFragment: string,
        @Query('themePathFragment') themePathFragment: string): Promise<ThemePageDto> {
        return await this.service.getThemePageDto(countryPathFragment, themePathFragment);
    }

    @Get('/posts/:postId')
    async getPostPageData(
        @Query('countryPathFragment') countryPathFragment: string,
        @Query('themePathFragment') themePathFragment: string,
        @Param('postId') postId: number,
    ): Promise<PostPageDto> {
        return await this.service.getPostPageData(countryPathFragment, themePathFragment, postId);
    }

    @Get('/basicPages/:basicPagePathFragment')
    async getBasicPageData(@Param('basicPagePathFragment') basicPagePathFragment: string): Promise<BasicPageDto> {
        return await this.service.getBasicPageData(basicPagePathFragment);
    }
}
