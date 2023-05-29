import { Injectable } from '@nestjs/common';

import { CountriesRepository } from './repositories/countries.repository';
import { CountryDto as Country } from './dto/country-dto';
import { CountryIdDto } from './dto/country-id-dto';

@Injectable()
export class CountriesService {
    
    constructor(private readonly countriesRepository: CountriesRepository) { }

    async getCountries(): Promise<Country[]> {
        return await this.countriesRepository.getCountries();
    }

    async getCountry(countryPathFragment: string): Promise<CountryIdDto> {
        return await this.countriesRepository.getCountry(countryPathFragment);
    }
}
