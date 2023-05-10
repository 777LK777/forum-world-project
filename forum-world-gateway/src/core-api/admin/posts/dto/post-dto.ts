import { ThemeNameDto as Theme } from "../../themes/dto/theme-name-dto"
import { CountryNameDto as Country } from "../../countries/dto/country-name-dto"

export class PostDto {
    id: number
    name: string
    country: Country
    theme?: Theme
    contentId?: number
}