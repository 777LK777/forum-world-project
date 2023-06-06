import { Injectable } from '@nestjs/common';

import { CountriesRepository } from './repositories/countries.repository';
import { CountryDto as Country } from './dto/country-dto';
import { CountryContentLinkDto } from './dto/country-content-link-dto';
import { CountryNameDto } from './dto/country-name-dto';

@Injectable()
export class CountriesService {
    
    constructor(private readonly countriesRepository: CountriesRepository) { }

    async getCountries(): Promise<Country[]> {
        return await this.countriesRepository.getCountries();
    }

    async getCountryContentLink(countryPathFragment: string): Promise<CountryContentLinkDto> {
        return await this.countriesRepository.getCountryContentLink(countryPathFragment);
    }

    async getCountryName(countryPathFragment: string): Promise<CountryNameDto> {
        return await this.countriesRepository.getCountryName(countryPathFragment);
    }
}
