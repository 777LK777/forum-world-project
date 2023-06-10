import { ContentDto } from "../contents/dto/content-dto";
import { CountryNameDto } from "../countries/dto/country-name-dto";
import { BasicPageDto } from "../pages/dto/basic-page-dto";
import { ThemeDto } from "../themes/dto/theme-dto";

export class PostPageDto {
    theme: ThemeDto
    country: CountryNameDto
    postId: number
    content: ContentDto
    basicPages: BasicPageDto[]
    themes: ThemeDto[]
}