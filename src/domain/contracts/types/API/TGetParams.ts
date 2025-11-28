import { THeaders } from "./THeaders"

export type TGetParams<TInput> = {
  Url: string
  Headers?: THeaders
  Query?: TInput
}
