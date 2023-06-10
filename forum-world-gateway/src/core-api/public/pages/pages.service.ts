import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { HomePageDto } from './dto/home-page-dto';
import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { BasicPageDto } from './dto/basic-page-dto';
import { PageContentLinkDto } from './dto/page-content-link-dto';

@Injectable()
export class PagesService {
    
    constructor(private readonly api: CoreApiService) { }

    async getHomePageData(): Promise<HomePageDto> {
        const { data } = await firstValueFrom(this.api.get<HomePageDto>('/home'));
        return data;
    }

    async getBasicPages(): Promise<BasicPageDto[]> {
        const { data } = await firstValueFrom(this.api.get<BasicPageDto[]>());
        return data;
    }

    async getBasicPageContentLink(basicPagePathFragment: string): Promise<PageContentLinkDto> {
        const { data } = await firstValueFrom(this.api.get<PageContentLinkDto>(`/${basicPagePathFragment}`));
        return data;
    }
}
