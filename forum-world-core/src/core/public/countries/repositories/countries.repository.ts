import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";
import { CountryDto as Country } from "../dto/country-dto";

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
}
