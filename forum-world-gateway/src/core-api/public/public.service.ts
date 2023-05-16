import { Injectable } from '@nestjs/common';
import { HomePageDto } from './dto/homePage-dto';
import { CountryPageDto } from './dto/countryPage-dto';
import { CoreApiService } from '../_shared/core-api-module/core-api.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PublicService {
    
    constructor(readonly api: CoreApiService) { }
    
    async getHomePageData(): Promise<HomePageDto> {
        const { data } = await firstValueFrom(this.api.get<HomePageDto>())
        return data;
    }

    async getCountryPageDto(countryPathFragment: string): Promise<CountryPageDto> {
        const { data } = await firstValueFrom(this.api.get<CountryPageDto>(`/countries/${countryPathFragment}`))
        return data;
    }
}
