import { Controller, Get, Query, Param } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemeDto } from './dto/theme-dto';

@Controller('api/public/themes')
export class ThemesController {
    constructor(private readonly themesService: ThemesService) {}

    @Get()
    async getThemes(@Query('themeIds') themeIds: number[]): Promise<ThemeDto[]> {
        return await this.themesService.getThemes(themeIds);
    }

    @Get('/:themePathFragment')
    async getTheme(@Param('themePathFragment') themePathFragment: string): Promise<ThemeDto> {
        return await this.themesService.getTheme(themePathFragment);
    }
}
