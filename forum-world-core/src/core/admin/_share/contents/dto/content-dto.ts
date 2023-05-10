export class ContentDto {
    constructor(
        readonly id: number,
        readonly data: {}) { }
}

export const nullContent = new ContentDto(0, { data: 0 })
