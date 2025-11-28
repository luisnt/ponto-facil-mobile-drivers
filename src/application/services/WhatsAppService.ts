import type * as Contracts from "@/application/dto";
import { iApi, TApiOutput } from "@/domain/contracts";
import { apiConfig as config } from "@/infra/config";

export class WhatsAppService {

    constructor(private readonly Api: iApi) { }

    public async Message({ phone, message }: Contracts.TWhatsAppSendInput): Promise<TApiOutput<Contracts.TWhatsAppSendOutput>> {
        const params = config.WhatsApp.Message(message)
        const response = await this.Api.Get<Contracts.TWhatsAppSendInput, TApiOutput<Contracts.TWhatsAppSendOutput>>({
            ...params,
            Query: {
                ...params.Query,
                abc: phone,
                msg: message
            }
        })
        return response
    }
}