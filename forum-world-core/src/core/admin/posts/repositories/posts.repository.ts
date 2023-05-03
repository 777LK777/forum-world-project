import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PostDto } from "../dto/post-dto";
import { CreatePostDto } from "../dto/create-post-dto";
import { PostContentLinkDto } from "../dto/post-content-link-dto";

@Injectable()
export class PostsRepository {
    // CUD: create update delete
    selectCUD: {
        postId: true,
        name: true,
        countryId: true,
        themeId: true,
        contentId: true
    }

    constructor(private readonly prismaService: PrismaService) { }

    async getPosts(): Promise<PostDto[]> {
        const res = await this.prismaService.post.findMany({
            select: {
                postId: true,
                name: true,
                countryId: true,
                themeId: true,
                contentId: true,
                theme: {
                    select: {
                        name: true
                    }
                },
                country: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return await res.map(p => new PostDto(p.postId, p.name, p.countryId, p.themeId, p.contentId))
    }

    async getPostContentLinkByPostId(postId: number): Promise<PostContentLinkDto> {
        const res = await this.prismaService.post.findUnique({
            select: {
                postId: true,
                contentId: true
            },
            where: {postId: +postId}
        })

        return new PostContentLinkDto(res.postId, res.contentId);
    }

    async updateContent(postId: number, contentId: number): Promise<PostDto> {
        const res = await this.prismaService.post.update({
            data: { contentId: contentId },
            where: { postId: +postId }
        })

        return new PostDto(res.postId, res.name, res.countryId, res.themeId, res.contentId)
    }

    async createPost(dto: CreatePostDto): Promise<PostDto> {
        const res = await this.prismaService.post.create({
            data: { ...dto },
            select: this.selectCUD
        })

        return new PostDto(res.postId, res.name, res.countryId, res.themeId, res.contentId)
    }

    async updatePost(dto: PostDto): Promise<PostDto> {
        const res = await this.prismaService.post.update({
            where: {
                postId: dto.id
            },
            data: {
                name: dto.name,
                themeId: dto.themeId
            },
            select: this.selectCUD
        })

        return new PostDto(res.postId, res.name, res.countryId, res.themeId, res.contentId)
    }

    async removeContent(postId: number): Promise<PostDto> {
        const res = await this.prismaService.post.update({
            data: { contentId: null },
            where: { postId: +postId}
        })

        return new PostDto(res.postId, res.name, res.countryId, res.themeId, res.contentId);
    }

    async removePost(postId: number): Promise<PostDto> {
        const res = await this.prismaService.post.delete({
            where: { postId: postId},
            select: this.selectCUD
        })

        return new PostDto(res.postId, res.name, res.countryId, res.themeId, res.contentId)
    }
}