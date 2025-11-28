import { iApi, TApiConfig, TApiOutput, TGetParams, TPostParams } from "@/domain/contracts"

export class FetchApiDriver implements iApi {

  constructor(private config: TApiConfig) { }

  public async Post<TInput, TOutput>(params: TPostParams<TInput>): Promise<TApiOutput<TOutput>> {
    try {
      const response = await fetch(params.Url, {
        method: "POST",
        headers: params.Headers,
        body: JSON.stringify(params.Body)
      })
      return { success: true, ...(await response.json()) }
    } catch (error) {
      return { success: false, error }
    }
  }

  public async Get<TInput, TOutput>(params: TGetParams<TInput>): Promise<TApiOutput<TOutput>> {
    let data: unknown
    let success: boolean = false
    try {
      const query = params.Query ? "?" + new URLSearchParams(params.Query as any).toString() : ""
      const response = await fetch(`${params.Url}${query}`, {
        method: "GET",
        headers: params.Headers
      })

      data = await response.text();
      success = true

      try {
        return { success, ...JSON.parse(`${data}`) }
      } catch {
        return { success, text: data } as TApiOutput<TOutput>
      }

    } catch (error) {
      console.log("error: ", { error })
      return { success: false, error }
    }
  }


}
