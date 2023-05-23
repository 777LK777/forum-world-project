import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PageDto } from './dto/page-dto';
import { CreatePageDto } from './dto/create-page-dto';
import { ContentDto } from '../_shared/dto/content-dto';
import { CreateContentDto } from '../_shared/dto/create-content-dto';

@Controller('api/admin/pages')
export class PagesController {
    
    constructor(private readonly pagesService: PagesService) { }

    @Get()
    async getPages(): Promise<PageDto[]> {
        return await this.pagesService.getPages();
    }

    @Post()
    async createPage(@Body() dto: CreatePageDto): Promise<PageDto> {
        return await this.pagesService.createPage(dto);
    }

    @Put()
    async updatePage(@Body() dto: PageDto): Promise<PageDto> {
        return await this.pagesService.updatePage(dto);
    }

    @Delete(':id')
    async deletePage(@Param('id') pageId: number): Promise<PageDto> {
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
