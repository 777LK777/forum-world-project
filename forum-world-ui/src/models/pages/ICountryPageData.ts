import { IPost } from "./IPost";
import { ITheme } from "./ITheme";
import { IContent } from "../IContent";
import { IBasicPage } from "./IBasicPage";

export interface ICountryPageData {
    posts: IPost[]
    themes?: ITheme[]
    content: IContent
    pathFragment: string
    isError: boolean
    basicPages: IBasicPage[]
}