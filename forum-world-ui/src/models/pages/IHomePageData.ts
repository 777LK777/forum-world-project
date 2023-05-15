import { ICountry } from "./ICountry";
import { IContent } from "../IContent";

export interface IHomePageData {
    countries: ICountry[]
    content: IContent
    isError: boolean
}