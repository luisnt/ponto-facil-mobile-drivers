import { THeaders } from "./THeaders"
import { TQuery } from "./TQuery"

export type TApiEndpoint = {
    Url: string
    Headers?: THeaders
    Query?: TQuery
} 