import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country-dto';
import { CountryContentLinkDto } from './dto/country-content-link-dto';
import { CountryNameDto } from './dto/country-name-dto';

@Controller('api/public/countries')
export class CountriesController {
    constructor(private readonly service: CountriesService) { }

    @Get()
    async getCountries(): Promise<CountryDto[]> {
        return await this.service.getCountries();
    }

    @Get('/:countryPathFragment/content')
    async getCountryContentLink(@Param('countryPathFragment') countryPathFragment: string): Promise<CountryContentLinkDto> {
        return await this.service.getCountryContentLink(countryPathFragment);
    }

    @Get('/:countryPathFragment/name')
    async getCountryName(@Param('countryPathFragment') countryPathFragment: string): Promise<CountryNameDto> {
        return await this.service.getCountryName(countryPathFragment);
    }
}
