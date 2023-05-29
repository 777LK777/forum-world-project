import { CountryDto } from "../countries/dto/country-dto"
import { ContentDto } from "../contents/dto/content-dto"
import { BasicPageDto } from "../pages/dto/basic-page-dto"

export class HomePageDto {
    content: ContentDto
    countries: CountryDto[]
    basicPages: BasicPageDto[]
}