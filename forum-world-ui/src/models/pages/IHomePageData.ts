import { ICountry } from "./ICountry";
import { IContent } from "../IContent";
import { IBasicPage } from "./IBasicPage";

export interface IHomePageData {
    countries: ICountry[]
    content: IContent
    basicPages: IBasicPage[]
    isError: boolean
}