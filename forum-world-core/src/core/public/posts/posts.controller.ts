import { Controller, Get, Query } from '@nestjs/common';

import { PostsService } from './posts.service';
import { PostNameDto } from './dto/post-name-dto';
import { PostContentLinkDto } from './dto/post-content-link-dto';

@Controller('api/public/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('/super')
    async getSuperPosts(@Query('countryId') countryId: number): Promise<PostNameDto[]> {
        return await this.postsService.getSuperPosts(countryId);
    }

    @Get('/super/content')
    async getSuperPostContentLink(@Query('countryId') countryId: number, @Query('postId') postId: number): Promise<PostContentLinkDto> {
        return await this.postsService.getSuperPostContentLink(countryId, postId);
    }

    @Get('/themeIds')
    async getThemeIdsByCountryId(@Query('countryId') countryId: number): Promise<number[]> {
        return await this.postsService.getThemeIdsByCountryId(countryId);
    }
}
