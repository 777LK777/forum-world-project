import { Controller, Get, Query } from '@nestjs/common';

import { PostsService } from './posts.service';
import { PostNameDto } from './dto/post-name-dto';

@Controller('api/public/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('/super')
    async getSuperPosts(@Query('countryId') countryId: number): Promise<PostNameDto[]> {
        return await this.postsService.getSuperPosts(countryId);
    }

    @Get('/themeIds')
    async getThemeIdsByCountryId(@Query('countryId') countryId: number): Promise<number[]> {
        return await this.postsService.getThemeIdsByCountryId(countryId);
    }
}
