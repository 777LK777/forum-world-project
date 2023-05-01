export class CreatePostDto {
    constructor(
        readonly name: string,
        readonly countryId: number,
        readonly themeId?: number) {}
}