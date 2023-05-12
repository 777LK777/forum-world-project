import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';
import { HomePageDto } from './dto/homePage-dto';
import { CountryPageDto } from './dto/countryPage-dto';

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
}
