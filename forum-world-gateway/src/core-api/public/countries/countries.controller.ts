import { Controller, Get } from '@nestjs/common';

import { CountryDto as Country } from './dto/country-dto';
import { CountriesService } from './countries.service';

@Controller('api/public/countries')
export class CountriesController {
    
    constructor(private readonly countriesService:  CountriesService) { }
    
    @Get()
    async getCountries(): Promise<Country[]> {
        return await this.countriesService.getCountries();
    }
}
