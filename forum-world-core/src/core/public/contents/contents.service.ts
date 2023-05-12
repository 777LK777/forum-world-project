import { Injectable } from '@nestjs/common';
import { ContentsRepository } from './repositories/contents.repository';

@Injectable()
export class ContentsService {
    
    constructor(private readonly contentsRepository: ContentsRepository) { }

    async getCountryContent(countryPathFragment: string): Promise<{ content: {}}> {
        return await this.contentsRepository.getCountryContent(countryPathFragment);
    }
}
