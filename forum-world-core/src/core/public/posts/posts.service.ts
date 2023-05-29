import { Injectable } from '@nestjs/common';
import { PostNameDto } from './dto/post-name-dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) { }

    async getSuperPosts(countryId: number): Promise<PostNameDto[]> {
        return await this.postsRepository.getSuperPosts(countryId);
    }

    async getThemeIdsByCountryId(countryId: number): Promise<number[]> {
        return await this.postsRepository.getThemeIdsByCountryId(countryId);
    }
}
