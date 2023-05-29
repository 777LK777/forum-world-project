import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CountryDto as Country } from './dto/country-dto';
import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { CountryContentDto } from './dto/country-content-dto';

@Injectable()
export class CountriesService {
    constructor(readonly api: CoreApiService) { }

    async getCountries(): Promise<Country[]> {
        const { data } = await firstValueFrom(this.api.get<Country[]>())
        return data;
    }

    async getCountryContentData(countryPathFragment: string): Promise<CountryContentDto> {
        const { data } = await firstValueFrom(this.api.get<CountryContentDto>(`/${countryPathFragment}`))
        return data;
    }
}
