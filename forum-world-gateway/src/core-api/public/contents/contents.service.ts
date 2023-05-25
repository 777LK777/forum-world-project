import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { ContentDto } from './dto/content-dto';

@Injectable()
export class ContentsService {

    constructor(private readonly api: CoreApiService) {}

    async getContent(contentId: number): Promise<ContentDto> {
        const { data } = await firstValueFrom(this.api.get<ContentDto>(`/${contentId}`));
        return data;
    }
}
