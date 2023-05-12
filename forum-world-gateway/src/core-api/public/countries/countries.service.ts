import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CountryDto as Country } from '../dto/country-dto';
import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';

@Injectable()
export class CountriesService {
    constructor(readonly api: CoreApiService) { }

    async getCountries(): Promise<Country[]> {
        const { data } = await firstValueFrom(this.api.get<Country[]>())
        return data;
    }
}
