import { Injectable } from '@nestjs/common';

import { HomePageDto } from './dto/home-page-dto';
import { BasicPageDto } from './dto/basic-page-dto';
import { PageContentLinkDto } from './dto/page-content-link-dto';
import { PagesRepository } from './repositories/pages.repository';

@Injectable()
export class PagesService {
    constructor(private readonly repository: PagesRepository) { }

    async getHomePage(): Promise<HomePageDto> {
        return await this.repository.getHomePage();
    }

    async getBasicPages(): Promise<BasicPageDto[]> {
        return await this.repository.getBasicPages();
    }

    async getBasicPageContentLink(basicPagePathFragment: string): Promise<PageContentLinkDto> {
        return await this.repository.getBasicPageContentLink(basicPagePathFragment);
    }
}
