import { Injectable } from '@nestjs/common';
import { CountriesRepository } from './repositories/countries.repository';
import { CountryDto, CountryNameDto } from './dto/country-dto';
import { CreateCountryDto } from './dto/create-country-dto';
import { ContentsService } from '../_share/contents/contents.service';
import { ContentDto } from '../_share/contents/dto/content-dto';
import { CreateContentDto } from '../_share/contents/dto/create-content-dto';

@Injectable()
export class CountriesService {
    constructor(
        private readonly repo: CountriesRepository,
        private readonly contentService: ContentsService) { }

    async getCountries(): Promise<CountryDto[]> {
        return await this.repo.getCountries();
    }

    async getCountriesByNameFragment(nameFragment: string): Promise<CountryNameDto[]> {
        return await this.repo.getCountriesByNameFragment(nameFragment)
    }

    async createCountry(dto: CreateCountryDto): Promise<CountryDto> {
        return await this.repo.createCountry(dto);
    }

    async updateCountry(dto: CountryDto): Promise<CountryDto> {
        return await this.repo.updateCountry(dto);
    }

    async removeCountry(countryId: number): Promise<CountryDto> {
        const countryContentLink = await this.repo.getCountryContentLinkByCountryId(countryId);
        await this.contentService.removeContent(countryContentLink.contentId);
        return await this.repo.removeCountry(countryId);
    }

    async getContent(countryId: number): Promise<ContentDto> {
        const countryContentLink = await this.repo.getCountryContentLinkByCountryId(countryId);
        if (!countryContentLink.contentId) return undefined;
        return await this.contentService.getContentById(countryContentLink.contentId);
    }

    async createContent(dto: CreateContentDto, countryId: number): Promise<ContentDto> {
        const content = await this.contentService.createContent(dto);
        await this.repo.updateContent(countryId, content.id);
        return content;
    }

    async updateContent(dto: ContentDto, countryId: number): Promise<ContentDto> {
        const countryContentLink = await this.repo.getCountryContentLinkByCountryId(countryId);
        if (countryContentLink.contentId !== dto.id) return undefined;
        return await this.contentService.updateContent(dto);
    }
    
    async removeContent(countryId: number): Promise<ContentDto> {
        const countryContentLink = await this.repo.getCountryContentLinkByCountryId(countryId);
        await this.repo.removeContent(countryId);
        return await this.contentService.removeContent(countryContentLink.contentId);
    }
}
