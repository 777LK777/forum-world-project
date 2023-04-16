import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';

@Controller('/api/admin/countries')
export class CountriesController {
    
    constructor(private readonly countriesService: CountriesService) { }

    @Get()
    async getCountries(): Promise<CountryDto[]> {
        return await this.countriesService.getCountries();
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
