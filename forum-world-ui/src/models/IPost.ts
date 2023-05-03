export interface IPost {
    readonly id?: number,
    name: string,
    countryId: number,
    themeId?: number,
    contentId?: number
}