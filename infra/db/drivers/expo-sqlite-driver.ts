import type { TBatchResult, TDBConfig } from "@/domain/contracts"
import { iDB } from "@/domain/contracts"
import { SQLiteBindParams, SQLiteDatabase, openDatabaseSync } from "expo-sqlite"

export class ExpoSqliteDriver implements iDB<SQLiteBindParams> {
  private db: SQLiteDatabase | null = null
  private inTransaction = false
  constructor(private readonly dbConfig: TDBConfig) {}

  private error(exception: unknown) {
    let message: string = "Erro desconhecido"
    try {
      message = exception instanceof Error ? exception.message : JSON.stringify(exception)
    } finally {
      console.error("Exception:", { message })
      return { message }
    }
  }

  get isOpen(): boolean {
    return !this.db ? false : true
  }

  open(): boolean {
    if (this.isOpen) return true
    try {
      this.db = openDatabaseSync(this.dbConfig.database)
    } catch (exception) {
      this.db = null
      this.error(exception)
    } finally {
      return this.isOpen
    }
  }

  close(): void {
    if (!this.isOpen) return
    if (this.inTransaction) return

    this.db = null
  }

  beginTransaction(): boolean {
    this.open()
    if (!this.isOpen) return false
    if (this.inTransaction) return false
    try {
      this.db!.execSync("BEGIN TRANSACTION")
      this.inTransaction = true
    } catch (exception) {
      this.error(exception)
    } finally {
      return this.inTransaction
    }
  }

  commit(): boolean {
    if (!this.isOpen) return false
    if (!this.inTransaction) return false
    try {
      this.db!.execSync("COMMIT")
      this.inTransaction = false
    } catch (exception) {
      this.error(exception)
    } finally {
      return this.inTransaction
    }
  }

  rollback(): boolean {
    if (!this.isOpen) return false
    if (!this.inTransaction) return false
    try {
      this.db!.execSync("ROLLBACK")
      this.inTransaction = false
    } catch (exception) {
      this.error(exception)
    } finally {
      return this.inTransaction
    }
  }

  onTransaction<T = unknown>(event: (con: T) => TBatchResult): TBatchResult {
    if (!this.isOpen) return { success: false, affectedRows: 0, error: "DB don`t openned" }
    if (this.inTransaction) return { success: false, affectedRows: 0, error: "Transaction already open" }

    this.beginTransaction()
    try {
      const result = event(this.db as unknown as T)
      this.commit()
      return result
    } catch (exception) {
      const { message: error } = this.error(exception)
      this.rollback()
      return { success: false, affectedRows: 0, error }
    }
  }

  batch(sql: string, params?: SQLiteBindParams[]): TBatchResult {
    if (!this.isOpen) return { success: false, affectedRows: 0, error: "DB don`t openned" }
    if (this.inTransaction) return { success: false, affectedRows: 0, error: "Transaction already open" }

    let affectedRows = 0

    this.beginTransaction()
    try {
      // Lógica do Bloco 1 (batch) adaptada para await
      if (params?.length) {
        for (const p of params) {
          const result = this.db!.runSync(sql, p || [])
          affectedRows += result.changes
        }
      } else {
        const result = this.db!.runSync(sql, [])
        affectedRows += result.changes
      }

      this.commit()
      return { success: true, affectedRows }
    } catch (exception) {
      const { message: error } = this.error(exception)
      this.rollback()
      return { success: false, affectedRows, error }
    }
  }

  query<T = unknown>(sql: string, params?: SQLiteBindParams): T[] {
    this.open()
    if (!this.isOpen) return []

    try {
      const result = this.db!.getAllSync(sql, params || [])
      return result as T[]
    } catch (exception) {
      this.error(exception)
    }
    return []
  }

  execSql(sql: string, params?: SQLiteBindParams): boolean {
    this.open()
    if (!this.isOpen) return false

    try {
      if (params === undefined) {
        this.db!.execSync(sql)
        return true
      }
      this.db!.runSync(sql, params)
      return true
    } catch (exception) {
      this.error(exception)
    }
    return false
  }

  insert<T>(sql: string, params?: SQLiteBindParams): T {
    this.open()
    if (!this.isOpen) return 0 as T

    try {
      const result = this.execSql(sql, params)
      if (result) {
        const inserted = this.query("SELECT last_insert_rowid() as id")
        return (inserted[0] as { id: T }).id
      }
    } catch (exception) {
      this.error(exception)
    }
    return 0 as T
  }
}
