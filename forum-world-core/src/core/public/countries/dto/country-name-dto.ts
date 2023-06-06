export class CountryNameDto {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly pathFragment: string
    ) {}
}