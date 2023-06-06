import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";
import { CountryDto as Country } from "../dto/country-dto";
import { CountryContentLinkDto } from "../dto/country-content-link-dto";
import { CountryNameDto } from "../dto/country-name-dto";

@Injectable()
export class CountriesRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async getCountries(): Promise<Country[]> {
        const res = await this.prismaService.country.findMany({
            select: {
                name: true,
                pathFragment: true,
                flagImageUrl: true
            }
        })

        return await res.map(c => new Country(c.name, c.pathFragment, c.flagImageUrl))
    }

    async getCountryContentLink(countryPathFragment: string): Promise<CountryContentLinkDto> {
        const res = await this.prismaService.country.findFirst({
            select: {
                countryId: true,
                name: true,
                contentId: true
            },
            where: { pathFragment: countryPathFragment }
        })

        return new CountryContentLinkDto(res.countryId, res.name, res.contentId);
    }

    async getCountryName(countryPathFragment: string): Promise<CountryNameDto> {
        const res = await this.prismaService.country.findFirst({
            select: {
                countryId: true,
                name: true,
                pathFragment: true
            },
            where: { pathFragment: countryPathFragment }
        })

        return new CountryNameDto(res.countryId, res.name, res.pathFragment);
    }
}
