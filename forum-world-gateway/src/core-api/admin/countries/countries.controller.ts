import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country-dto';
import { CountryDto as Country } from './dto/country-dto';

@Controller('api/admin/countries')
export class CountriesController {

    constructor(private readonly countriesService: CountriesService) { }

    @Get()
    async getCountries(): Promise<Country[]> {
        return await this.countriesService.getCountries();
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
