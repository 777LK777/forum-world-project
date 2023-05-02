import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CountryDto as Country } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { CountryNameDto } from './dto/country-name-dto';
import { ContentDto } from '../_shared/dto/content-dto';
import { CreateContentDto } from '../_shared/dto/create-content-dto';



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

    async removeCountry(countryId: number): Promise<Country> {
        const { data } = await firstValueFrom(this.api.delete<Country>(`/${countryId}`));
        return data;
    }

    private getContentPath(countryId: number): string {
        return `/${countryId}/content`;
    }

    async getContent(countryId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.get<ContentDto>(this.getContentPath(countryId)));
        return data;
    }

    async createContent(dto: CreateContentDto, countryId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.post<ContentDto>(this.getContentPath(countryId), dto));
        return data;
    }

    async updateContent(dto: ContentDto, countryId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.put<ContentDto>(this.getContentPath(countryId), dto));
        return data;
    }

    async removeContent(countryId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.delete<ContentDto>(this.getContentPath(countryId)));
        return data;
    }
}
