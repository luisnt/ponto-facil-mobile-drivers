import { DB } from "@/infra"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { AuxConsts, echo } from "./AuxConsts"

export default function Index() {
  const [name, setName] = useState("Carregando...")
  useEffect(() => {
    console.log("test")
    let result: any = null
    let local: number = 0
    let label: string = ""

    console.log("@@@@@@ DB TEST START @@@@@@")
    let step = 0

    result = DB.open()
    echo(++step, { label: "DB.open()", result })

    result = DB.query("SELECT 1+1 AS total")
    echo(++step, { label: "DB.query('SELECT 1+1 AS total')", result })

    result = DB.execSql(AuxConsts.CREATE_SAMPLE)
    echo(++step, { label: "CREATE TABLE", result })

    result = DB.query(AuxConsts.COUNT_SAMPLE)
    echo(++step, { label: "COUNT SAMPLE", result })

    const sampleIDs: number[] = []
    for (let i = 1; i <= 7; i++) {
      const sql = AuxConsts.INSERT_SAMPLE_TEMPLATE(`Luis Caldas ${i}`, 51 + i)
      result = DB.insert<number>(sql)
      sampleIDs.push(result)
    }
    echo(++step, { label: "INSERT SAMPLE x7", ids: sampleIDs })

    result = DB.query(AuxConsts.COUNT_SAMPLE)
    echo(++step, { label: "COUNT AFTER INSERT", result })

    result = DB.query(AuxConsts.SELECT_ALL_SAMPLE)
    echo(++step, { label: "SELECT ALL", result })

    result = DB.execSql(AuxConsts.UPDATE_SAMPLE)
    echo(++step, { label: "UPDATE ID=5", result })

    result = DB.execSql(AuxConsts.BULK_INSERT_SAMPLE)
    echo(++step, { label: "BULK INSERT", result })

    result = DB.query(AuxConsts.SELECT_ALL_SAMPLE)
    echo(++step, { label: "SELECT ALL AFTER BULK", result })

    result = DB.execSql(AuxConsts.DELETE_SAMPLE_ID6)
    echo(++step, { label: "DELETE ID=6", result })

    result = DB.query(AuxConsts.SELECT_ALL_SAMPLE)
    echo(++step, { label: "SELECT ALL AFTER DELETE", result })

    console.log("### DB TEST PARAMS START ###")

    result = DB.execSql(AuxConsts.UPDATE_NAME_SAMPLE_IDX, ["Mary Doe", 7])
    echo(++step, { label: "UPDATE NAME=Mary Doe SAMPLE IDX=7", result })

    result = DB.query(AuxConsts.SELECT_SAMPLE_IDX, [7])
    echo(++step, { label: "SELECT SAMPLE ID=7", result })

    setName(JSON.stringify(result[0]))

    console.log("### DB TEST PARAMS END ###")

    result = DB.execSql(AuxConsts.DROP_SAMPLE)
    echo(++step, { label: "DROP TABLE", result })

    console.log("@@@@@@ DB TEST END @@@@@@")
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>App</Text>
      <Text>Registro 7: [{name}]</Text>
    </View>
  )
}
