import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

import { PageDto } from "../dto/page-dto";
import { CreatePageDto } from "../dto/create-page-dto";
import { PageContentLinkDto } from "../dto/page-content-link-dto";

@Injectable()
export class PagesRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async getPages(): Promise<PageDto[]> {
        const res = await this.prismaService.page.findMany({
            select: {
                pageId: true,
                name: true,
                pathFragment:true,
                contentId: true
            }
        });
        
        return res.map(p => new PageDto(p.pageId, p.name, p.pathFragment, p.contentId));
    }

    async getPageContentLinkByPageId(pageId: number): Promise<PageContentLinkDto> {
        const res = await this.prismaService.page.findUnique({
            select: {
                pageId: true,
                contentId: true
            },
            where: {
                pageId: +pageId
            }
        });

        return { id: res.pageId, contentId: res.contentId };
    }

    async createPage(dto: CreatePageDto): Promise<PageDto> {
        const res = await this.prismaService.page.create({
            data: { ...dto }
        });

        return new PageDto(res.pageId, res.name, res.pathFragment, res.contentId);
    }

    async updatePage(dto: PageDto): Promise<PageDto> {
        const res = await this.prismaService.page.update({
            where: {
                pageId: dto.id
            },
            data: {
                name: dto.name,
                pathFragment: dto.pathFragment
            }
        });

        return new PageDto(res.pageId, res.name, res.pathFragment, res.contentId);
    }

    async removePage(pageId: number): Promise<PageDto> {
        const res = await this.prismaService.page.delete({
            where: { pageId: +pageId}
        });
        return new PageDto(res.pageId, res.name, res.pathFragment, res.contentId);
    }

    async updateContent(pageId: number, contentId: number): Promise<PageDto> {
        const res = await this.prismaService.page.update({
            data: { contentId: contentId },
            where: { pageId: +pageId }
        });
        return new PageDto(res.pageId, res.name, res.pathFragment, res.contentId);
    }

    async removeContent(pageId: number): Promise<PageDto> {
        const res = await this.prismaService.page.update({
            data: { contentId: null },
            where: { pageId: pageId }
        });
        return new PageDto(res.pageId, res.name, res.pathFragment, res.contentId);
    }
}