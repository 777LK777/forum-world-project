import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country-dto';
import { CountryIdDto } from './dto/country-id-dto';

@Controller('api/public/countries')
export class CountriesController {
    constructor(private readonly service: CountriesService) { }

    @Get()
    async getCountries(): Promise<CountryDto[]> {
        return await this.service.getCountries();
    }

    @Get('/:countryPathFragment')
    async getCountryId(@Param('countryPathFragment') countryPathFragment: string): Promise<CountryIdDto> {
        return await this.service.getCountry(countryPathFragment);
    }
}
