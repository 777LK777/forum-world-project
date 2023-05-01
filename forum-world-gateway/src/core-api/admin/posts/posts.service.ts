import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { PostDto } from './dto/post-dto';
import { CreatePostDto } from './dto/create-post-dto';
import { ContentDto } from '../_shared/dto/content-dto';
import { CreateContentDto } from '../_shared/dto/create-content-dto';

@Injectable()
export class PostsService {
    constructor(readonly api: CoreApiService) {}

    async getPosts(): Promise<PostDto[]> {
        const { data } = await firstValueFrom(this.api.get<PostDto[]>());
        return data;
    }

    async createPost(dto: CreatePostDto): Promise<PostDto> {
        const { data } = await firstValueFrom(this.api.post<PostDto>());
        return data;
    }

    async updatePost(dto: PostDto): Promise<PostDto> {
        const { data } = await firstValueFrom(this.api.put<PostDto>());
        return data;
    }

    async removePost(postId: number): Promise<PostDto> {
        const { data } = await firstValueFrom(this.api.delete<PostDto>(`/${postId}`));
        return data;
    }

    private getContentPath(postId: number): string {
        return `/${postId}/content`;
    }

    async getContent(postId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.get<ContentDto>(this.getContentPath(postId)));
        return data;
    }

    async createContent(dto: CreateContentDto, postId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.post<ContentDto>(this.getContentPath(postId), dto));
        return data;
    }

    async updateContent(dto: ContentDto, postId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.put<ContentDto>(this.getContentPath(postId), dto));
        return data;
    }

    async removeContent(postId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.delete<ContentDto>(this.getContentPath(postId)));
        return data;
    }


}
