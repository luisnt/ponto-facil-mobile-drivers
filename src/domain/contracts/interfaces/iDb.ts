import { TBatchResult } from "../types"

export interface iDb<TParams> {
  open(): boolean
  close(): void
  beginTransaction(): boolean
  commit(): boolean
  rollback(): boolean
  onTransaction<T = unknown>(event: (con: T) => TBatchResult): TBatchResult
  batch(sql: string, params?: TParams[]): TBatchResult
  query<T = unknown>(sql: string, params?: TParams): T[]
  execSql(sql: string, params?: TParams): boolean
  insert(sql: string, params?: TParams): number | string | unknown
}
