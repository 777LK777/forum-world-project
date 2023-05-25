import { Injectable } from '@nestjs/common';
import { PagesRepository } from './repositories/pages.repository';
import { HomePageDto } from './dto/home-page-dto';
import { BasicPageDto } from './dto/basic-page-dto';

@Injectable()
export class PagesService {
    constructor(private readonly repository: PagesRepository) { }

    async getHomePage(): Promise<HomePageDto> {
        return await this.repository.getHomePage();
    }

    async getBasicPages(): Promise<BasicPageDto[]> {
        return await this.repository.getBasicPages();
    }
}
