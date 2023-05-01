import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { ThemeDto as Theme, ThemeNameDto } from '../dto/theme-dto';
import { CreateThemeDto } from '../dto/create-theme-dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class ThemesRepository {
    
    constructor(private readonly prismaService: PrismaService) { }

    async getThemes(): Promise<Theme[]> {
        const res = await this.prismaService.theme.findMany({
            select: {
                themeId: true,
                name: true,
                pathFragment: true,
            }
        });

        return await res.map(t => new Theme(t.themeId, t.name, t.pathFragment));
    }

    async getThemesByNameFragment(nameFragment: string): Promise<ThemeNameDto[]> {
        const queryFragment = `%${nameFragment}%`;

        const themesIds = await this.prismaService.$queryRaw<{themeId: number}[]>(
            Prisma.sql`SELECT "themeId" FROM "Theme" WHERE "name" ILIKE ${queryFragment} LIMIT 10;`);
        
        const res = await this.prismaService.theme.findMany({
            select: {
                themeId: true,
                name: true
            },
            where: {
                themeId: { in: themesIds.map(row => row.themeId)}
            }
        })

        return await res.map(t => new ThemeNameDto(t.themeId, t.name))
    }

    async createTheme(dto: CreateThemeDto): Promise<Theme> {
        const res = await this.prismaService.theme.create({
            data: { ...dto }
        })

        return new Theme(res.themeId, res.name, res.pathFragment);
    }

    async updateTheme(dto: Theme) : Promise<Theme> {
        const res = await this.prismaService.theme.update({
            where: {
                themeId: dto.id
            },
            data: {
                name: dto.name,
                pathFragment: dto.pathFragment
            }
        })

        return new Theme(res.themeId, res.name, res.pathFragment);
    }

    async removeTheme(themeId: number): Promise<Theme> {
        const res = await this.prismaService.theme.delete({
            where: { themeId: +themeId}
        })

        return new Theme(res.themeId, res.name, res.pathFragment);
    }
}
