import { Controller, Get, Param } from '@nestjs/common';

import { PagesService } from './pages.service';
import { HomePageDto } from './dto/home-page-dto';
import { BasicPageDto } from './dto/basic-page-dto';
import { PageContentLinkDto } from './dto/page-content-link-dto';

@Controller('api/public/pages')
export class PagesController {
    constructor(private readonly service: PagesService) {}

    @Get()
    async getBasicPages(): Promise<BasicPageDto[]> {
        return await this.service.getBasicPages();
    }

    @Get('/home')
    async getHomePage(): Promise<HomePageDto> {
        return await this.service.getHomePage();
    }

    @Get('/:basicPagePathFragment')
    async getBasicPageContentLink(@Param('basicPagePathFragment') basicPagePathFragment: string) : Promise<PageContentLinkDto> {
        return await this.service.getBasicPageContentLink(basicPagePathFragment);
    }
}
