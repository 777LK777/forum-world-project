import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CoreApiService } from 'src/core-api/_shared/core-api-module/core-api.service';
import { ThemeDto as Theme } from './dto/theme-dto';
import { CreateThemeDto } from './dto/create-theme-dto';
import { ThemeNameDto } from './dto/theme-name-dto';

@Injectable()
export class ThemesService {
    constructor(readonly api: CoreApiService) { }

    async getThemes(): Promise<Theme[]> {
        const { data } = await firstValueFrom(this.api.get<Theme[]>());
        return data;
    }
    
    async getThemesByNameFragment(nameFragment: string): Promise<ThemeNameDto[]> {
        const { data } = await firstValueFrom(
            this.api.get<ThemeNameDto[]>('/search', { params: { name: nameFragment }})
        )
        return data;
    }

    async createTheme(dto: CreateThemeDto): Promise<Theme> {
        const { data } = await firstValueFrom(this.api.post<Theme>(dto));
        return data;
    }

    async updateTheme(dto: Theme): Promise<Theme> {
        const { data } = await firstValueFrom(this.api.put<Theme>(dto))
        return data;
    }

    async deleteTheme(themeId: number): Promise<Theme> {
        const { data } = await firstValueFrom(this.api.delete<Theme>(`/${themeId}`));
        return data;
    }
}
