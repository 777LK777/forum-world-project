import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ContentDto } from "../dto/content-dto";

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

    async getContent(contentId: number): Promise<ContentDto> {
        const res = await this.prismaService.content.findFirst({
            select: {
                data: true
            },
            where: {
                contentId: +contentId
            }
        });

        return { ...res };
    }
}