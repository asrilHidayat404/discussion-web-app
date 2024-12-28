export type Question = {
    id: string,
    question: string,
    userId: string,
    createdAt: Date,
    user?: {
        id: string,
        firstname: string,
        lastname: string,
        picture: string | null
    }
}[]