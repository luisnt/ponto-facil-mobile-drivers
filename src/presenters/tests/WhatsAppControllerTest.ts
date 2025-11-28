import { SkillService } from "@/infra/tests/SkillService"
import { whatsAppController } from "../controllers"

export async function WhatsAppControllerTest() {
    const { title1, title2, echo } = SkillService()

    let result: any = null

    title1("WhatsApp Controller")

    title2("Test: INIT")
    let step = 0

    const phone = "098981112233"
    const message = "Ponto Fácil - Test do envio de mensagem no WhatsApp"

    result = await whatsAppController.Message({ phone, message })

    echo(++step, "whatsAppController.Message({ phone, message })", { phone, message, result })

    title2("Test: END")

    return JSON.stringify(result)
}
