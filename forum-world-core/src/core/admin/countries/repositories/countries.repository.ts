import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateCountryDto } from "../dto/create-country-dto";
import { CountryDto, CountryNameDto } from "../dto/country-dto"
import { Prisma } from "@prisma/client";
import { CountryContentLinkDto } from "../dto/country-content-link-dto";

@Injectable()
export class CountriesRepository {
    
    constructor(private readonly prismaService: PrismaService) { }

    async getCountries(): Promise<CountryDto[]> {
        const res = await this.prismaService.country.findMany({
            select: {
                countryId: true,
                name: true,
                pathFragment: true,
                flagImageUrl: true,
                contentId: true
            }
        })

        return await res.map(c => new CountryDto(c.countryId, c.name, c.pathFragment, c.flagImageUrl, c.contentId))
    }

    async getCountriesByNameFragment(nameFragment: string): Promise<CountryNameDto[]> {
        const queryFragment = `%${nameFragment}%`;

        const themesIds = await this.prismaService.$queryRaw<{countryId: number}[]>(
            Prisma.sql`SELECT "countryId" FROM "Country" WHERE "name" ILIKE ${queryFragment} LIMIT 10;`);

        const res = await this.prismaService.country.findMany({
            select: {
                countryId: true,
                name: true
            },
            where: {
                countryId: { in: themesIds.map(row => row.countryId)}
            }
        })

        return await res.map(c => new CountryNameDto(c.countryId, c.name))
    }

    async getCountryContentLinkByCountryId(countryId: number): Promise<CountryContentLinkDto> {
        const res = await this.prismaService.country.findUnique({
            select: {
                countryId: true,
                contentId: true
            },
            where: {countryId: +countryId}
        })

        return new CountryContentLinkDto(res.countryId, res.contentId);
    }

    async createCountry(dto: CreateCountryDto): Promise<CountryDto> {
        const res = await this.prismaService.country.create({
            data: { ...dto }
        })

        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl, res.contentId)
    }

    async updateCountry(dto: CountryDto): Promise<CountryDto> {
        const res = await this.prismaService.country.update({
            where: {
                countryId: dto.id
            },
            data: {
                name: dto.name,
                pathFragment: dto.pathFragment,
                flagImageUrl: dto.flagImageUrl
            }
        })

        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl, res.contentId)
    }

    async removeCountry(countryId: number): Promise<CountryDto> {
        const res = await this.prismaService.country.delete({
            where: { countryId: +countryId}
        })

        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl, res.contentId)
    }

    async updateContent(countryId: number, contentId: number): Promise<CountryDto> {
        const res = await this.prismaService.country.update({
            data: { contentId: contentId },
            where: { countryId: +countryId }
        })
        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl, res.contentId)
    }

    async removeContent(countryId: number): Promise<CountryDto> {
        const res = await this.prismaService.country.update({
            data: { contentId: null },
            where: { countryId: +countryId }
        })

        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl, res.contentId);
    }
}