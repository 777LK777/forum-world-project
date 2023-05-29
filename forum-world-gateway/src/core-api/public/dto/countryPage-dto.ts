import { PostNameDto } from "../posts/dto/post-name-dto"
import { ThemeDto } from "../themes/dto/theme-dto"
import { BasicPageDto } from "../pages/dto/basic-page-dto"
import { ContentDto } from "../contents/dto/content-dto"

export class CountryPageDto {
    posts: PostNameDto[]
    themes: ThemeDto[]
    content: ContentDto
    basicPages: BasicPageDto[]
}