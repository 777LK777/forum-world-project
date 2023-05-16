import { Injectable } from '@nestjs/common';
import { ThemeDto } from '../dto/theme-dto';
import { ThemesRepository } from './repositories/themes.repository';

@Injectable()
export class ThemesService {
    
    constructor(private readonly themesRepository: ThemesRepository) { }

    async getThemes(countryPathFragment: string): Promise<ThemeDto[]> {
        return await this.themesRepository.getThemes(countryPathFragment);
    }
}
