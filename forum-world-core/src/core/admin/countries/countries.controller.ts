import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto, CountryNameDto } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';

@Controller('/api/admin/countries')
export class CountriesController {
    
    constructor(private readonly countriesService: CountriesService) { }

    @Get()
    async getCountries(): Promise<CountryDto[]> {
        return await this.countriesService.getCountries();
    }

    @Get('search')
    async getCountriesByNameFragment(@Query('name') nameFragment: string): Promise<CountryNameDto[]> {
        return await this.countriesService.getCountriesByNameFragment(nameFragment);
    }

    @Post()
    async create(@Body() dto: CreateCountryDto):  Promise<CountryDto> {
        return await this.countriesService.createCountry(dto);
    }

    @Put()
    async update(@Body() dto: CountryDto):  Promise<CountryDto> {
        return await this.countriesService.updateCountry(dto);
    }

    @Delete(':id')
    async remove(@Param('id') countryId: number):  Promise<CountryDto> {
        return await this.countriesService.removeCountry(countryId);
    }
}
