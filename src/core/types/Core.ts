export interface UpdateRequestBase<T> {
    id: string
    version: number
    data: T
}
