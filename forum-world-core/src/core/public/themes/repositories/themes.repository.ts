import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { ThemeDto } from '../dto/theme-dto';

@Injectable()
export class ThemesRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async getThemes(themeIds: number[]): Promise<ThemeDto[]> {
        const res = await this.prismaService.theme.findMany({
            select: {
                name: true,
                pathFragment: true,                
            },
            where: {
                themeId: {
                    in: themeIds.map(id => +id)
                }
            }
        })
        
        return res.map(t => { return { name: t.name, pathFragment: t.pathFragment}})
    }

    async getTheme(themePathFragment: string): Promise<ThemeDto> {
        const res = await this.prismaService.theme.findFirst({
            select: {
                themeId: true,
                name: true,
                pathFragment: true
            },
            where: {
                pathFragment: themePathFragment
            }
        })

        return { id: res.themeId, name: res.name, pathFragment: res.pathFragment };
    }
}