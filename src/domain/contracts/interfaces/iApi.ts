import { TApiOutput, TGetParams, TPostParams } from "@/domain/contracts/types"

export interface iApi {
  Post<TInput, TOutput>(params: TPostParams<TInput>): Promise<TApiOutput<TOutput>>
  Get<TInput, TOutput>(params: TGetParams<TInput>): Promise<TApiOutput<TOutput>>
}
