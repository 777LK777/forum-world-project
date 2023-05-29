import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';

import { PostNameDto } from './dto/post-name-dto';

@Injectable()
export class PostsService {
    constructor(private readonly api: CoreApiService) {}

    async getSuperPosts(countryId: number): Promise<PostNameDto[]> {
        const { data } = await firstValueFrom(this.api.get<PostNameDto[]>('/super', { params: { countryId: countryId}}))
        return data;
    }

    async getPostThemeIds(countryId: number): Promise<number[]> {
        const { data } = await firstValueFrom(this.api.get<number[]>('/themeIds', { params: { countryId: countryId }}));
        return data;
    }
}
