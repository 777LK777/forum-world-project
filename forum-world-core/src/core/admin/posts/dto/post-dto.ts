export class PostDto {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly countryId: number,
        readonly themeId?: number,
        readonly contentId?: number
    ) { }
}