import { Injectable } from '@nestjs/common';

import { PageDto } from './dto/page-dto';
import { CreatePageDto } from './dto/create-page-dto';
import { CreateContentDto } from '../_share/contents/dto/create-content-dto';
import { ContentDto, nullContent } from '../_share/contents/dto/content-dto';
import { ContentsService } from '../_share/contents/contents.service';
import { PagesRepository } from './repositories/pages.repository';

@Injectable()
export class PagesService {

    constructor(
        private readonly repository: PagesRepository,
        private readonly contentService: ContentsService) { }

    async getPages(): Promise<PageDto[]> {
        return await this.repository.getPages();
    }

    async createPage(dto: CreatePageDto): Promise<PageDto> {
        return await this.repository.createPage(dto);
    }

    async updatePage(dto: PageDto): Promise<PageDto> {
        return await this.repository.updatePage(dto);
    }

    async removePage(pageId: number): Promise<PageDto> {
        const pageContentLink = await this.repository.getPageContentLinkByPageId(pageId);
        const page = await this.repository.removePage(pageId);
        if (page?.contentId) await this.contentService.removeContent(pageContentLink.contentId)
        return page;
    }

    async getContent(pageId: number): Promise<ContentDto> {
        const pageContentLink = await this.repository.getPageContentLinkByPageId(pageId);
        if (!pageContentLink.contentId) return nullContent;
        return await this.contentService.getContentById(pageContentLink.contentId);
    }

    async createContent(dto: CreateContentDto, pageId: number): Promise<ContentDto> {
        const content = await this.contentService.createContent(dto);
        await this.repository.updateContent(pageId, content.id);
        return content;
    }

    async updateContent(dto: ContentDto, pageId: number): Promise<ContentDto> {
        const pageContentLink = await this.repository.getPageContentLinkByPageId(pageId);
        if (pageContentLink.contentId !== dto.id) return nullContent;
        return await this.contentService.updateContent(dto);
    }

    async removeContent(pageId: number): Promise<ContentDto> {
        const pageContentLink = await this.repository.getPageContentLinkByPageId(pageId);
        await this.repository.removeContent(pageId);
        return await this.contentService.removeContent(pageContentLink.contentId);
    }
}
