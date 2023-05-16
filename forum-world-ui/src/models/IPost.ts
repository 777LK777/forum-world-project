export interface IPost {
    readonly id?: number,
    name: string,
    country: {
        id: number,
        name: string
    },
    theme?: {
        id: number,
        name: string
    },
    contentId?: number
}