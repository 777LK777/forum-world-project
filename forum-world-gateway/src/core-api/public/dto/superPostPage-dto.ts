import { ContentDto } from "../contents/dto/content-dto";
import { CountryNameDto } from "../countries/dto/country-name-dto";
import { BasicPageDto } from "../pages/dto/basic-page-dto";
import { PostNameDto } from "../posts/dto/post-name-dto";
import { ThemeDto } from "../themes/dto/theme-dto";

export class SuperPostPageDto {
    country: CountryNameDto
    content: ContentDto
    posts: PostNameDto[]
    basicPages: BasicPageDto[]
    themes: ThemeDto[]
}