import { DB } from "@/infra"
import { AuxConsts } from "@/infra/tests/AuxConsts"
import { SkillService } from "./SkillService"

export async function DbTestService() {
  const { title1, title2, echo } = SkillService()

  let result: any = null

  title1("DB TEST: INIT")
  let step = 0

  result = DB.open()
  echo(++step, "DB.open()", result)

  result = DB.query("SELECT 1+1 AS total")
  echo(++step, "DB.query('SELECT 1+1 AS total')", result)

  result = DB.execSql(AuxConsts.CREATE_SAMPLE)
  echo(++step, "CREATE TABLE", result)

  result = DB.query(AuxConsts.COUNT_SAMPLE)
  echo(++step, "COUNT SAMPLE", result)

  const ids: number[] = []
  for (let i = 1; i <= 7; i++) {
    const sql = AuxConsts.INSERT_SAMPLE_TEMPLATE(`Luis Caldas ${i}`, 51 + i)
    result = DB.insert(sql)
    ids.push(result)
  }
  echo(++step, "INSERT SAMPLE x7", ids)

  result = DB.query(AuxConsts.COUNT_SAMPLE)
  echo(++step, "COUNT AFTER INSERT", result)

  result = DB.query(AuxConsts.SELECT_ALL_SAMPLE)
  echo(++step, "SELECT ALL", result)

  result = DB.execSql(AuxConsts.UPDATE_SAMPLE)
  echo(++step, "UPDATE ID=5", result)

  result = DB.execSql(AuxConsts.BULK_INSERT_SAMPLE)
  echo(++step, "BULK INSERT", result)

  result = DB.query(AuxConsts.SELECT_ALL_SAMPLE)
  echo(++step, "SELECT ALL AFTER BULK", result)

  result = DB.execSql(AuxConsts.DELETE_SAMPLE_ID6)
  echo(++step, "DELETE ID=6", result)

  result = DB.query(AuxConsts.SELECT_ALL_SAMPLE)
  echo(++step, "SELECT ALL AFTER DELETE", result)

  title2("DB TEST PARAMS: START")

  result = DB.execSql(AuxConsts.UPDATE_NAME_SAMPLE_IDX, ["Mary Doe", 7])
  echo(++step, "UPDATE NAME=Mary Doe SAMPLE IDX=7", result)

  result = DB.query(AuxConsts.SELECT_SAMPLE_IDX, [7])
  echo(++step, "SELECT SAMPLE ID=7", result)

  const state = result

  title2("DB TEST PARAMS: END")

  result = DB.execSql(AuxConsts.DROP_SAMPLE)
  echo(++step, "DROP TABLE", result)

  title1("DB TEST: END")

  return JSON.stringify(state)
}
