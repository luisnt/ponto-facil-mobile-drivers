import { SkillService } from "@/infra/tests/SkillService"
import { agentController } from "../controllers"


export async function AgentControllerTest() {
    const { title1, title2, echo } = SkillService()

    let result: any = null

    let step = 0

    // CONSTANTS
    const serie = "02000001000002337"
    const envia = { resp: "ok", nsr: "255", req: "NSR" }
    const AfdInput = {
        registros: [
            {
                data: "24112025",
                nsr: "000000255",
                time: "1530",
                tipo: 5,
                txt: "00000025552025-11-24T15:30:00-0300A023745198812Gabriel Gomes"
            }
        ],
        rep: { serie }
    }

    //TESTS
    return ({
        Open: () => {
            title1("Agent Controller")
            title2("Test: INIT")
        },
        Settings: async () => {
            result = await agentController.Settings({ serie })
            echo(++step, "agentController.Settings({ serie })", { serie, result })
            return result
        },
        RepService: async () => {
            result = await agentController.RepService({ serie, envia })
            echo(++step, "agentController.RepService({  serie, envia })", { serie, envia, result })
            return result
        },
        SendAfd: async () => {
            result = await agentController.SendAfd({ ...AfdInput })
            echo(++step, "agentController.SenfAfd({ Body })", { AfdInput, result })
            return result
        },
        Close: () => title2("Test: END")
    })

}
