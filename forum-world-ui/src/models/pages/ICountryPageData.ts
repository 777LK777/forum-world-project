import { IPost } from "./IPost";
import { ITheme } from "./ITheme";
import { IContent } from "../IContent";

export interface ICountryPageData {
    posts: IPost[]
    themes?: ITheme[]
    content: IContent
    pathFragment: string
    isError: boolean
}