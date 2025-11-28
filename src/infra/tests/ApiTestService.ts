import * as Contracts from "@/domain/contracts"
import { API } from "@/infra"
import { apiConfig as config } from "@/infra/config"
import { SkillService } from "./SkillService"

export async function ApiTestService() {
  const { title1, title2, echo } = SkillService()

  let result: any = null

  title1("API TEST: START")
  let step = 0

  title2("MOBILE.Login")

  result = await API.Post<Contracts.TLoginInput, Contracts.TLoginOutput>({
    ...config.Mobile.Login,
    Body: {
      serie: "02000001000002337",
      imei: "357881112345678",
      phone: "098992482745"
    }
  });

  echo(++step, "API.Post<TLoginInput, TLoginOutput>()", result)

  title2("AGENT.Settings")

  result = await API.Get<Contracts.TSettingsInput, Contracts.TSettingsOutput>({
    ...config.Agent.Settings("02000001000002337")
  });

  echo(++step, "API.Get<null, TSettingsOutput>()", result)

  title2("AGENT.RepService")

  const userAgent = "CONTROL_ID"
  const username = "4408801109331293"
  const password = "CONTROLID"

  result = await API.Post<Contracts.TRepServiceInput, Contracts.TRepServiceOutput>({
    ...config.Agent.RepService({ userAgent, username, password }),
    Body: {
      envia: {
        resp: "ok",
        nsr: "255",
        req: "NSR"
      }
    }
  });

  echo(++step, "API.Post<TRepServiceInput, TRepServiceOutput>()", result)

  title2("AGENT.SendAfd")

  const Body = {
    registros: [
      {
        data: "24112025",
        nsr: "000000255",
        time: "1530",
        tipo: 5,
        txt: "00000025552025-11-24T15:30:00-0300A023745198812Gabriel Gomes"
      }
    ],
    rep: { serie: "02000001000002337" }
  }

  result = await API.Post<Contracts.TSendAfdInput, Contracts.TSendAfdOutput>({
    ...config.Agent.AfdSend,
    Body
  });

  echo(++step, "API.Post<TSendAfdInput, TSendAfdOutput>()", result)

  title2("AGENT.WhatsApp")

  const message = "Ponto Fácil - Test do envio de mensagem no WhatsApp"

  result = await API.Get<Contracts.TWhatsAppSendInput, Contracts.TWhatsAppSendOutput>({
    ...config.WhatsApp.Message(message)
  });

  echo(++step, "API.Get<TWhatsAppSendInput, TWhatsAppSendOutput>()", result)

  const state = result

  title2("API TEST: END")

  return JSON.stringify(state)
}
