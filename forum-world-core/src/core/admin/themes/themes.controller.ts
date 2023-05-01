import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemeDto as Theme, ThemeNameDto } from './dto/theme-dto';
import { CreateThemeDto } from './dto/create-theme-dto';

@Controller('api/admin/themes')
export class ThemesController {
    constructor(private readonly themesService: ThemesService) { }

    @Get()
    async getThemes(): Promise<Theme[]> {
        return await this.themesService.getThemes();
    }

    @Get('search')
    async getThemesByNameFragment(@Query('name') nameFragment: string): Promise<ThemeNameDto[]> {
        return await this.themesService.getThemesByNameFragment(nameFragment)
    }

    @Post()
    async create(@Body() dto: CreateThemeDto): Promise<Theme> {
        return await this.themesService.createTheme(dto);
    }

    @Put()
    async update(@Body() dto: Theme): Promise<Theme> {
        return await this.themesService.updateTheme(dto);
    }

    @Delete(':id')
    async remove(@Param('id') themeId: number): Promise<Theme> {
        return await this.themesService.removeTheme(themeId);
    }
}
