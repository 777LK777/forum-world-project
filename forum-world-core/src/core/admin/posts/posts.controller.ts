import { Body, Controller, Delete, Get, Post, Param, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post-dto';
import { CreatePostDto } from './dto/create-post-dto';
import { ContentDto } from '../_share/contents/dto/content-dto';
import { CreateContentDto } from '../_share/contents/dto/create-content-dto';

@Controller('api/admin/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    async getPosts(): Promise<PostDto[]> {
        return await this.postsService.getPosts();
    }

    @Post()
    async create(@Body() dto: CreatePostDto): Promise<PostDto> {
        return await this.postsService.createPost(dto);
    }

    @Put()
    async update(@Body() dto: PostDto): Promise<PostDto> {
        return await this.postsService.updatePost(dto);
    }

    @Delete(':id')
    async remove(@Param('id') postId: number): Promise<PostDto> {
        return await this.postsService.removePost(postId);
    }

    @Get(':postId/content')
    async getContent(@Param('postId') postId: number): Promise<ContentDto> {
        return await this.postsService.getContent(postId);
    }

    @Post(':postId/content')
    async createContent(@Body() dto: CreateContentDto, @Param('postId') postId: number): Promise<ContentDto> {
        return await this.postsService.createContent(dto, postId);
    }

    @Put(':postId/content')
    async updateContent(@Body() dto: ContentDto, @Param('postId') postId: number): Promise<ContentDto> {
        return await this.postsService.updateContent(dto, postId);
    }

    @Delete(':postId/content')
    async removeContent(@Param('postId') postId: number): Promise<ContentDto> {
        return await this.postsService.removeContent(postId)
    }    
}
