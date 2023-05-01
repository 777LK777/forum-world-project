import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CountryDto as Country } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { CountryNameDto } from './dto/country-name-dto';



@Injectable()
export class CountriesService {
    constructor(readonly api: CoreApiService) { }

    async getCountries(): Promise<Country[]> {
        const { data } = await firstValueFrom(this.api.get<Country[]>());
        return data;
    }
    
    async getCountriesByNameFragment(nameFragment: string): Promise<CountryNameDto[]> {
        const { data } = await firstValueFrom(
            this.api.get<CountryNameDto[]>('/search', { params: { name: nameFragment }})
        )
        return data;
    }

    async createCountry(dto: CreateCountryDto): Promise<Country> {
        const { data } = await firstValueFrom(this.api.post<Country>(dto));
        return data;
    }

    async updateCountry(dto: Country): Promise<Country> {
        const { data } = await firstValueFrom(this.api.put<Country>(dto));
        return data;
    }

    async deleteCountry(countryId: number): Promise<Country> {
        const { data } = await firstValueFrom(this.api.delete<Country>(`/${countryId}`));
        return data;
    }
}
