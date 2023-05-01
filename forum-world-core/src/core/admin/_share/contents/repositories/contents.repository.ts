import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ContentDto } from "../dto/content-dto";
import { CreateContentDto } from "../dto/create-content-dto";

@Injectable()
export class ContentsRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async getContentById(id: number): Promise<ContentDto> {
        const res = await this.prismaService.content.findUnique({
            select: {
                contentId: true,
                data:true                
            },
            where: {
                contentId: +id
            }
        })

        return new ContentDto(res.contentId, res.data)
    }

    async createContent(dto: CreateContentDto): Promise<ContentDto> {
        const res = await this.prismaService.content.create({
            data: { data: dto.data }
        })

        return new ContentDto(res.contentId, res.data)
    }

    async updateContent(dto: ContentDto): Promise<ContentDto> {
        const res = await this.prismaService.content.update({
            data: { data: dto.data },
            where: {
                contentId: dto.id
            }
        })

        return new ContentDto(res.contentId, res.data)
    }

    async removeContent(id: number): Promise<ContentDto> {
        const res = await this.prismaService.content.delete({
            where: { contentId: id }
        })

        return new ContentDto(res.contentId, res.data)
    }
}
