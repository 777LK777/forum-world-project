import { Injectable, Body } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { PageDto } from './dto/page-dto';
import { CreatePageDto } from './dto/create-page-dto';
import { ContentDto } from '../_shared/dto/content-dto';
import { CreateContentDto } from '../_shared/dto/create-content-dto';

@Injectable()
export class PagesService {
    constructor(readonly api: CoreApiService) { }

    async getPages(): Promise<PageDto[]> {
        const { data } = await firstValueFrom(this.api.get<PageDto[]>());
        return data;
    }

    async createPage(@Body() dto: CreatePageDto): Promise<PageDto> {
        const { data } = await firstValueFrom(this.api.post<PageDto>(dto));
        return data;
    }

    async updatePage(@Body() dto: PageDto): Promise<PageDto> {
        const { data } = await firstValueFrom(this.api.put<PageDto>(dto));
        return data;
    }

    async removePage(pageId: number): Promise<PageDto> {
        const { data } = await firstValueFrom(this.api.delete<PageDto>(`/${pageId}`));
        return data;
    }

    async getContent(pageId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.get<ContentDto>(`/${pageId}/content`));
        return data;
    }

    async createContent(dto: CreateContentDto, pageId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.post<ContentDto>(`/${pageId}/content`, dto));
        return data;
    }

    async updateContent(dto: ContentDto, pageId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.put<ContentDto>(`/${pageId}/content`, dto));
        return data;
    }

    async removeContent(pageId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.delete<ContentDto>(`/${pageId}/content`));
        return data;
    }
}
