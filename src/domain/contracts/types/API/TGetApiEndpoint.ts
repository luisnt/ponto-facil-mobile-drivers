import { THeaders } from "./THeaders"
import { TQuery } from "./TQuery"

export type TGetApiEndpoint = {
    Url: string
    Headers?: THeaders
    Query: TQuery
} 