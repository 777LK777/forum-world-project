import { Injectable } from '@nestjs/common';
import { ContentsRepository } from './repositories/contents.repository';
import { ContentDto } from './dto/content-dto';

@Injectable()
export class ContentsService {
    
    constructor(private readonly contentsRepository: ContentsRepository) { }

    async getCountryContent(countryPathFragment: string): Promise<{ content: {}}> {
        return await this.contentsRepository.getCountryContent(countryPathFragment);
    }

    async getContent(contentId: number): Promise<ContentDto> {
        return await this.contentsRepository.getContent(contentId);
    }
}
