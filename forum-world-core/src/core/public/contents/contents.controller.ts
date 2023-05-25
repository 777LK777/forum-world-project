import { Controller, Get, Param } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentDto } from './dto/content-dto';

@Controller('api/public/contents')
export class ContentsController {
    constructor(private readonly service: ContentsService) {}

    @Get('/:contentId')
    async getContent(@Param('contentId') contentId: number): Promise<ContentDto> {
        return await this.service.getContent(contentId);
    }
}
