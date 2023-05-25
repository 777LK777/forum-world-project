import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country-dto';

@Controller('api/public/countries')
export class CountriesController {
    constructor(private readonly service: CountriesService) { }

    @Get()
    async getCountries(): Promise<CountryDto[]> {
        return await this.service.getCountries();
    }
}
