import { CountryNameDto } from "../countries/dto/country-name-dto";
import { BasicPageDto } from "../pages/dto/basic-page-dto";
import { PostNameDto } from "../posts/dto/post-name-dto";
import { ThemeDto } from "../themes/dto/theme-dto";

export class ThemePageDto {
    theme: ThemeDto
    country: CountryNameDto
    basicPages: BasicPageDto[]
    superPosts: PostNameDto[]
    posts: PostNameDto[]
    themes: ThemeDto[]
}