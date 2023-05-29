import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { ThemeDto } from './dto/theme-dto';

@Injectable()
export class ThemesService {
    constructor(private readonly api: CoreApiService) {}

    async getThemes(themeIds: number[]): Promise<ThemeDto[]> {
        const { data } = await firstValueFrom(this.api.get<ThemeDto[]>({params: {themeIds: themeIds}}));
        return data;
    }
}
