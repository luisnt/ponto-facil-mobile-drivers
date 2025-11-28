import { iDb } from "@/domain/contracts"
import { dbConfig } from "@/infra/config"
import { SQLiteBindParams } from "expo-sqlite"
import { ExpoSqliteDriver as Driver } from "./drivers"

export const DB: iDb<SQLiteBindParams> = new Driver(dbConfig)
