import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

import { HomePageDto } from './dto/homePage-dto';
import { PagesService } from './pages/pages.service';
import { CountryPageDto } from './dto/countryPage-dto';
import { CoreApiService } from '../_shared/core-api-module/core-api.service';
import { ContentsService } from './contents/contents.service';
import { CountriesService } from './countries/countries.service';

@Injectable()
export class PublicService {
    
    constructor(
        private readonly api: CoreApiService,
        private readonly countriesService: CountriesService,
        private readonly pagesService: PagesService,
        private readonly contentsService: ContentsService) { }
    
    async getHomePageData(): Promise<HomePageDto> {
        const countries = await  this.countriesService.getCountries();

        const homePageDto = await this.pagesService.getHomePageData();
        const homePageContent = homePageDto.contentId ? await this.contentsService.getContent(homePageDto.contentId) : { data: {}};

        const basicPages = await this.pagesService.getBasicPages();

        return { countries: countries, content: homePageContent, basicPages: basicPages }
    }

    async getCountryPageDto(countryPathFragment: string): Promise<CountryPageDto> {
        const { data } = await firstValueFrom(this.api.get<CountryPageDto>(`/countries/${countryPathFragment}`))
        return data;
    }
}
