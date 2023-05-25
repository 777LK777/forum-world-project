export class CountryDto {
    constructor(
        readonly name: string,
        readonly pathFragment: string,
        readonly flagImageUrl: string) {}
}