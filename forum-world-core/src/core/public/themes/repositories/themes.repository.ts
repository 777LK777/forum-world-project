import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { ThemeDto } from '../../dto/theme-dto';

@Injectable()
export class ThemesRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async getThemes(countryPathFragment: string): Promise<ThemeDto[]> {
        const res = await this.prismaService.theme.findMany({
            select: {
                name: true,
                pathFragment: true
            },
            where: {
                posts: {
                    every: {
                        country: {
                            pathFragment: countryPathFragment
                        }
                    }
                }
            }
        })

        return res.map(t => { return {name: t.name, pathFragment: t.pathFragment}})
    }
}