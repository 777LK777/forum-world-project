import { IPost } from "./IPost";
import { ITheme } from "./ITheme";
import { IBasicPage } from "./IBasicPage";
import { ICountry } from "./ICountry";

export interface IThemePageData {
    theme: ITheme
    country: ICountry
    basicPages: IBasicPage[]
    superPosts: IPost[]
    posts: IPost[]
    themes: ITheme[]
    isError: boolean
}