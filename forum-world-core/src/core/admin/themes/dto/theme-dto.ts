export class ThemeDto {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly pathFragment: string) { }
}

export class ThemeNameDto {
    constructor(
        readonly id: number,
        readonly name: string) { }
}
