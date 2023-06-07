import { Injectable } from '@nestjs/common';
import { PostNameDto } from './dto/post-name-dto';
import { PostsRepository } from './repositories/posts.repository';
import { PostContentLinkDto } from './dto/post-content-link-dto';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) { }

    async getSuperPosts(countryId: number): Promise<PostNameDto[]> {
        return await this.postsRepository.getSuperPosts(countryId);
    }

    async getThemeIdsByCountryId(countryId: number): Promise<number[]> {
        return await this.postsRepository.getThemeIdsByCountryId(countryId);
    }

    async getSuperPostContentLink(countryId: number, postId: number): Promise<PostContentLinkDto> {
        return await this.postsRepository.getSuperPostContentLink(countryId, postId);
    }

    async getPosts(countryId: number, themeId: number): Promise<PostNameDto[]> {
        return await this.postsRepository.getPosts(countryId, themeId);
    }
}
