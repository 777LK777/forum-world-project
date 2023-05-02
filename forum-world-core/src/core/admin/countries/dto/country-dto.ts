export class CountryDto {
    constructor(
        readonly id: number, 
        readonly name: string, 
        readonly pathFragment: string,
        readonly flagImageUrl: string,
        readonly contentId: number) { }
}

export class CountryNameDto {
    constructor(
        readonly id: number, 
        readonly name: string) { }
}