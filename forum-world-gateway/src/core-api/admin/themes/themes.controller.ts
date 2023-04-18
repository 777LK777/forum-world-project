import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ThemeDto as Theme } from './dto/theme-dto';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme-dto';

@Controller('api/admin/themes')
export class ThemesController {
    
    constructor(private readonly themesService: ThemesService) { }

    @Get()
    async getThemes(): Promise<Theme[]> {
        return await this.themesService.getThemes();
    }

    @Post()
    async createTheme(@Body() dto: CreateThemeDto): Promise<Theme> {
        return await this.themesService.createTheme(dto);
    }

    @Put()
    async updateTheme(@Body() dto: Theme): Promise<Theme> {
        return await this.themesService.updateTheme(dto);
    }

    @Delete(':id')
    async deleteTheme(@Param('id') themeId: number): Promise<Theme> {
        return await this.themesService.deleteTheme(themeId);
    }

}
