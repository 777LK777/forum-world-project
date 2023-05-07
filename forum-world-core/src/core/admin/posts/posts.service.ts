import { Injectable } from '@nestjs/common';
import { PostsRepository } from './repositories/posts.repository';
import { PostDto } from './dto/post-dto';
import { CreatePostDto } from './dto/create-post-dto';
import { ContentDto } from '../_share/contents/dto/content-dto';
import { ContentsService } from '../_share/contents/contents.service';
import { CreateContentDto } from '../_share/contents/dto/create-content-dto';

@Injectable()
export class PostsService {
    constructor(
        private readonly postsRepository: PostsRepository,
        private readonly contentsService: ContentsService) { }

    async getPosts(): Promise<PostDto[]> {
        return await this.postsRepository.getPosts();
    }

    async createPost(dto: CreatePostDto): Promise<PostDto> {
        return await this.postsRepository.createPost(dto);
    }

    async updatePost(dto: PostDto): Promise<PostDto> {
        return await this.postsRepository.updatePost(dto);
    }

    async removePost(postId: number): Promise<PostDto> {
        const postContentLink = await this.postsRepository.getPostContentLinkByPostId(postId);
        if (postContentLink?.contentId) await this.contentsService.removeContent(postContentLink.contentId);
        const post = await this.postsRepository.removePost(postId);

        return post;
    }

    async getContent(postId: number): Promise<ContentDto> {
        const postContentLink = await this.postsRepository.getPostContentLinkByPostId(postId);
        if (!postContentLink.contentId) return undefined;
        return await this.contentsService.getContentById(postContentLink.contentId);
    }

    async createContent(dto: CreateContentDto, postId: number): Promise<ContentDto> {
        const content = await this.contentsService.createContent(dto);
        await this.postsRepository.updateContent(postId, content.id);
        return content;
    }
    
    async updateContent(dto: ContentDto, postId: number): Promise<ContentDto> {
        const postContentLink = await this.postsRepository.getPostContentLinkByPostId(postId);
        if (postContentLink.contentId !== dto.id) return undefined;
        return await this.contentsService.updateContent(dto);
    }

    async removeContent(postId: number): Promise<ContentDto> {
        const postContentLink = await this.postsRepository.getPostContentLinkByPostId(postId);
        await this.postsRepository.removeContent(postId);
        return await this.contentsService.removeContent(postContentLink.contentId);
    }
}
