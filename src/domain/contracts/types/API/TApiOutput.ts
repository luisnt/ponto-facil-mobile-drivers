export type TApiOutput<TOutput> = { success: boolean } & ((TOutput) | ({ error?: unknown }))
