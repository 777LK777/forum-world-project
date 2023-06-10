import { IContent } from "../IContent";
import { IBasicPage } from "./IBasicPage";

export interface IBasicPageData {
    content: IContent
    basicPages: IBasicPage[]
    isError: boolean
}