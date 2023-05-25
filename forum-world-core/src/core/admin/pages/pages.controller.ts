import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';

import { PageDto } from './dto/page-dto';
import { ContentDto } from '../_share/contents/dto/content-dto';
import { CreatePageDto } from './dto/create-page-dto';
import { CreateContentDto } from '../_share/contents/dto/create-content-dto';
import { PagesService } from './pages.service';

@Controller('/api/admin/pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    @Get()
    async getPages(): Promise<PageDto[]> {
        return await this.pagesService.getPages();
    }

    @Post()
    async create(@Body() dto: CreatePageDto): Promise<PageDto> {
        return await this.pagesService.createPage(dto);
    }

    @Put()
    async update(@Body() dto: PageDto): Promise<PageDto> {
        return await this.pagesService.updatePage(dto);
    }

    @Delete(':id')
    async remove(@Param('id') pageId: number): Promise<PageDto> {
        return await this.pagesService.removePage(pageId);
    }

    @Get(':pageId/content')
    async getContent(@Param('pageId') pageId: number): Promise<ContentDto> {
        return await this.pagesService.getContent(pageId);
    }

    @Post(':pageId/content')
    async createContent(@Body() dto: CreateContentDto, @Param('pageId') pageId: number): Promise<ContentDto> {
        return await this.pagesService.createContent(dto, pageId);
    }

    @Put(':pageId/content')
    async updateContent(@Body() dto: ContentDto, @Param('pageId') pageId: number): Promise<ContentDto> {
        return await this.pagesService.updateContent(dto, pageId);
    }

    @Delete(':pageId/content')
    async removeContent(@Param('pageId') pageId: number): Promise<ContentDto> {
        return await this.pagesService.removeContent(pageId);
    }
}
