import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PostDto } from "../dto/post-dto";
import { CreatePostDto } from "../dto/create-post-dto";
import { PostContentLinkDto } from "../dto/post-content-link-dto";
import { ThemeNameDto as Theme } from "../../themes/dto/theme-dto";
import { CountryNameDto as Country } from "../../countries/dto/country-dto";

@Injectable()
export class PostsRepository {
    // CUD: create update delete
    selectCUD = {
        postId: true,
        name: true,
        themeId: true,
        countryId: true,
        contentId: true,
        country: {
          select: {
            countryId: true,
            name: true
          }  
        },
        theme: {
            select: {
                themeId: true,
                name: true
            }
        }
    }

    constructor(private readonly prismaService: PrismaService) { }

    async getPosts(): Promise<PostDto[]> {

        console.log(this.selectCUD)
        const res = await this.prismaService.post.findMany({
            select: this.selectCUD
        })

        return await res.map(p => {
            const country = new Country(p.countryId, p.country.name);
            const theme = !p.themeId ? undefined : new Theme(p.themeId, p.theme.name);
            return new PostDto(p.postId, p.name, country, theme, p.contentId)
        })
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
            select: this.selectCUD,
            where: { postId: +postId }
        })
        
        const country = new Country(res.countryId, res.country.name);
        const theme = !res.themeId ? undefined : new Theme(res.themeId, res.theme.name);

        return new PostDto(res.postId, res.name, country, theme, res.contentId)
    }

    async createPost(dto: CreatePostDto): Promise<PostDto> {
        const res = await this.prismaService.post.create({
            data: { ...dto },
            select: this.selectCUD
        })

        console.log(res)
        
        const country = new Country(res.countryId, res.country.name);
        const theme = !res.themeId ? undefined : new Theme(res.themeId, res.theme.name);

        return new PostDto(res.postId, res.name, country, theme, res.contentId)
    }

    async updatePost(dto: PostDto): Promise<PostDto> {
        const res = await this.prismaService.post.update({
            where: {
                postId: dto.id
            },
            data: {
                name: dto.name,
                themeId: dto.theme?.id
            },
            select: this.selectCUD
        })
        
        const country = new Country(res.countryId, res.country.name);
        const theme = !res.themeId ? undefined : new Theme(res.themeId, res.theme.name);

        return new PostDto(res.postId, res.name, country, theme, res.contentId)
    }

    async removeContent(postId: number): Promise<PostDto> {
        const res = await this.prismaService.post.update({
            data: { contentId: null },
            select: this.selectCUD,
            where: { postId: +postId},
        })
        
        const country = new Country(res.countryId, res.country.name);
        const theme = !res.themeId ? undefined : new Theme(res.themeId, res.theme.name);

        return new PostDto(res.postId, res.name, country, theme, res.contentId)
    }

    async removePost(postId: number): Promise<PostDto> {
        const res = await this.prismaService.post.delete({
            where: { postId: postId},
            select: this.selectCUD
        })
        
        const country = new Country(res.countryId, res.country.name);
        const theme = !res.themeId ? undefined : new Theme(res.themeId, res.theme.name);

        return new PostDto(res.postId, res.name, country, theme, res.contentId)
    }
}