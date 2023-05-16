import { ThemeDto } from "./theme-dto"
import { PostNameDto } from "./post-name-dto"

export class CountryPageDto {
    posts: PostNameDto[]
    themes: ThemeDto[]
    content: {}
}