import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { HomePageDto } from "../dto/home-page-dto";
import { BasicPageDto } from "../dto/basic-page-dto";
import { PageContentLinkDto } from "../dto/page-content-link-dto";

@Injectable()
export class PagesRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async getHomePage(): Promise<HomePageDto> {
        const res = await this.prismaService.page.findFirst({
            select: {
                name: true,
                contentId: true
            },
            where: {
                pathFragment: '/'
            }
        })

        return { name: res.name, contentId: res.contentId }
    }

    async getBasicPages(): Promise<BasicPageDto[]> {
        const res = await this.prismaService.page.findMany({
            select: {
                name: true,
                pathFragment: true
            },
            where: {
                pathFragment: { not: '/' }
            }
        })

        return res.map(p => new BasicPageDto(p.name, p.pathFragment));
    }

    async getBasicPageContentLink(basicPagePathFragment: string): Promise<PageContentLinkDto> {
        const res = await this.prismaService.page.findFirst({
            select: {
                pageId: true,
                contentId: true
            },
            where: {
                pathFragment: basicPagePathFragment
            }
        })

        return { id: res.pageId, contentId: res.contentId }
    }
}