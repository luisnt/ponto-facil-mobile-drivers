import { iDB } from "@/domain/contracts"
import { dbConfig } from "@/etc"
import { ExpoSqliteDriver as Driver } from "./drivers"

export const DB: iDB = new Driver(dbConfig)
