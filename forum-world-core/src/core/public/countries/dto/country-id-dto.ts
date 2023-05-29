export class CountryIdDto {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly contentId: number
    ) {}
}