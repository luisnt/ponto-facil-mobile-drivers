import * as Contracts from "@/application"
import { TApiOutput } from "@/domain/contracts"
import { API } from "@/infra"

class WhatsAppController {

    constructor(private readonly service: Contracts.WhatsAppService) { }

    public async Message({ phone, message }: Contracts.TWhatsAppSendInput): Promise<TApiOutput<Contracts.TWhatsAppSendOutput>> {
        const response = await this.service.Message({ phone, message })
        return response
    }

}

export const whatsAppController = new WhatsAppController(new Contracts.WhatsAppService(API))