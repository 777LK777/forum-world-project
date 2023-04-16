import { Injectable } from '@nestjs/common';
import { CountriesRepository } from './repository/countries.repository';
import { CountryDto } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';

@Injectable()
export class CountriesService {
    constructor(private readonly repo: CountriesRepository) { }

    async getCountries() : Promise<CountryDto[]> {
        return await this.repo.getCountries();
    }

    async createCountry(dto: CreateCountryDto) : Promise<CountryDto> {
        return await this.repo.createCountry(dto);
    }

    async updateCountry(dto: CountryDto) : Promise<CountryDto> {
        return await this.repo.updateCountry(dto);
    }

    async removeCountry(countryId: number) : Promise<CountryDto> {
        return await this.repo.removeCountry(countryId);
    }


}
