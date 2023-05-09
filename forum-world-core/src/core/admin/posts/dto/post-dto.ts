import { ThemeNameDto as Theme } from "../../themes/dto/theme-dto";
import { CountryNameDto as Country } from "../../countries/dto/country-dto";

export class PostDto {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly country: Country,
        readonly theme?: Theme,
        readonly contentId?: number
    ) { }
}