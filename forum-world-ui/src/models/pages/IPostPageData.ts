import { IContent } from "../IContent";
import { IBasicPage } from "./IBasicPage";
import { ICountry } from "./ICountry";
import { ITheme } from "./ITheme";

export interface IPostPageData {
    country: ICountry
    theme: ITheme
    postId: number
    content: IContent
    basicPages: IBasicPage[]
    themes: ITheme[]
}