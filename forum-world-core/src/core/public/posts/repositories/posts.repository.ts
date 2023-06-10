import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PostNameDto } from "../dto/post-name-dto";
import { PostContentLinkDto } from "../dto/post-content-link-dto";

@Injectable()
export class PostsRepository {
    
    constructor(private readonly prismaService: PrismaService) { }

    async getSuperPosts(countryId: number): Promise<PostNameDto[]> {
        const res = await this.prismaService.post.findMany({
            select: {
                postId: true,
                name: true
            },
            where: {
                AND: [
                    {
                        country: {
                            countryId: +countryId
                        }
                    },
                    {
                        themeId: {
                            equals: null
                        }
                    }
                ]
            }
        })

        return res.map(p => { return {id: p.postId, name: p.name}})
    }

    async getThemeIdsByCountryId(countryId: number): Promise<number[]> {
        const res = await this.prismaService.post.findMany({
            select: {
                themeId: true
            },
            where: {
                AND: {
                    countryId: +countryId,
                    themeId: { not: null }
                }
            },
            distinct: ['themeId']
        })

        return res.map(id => id.themeId);
    }

    async getSuperPostContentLink(countryId: number, postId: number): Promise<PostContentLinkDto> {
        const res = await this.prismaService.post.findFirst({
            select: {
                postId: true,
                contentId: true
            },
            where: {
                AND: {
                    countryId: +countryId,
                    postId: +postId,
                    themeId: null
                }
            }
        })

        return new PostContentLinkDto(res.postId, res.contentId);
    }

    async getPosts(countryId: number, themeId: number): Promise<PostNameDto[]> {
        const res = await this.prismaService.post.findMany({
            select: {
                postId: true,
                name: true
            },
            where: {
                AND: [
                    {
                        country: {
                            countryId: +countryId
                        }
                    },
                    {
                        themeId: {
                            equals: +themeId
                        }
                    }
                ]
            }
        })

        return res.map(p => { return {id: p.postId, name: p.name}})
    }

    async getPostContentLink(countryId: number, themeId: number, postId: number): Promise<PostContentLinkDto> {
        const res = await this.prismaService.post.findFirst({
            select: {
                postId: true,
                contentId: true
            },
            where: {
                AND: {
                    countryId: +countryId,
                    postId: +postId,
                    themeId: +themeId
                }
            }
        })

        return new PostContentLinkDto(res.postId, res.contentId);
    }
}