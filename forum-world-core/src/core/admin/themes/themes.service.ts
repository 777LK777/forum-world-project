import { Injectable } from '@nestjs/common';
import { ThemesRepository } from './repositories/themes.repository';
import { ThemeDto as Theme, ThemeNameDto } from './dto/theme-dto';
import { CreateThemeDto } from './dto/create-theme-dto';

@Injectable()
export class ThemesService {
    constructor(private readonly repo: ThemesRepository) { }

    async getThemes(): Promise<Theme[]> {
        return await this.repo.getThemes();
    }

    async getThemesByNameFragment(nameFragment: string): Promise<ThemeNameDto[]> {
        return await this.repo.getThemesByNameFragment(nameFragment);
    }

    async createTheme(dto: CreateThemeDto) {
        return await this.repo.createTheme(dto);
    }

    async updateTheme(dto: Theme) {
        return await this.repo.updateTheme(dto);
    }

    async removeTheme(themeId: number) {
        return await this.repo.removeTheme(themeId);
    }
}
