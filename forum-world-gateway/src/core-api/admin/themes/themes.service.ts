import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { ThemeDto as Theme } from './dto/theme-dto';
import { CreateThemeDto } from './dto/create-theme-dto';

@Injectable()
export class ThemesService {
    readonly path: string = '/themes';
    constructor(readonly api: CoreApiService) { }

    async getThemes(): Promise<Theme[]> {
        const { data } = await firstValueFrom(this.api.get<Theme[]>(this.path));
        return data;
    }

    async createTheme(dto: CreateThemeDto): Promise<Theme> {
        const { data } = await firstValueFrom(this.api.post<Theme>(this.path, dto));
        return data;
    }

    async updateTheme(dto: Theme): Promise<Theme> {
        const { data } = await firstValueFrom(this.api.put<Theme>(this.path, dto))
        return data;
    }

    async deleteTheme(themeId: number): Promise<Theme> {
        const { data } = await firstValueFrom(this.api.delete<Theme>(`${this.path}/${themeId}`));
        return data;
    }
}
