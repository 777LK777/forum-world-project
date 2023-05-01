import { Injectable } from '@nestjs/common';
import { ContentsRepository } from './repositories/contents.repository';
import { ContentDto } from './dto/content-dto';
import { CreateContentDto } from './dto/create-content-dto';

@Injectable()
export class ContentsService {
    constructor(private readonly contentsRepository: ContentsRepository) {}

    async getContentById(contentId: number): Promise<ContentDto> {
        return await this.contentsRepository.getContentById(contentId);
    }

    async updateContent(dto: ContentDto): Promise<ContentDto> {
        return await this.contentsRepository.updateContent(dto);
    }

    async createContent(dto: CreateContentDto): Promise<ContentDto> {
        return await this.contentsRepository.createContent(dto);
    }

    async removeContent(contentId: number): Promise<ContentDto> {
        return await this.contentsRepository.removeContent(contentId);
    }
}
