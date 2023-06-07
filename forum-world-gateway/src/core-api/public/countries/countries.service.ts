import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CountryDto as Country } from './dto/country-dto';
import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { CountryContentDto } from './dto/internals/country-content-dto';
import { CountryNameDto } from './dto/internals/country-name-dto';

@Injectable()
export class CountriesService {
    constructor(readonly api: CoreApiService) { }

    async getCountries(): Promise<Country[]> {
        const { data } = await firstValueFrom(this.api.get<Country[]>())
        return data;
    }

    async getCountryContentData(countryPathFragment: string): Promise<CountryContentDto> {
        const { data } = await firstValueFrom(this.api.get<CountryContentDto>(`/${countryPathFragment}/content`))
        return data;
    }

    async getCountryName(countryPathFragment: string): Promise<CountryNameDto> {
        const { data } = await firstValueFrom(this.api.get<CountryNameDto>(`/${countryPathFragment}/name`));
        return data;
    }
}
