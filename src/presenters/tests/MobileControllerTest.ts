import { SkillService } from "@/infra/tests/SkillService"
import { mobileController } from "../controllers"

export async function MobileControllerTest() {
    const { title1, title2, echo } = SkillService()

    let result: any = null

    title1("Mobile Controller")

    title2("Test: INIT")
    let step = 0

    const imei = "357881112345678"
    const phone = "098981112233"
    const serie = "02000001000002337"

    result = await mobileController.Login({ imei, phone, serie })

    echo(++step, "mobileController.Login({ imei, phone, serie })", { imei, phone, serie, result })

    title2("Test: END")

    return JSON.stringify(result)
}
