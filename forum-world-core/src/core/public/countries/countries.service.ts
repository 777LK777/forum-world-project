import { Injectable } from '@nestjs/common';

import { CountriesRepository } from './repositories/countries.repository';
import { CountryDto as Country } from '../dto/country-dto';
import { CountryPageDto } from '../dto/country-page-dto';
import { ThemesService } from '../themes/themes.service';
import { ContentsService } from '../contents/contents.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CountriesService {
    
    constructor(private readonly countriesRepository: CountriesRepository) { }

    async getCountries(): Promise<Country[]> {
        return await this.countriesRepository.getCountries();
    }
}
