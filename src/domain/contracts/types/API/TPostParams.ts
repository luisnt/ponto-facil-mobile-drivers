import { THeaders } from "./THeaders"

export type TPostParams<TInput> = {
  Url: string
  Headers?: THeaders
  Body: TInput
}
