import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country-dto';
import { CountryDto as Country } from './dto/country-dto';
import { CountryNameDto } from './dto/country-name-dto';

@Controller('api/admin/countries')
export class CountriesController {

    constructor(private readonly countriesService: CountriesService) { }

    @Get()
    async getCountries(): Promise<Country[]> {
        return await this.countriesService.getCountries();
    }

    @Get('/search')
    async getCountriesByNameFragment(@Query('name') nameFragment: string): Promise<CountryNameDto[]> {
        return await this.countriesService.getCountriesByNameFragment(nameFragment);
    }

    @Post()
    async createCountry(@Body() dto: CreateCountryDto): Promise<Country> {
        return await this.countriesService.createCountry(dto);
    }

    @Put()
    async updateCountry(@Body() dto: Country): Promise<Country> {
        return await this.countriesService.updateCountry(dto);
    }

    @Delete(':id')
    async deleteCountry(@Param('id') countryId: number): Promise<Country> {
        return await this.countriesService.deleteCountry(countryId);
    }
}
