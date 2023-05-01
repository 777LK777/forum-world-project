import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateCountryDto } from "../dto/create-country-dto";
import { CountryDto, CountryNameDto } from "../dto/country-dto"
import { Prisma } from "@prisma/client";

@Injectable()
export class CountriesRepository {
    
    constructor(private readonly prismaService: PrismaService) { }

    async getCountries(): Promise<CountryDto[]> {
        const res = await this.prismaService.country.findMany({
            select: {
                countryId: true,
                name: true,
                pathFragment: true,
                flagImageUrl: true
            }
        })

        return await res.map(c => new CountryDto(c.countryId, c.name, c.pathFragment, c.flagImageUrl))
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

    async createCountry(dto: CreateCountryDto): Promise<CountryDto> {
        const res = await this.prismaService.country.create({
            data: { ...dto }
        })

        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl)
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

        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl)
    }

    async removeCountry(countryId: number): Promise<CountryDto> {
        const res = await this.prismaService.country.delete({
            where: { countryId: +countryId}
        })

        return new CountryDto(res.countryId, res.name, res.pathFragment, res.flagImageUrl)
    }
}