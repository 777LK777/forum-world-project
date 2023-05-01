import { Injectable } from '@nestjs/common';
import { CountriesRepository } from './repositories/countries.repository';
import { CountryDto, CountryNameDto } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';

@Injectable()
export class CountriesService {
    constructor(private readonly repo: CountriesRepository) { }

    async getCountries(): Promise<CountryDto[]> {
        return await this.repo.getCountries();
    }

    async getCountriesByNameFragment(nameFragment: string): Promise<CountryNameDto[]> {
        return await this.repo.getCountriesByNameFragment(nameFragment)
    }

    async createCountry(dto: CreateCountryDto): Promise<CountryDto> {
        return await this.repo.createCountry(dto);
    }

    async updateCountry(dto: CountryDto): Promise<CountryDto> {
        return await this.repo.updateCountry(dto);
    }

    async removeCountry(countryId: number): Promise<CountryDto> {
        return await this.repo.removeCountry(countryId);
    }


}
