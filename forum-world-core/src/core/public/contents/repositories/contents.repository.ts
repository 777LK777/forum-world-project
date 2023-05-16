import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ContentsRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async getCountryContent(countryPathFragment: string): Promise<{ content: {}}> {
        const res = await this.prismaService.country.findFirst({
            select: {
                content: {
                    select: { data: true }
                }
            },
            where: {
                pathFragment: countryPathFragment
            }
        })

        return { ...res }
    }
}