import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CountryDto as Country } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';



@Injectable()
export class CountriesService {
    readonly path: string = '/countries';
    constructor(readonly api: CoreApiService) { }

    async getCountries(): Promise<Country[]> {
        const { data } = await firstValueFrom(this.api.get<Country[]>(this.path));
        return data;
    }

    async createCountry(dto: CreateCountryDto): Promise<Country> {
        const { data } = await firstValueFrom(this.api.post<Country>(this.path, dto));
        return data;
    }

    async updateCountry(dto: Country): Promise<Country> {
        const { data } = await firstValueFrom(this.api.put<Country>(this.path, dto));
        return data;
    }

    async deleteCountry(countryId: number): Promise<Country> {
        const { data } = await firstValueFrom(this.api.delete<Country>(`${this.path}/${countryId}`));
        return data;
    }
}
