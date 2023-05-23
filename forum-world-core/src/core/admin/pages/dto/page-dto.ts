export class PageDto {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly pathFragment: string,
        readonly contentId: number) { }
}