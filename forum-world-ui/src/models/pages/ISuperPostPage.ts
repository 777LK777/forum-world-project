import { IPost } from "../IPost";
import { ITheme } from "../ITheme";
import { ICountry } from "./ICountry";
import { IContent } from "../IContent";
import { IBasicPage } from "./IBasicPage";

export interface ISuperPostPageData {
    country: ICountry
    posts: IPost[]
    themes?: ITheme[]
    content: IContent
    basicPages: IBasicPage[]
    isError: boolean
}