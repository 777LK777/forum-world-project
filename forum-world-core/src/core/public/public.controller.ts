import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';
import { HomePageDto } from './dto/homePage-dto';
import { CountryPageDto } from './dto/country-page-dto';

@Controller('api/public')
export class PublicController {
    constructor(private readonly service: PublicService) {}

    @Get()
    async getHomePageData(): Promise<HomePageDto> {
        return await this.service.getHomePageData();
    }

    @Get('/countries/:countryPathFragment')
    async getCountryPage(@Param('countryPathFragment') countryPathFragment: string): Promise<CountryPageDto> {
        return await this.service.getCountryPageData(countryPathFragment);
    }
}
