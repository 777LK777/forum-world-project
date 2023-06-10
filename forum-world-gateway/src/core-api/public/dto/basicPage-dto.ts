import { ContentDto } from "../contents/dto/content-dto";
import { BasicPageDto as BasicPage } from "../pages/dto/basic-page-dto";

export class BasicPageDto {
    content: ContentDto
    basicPages: BasicPage[]
}