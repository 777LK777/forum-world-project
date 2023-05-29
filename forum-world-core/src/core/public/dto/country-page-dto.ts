import { ThemeDto } from "../themes/dto/theme-dto"
import { PostNameDto } from "../posts/dto/post-name-dto"

export class CountryPageDto {
    posts: PostNameDto[]
    themes: ThemeDto[]
    content: {}
}