import { Injectable } from '@nestjs/common';
import { PostNameDto } from '../dto/post-name-dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) { }

    async getSuperPosts(countryPathFragment: string): Promise<PostNameDto[]> {
        return await this.postsRepository.getSuperPosts(countryPathFragment);
    }
}
