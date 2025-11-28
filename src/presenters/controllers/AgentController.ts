import * as Contracts from "@/application"
import { TApiOutput } from "@/domain/contracts"
import { API } from "@/infra"

class AgentController {

    constructor(private readonly service: Contracts.AgentService) { }

    public async Settings(input: Contracts.TSettingsInput): Promise<TApiOutput<Contracts.TSettingsOutput>> {
        const response = await this.service.Settings(input)
        return response
    }

    public async RepService({ serie, ...input }: Contracts.TRepServiceInput & Contracts.TSettingsInput): Promise<TApiOutput<Contracts.TRepServiceOutput>> {
        const response = await this.service.RepService({ serie, ...input })
        return response
    }

    public async SendAfd(input: Contracts.TSendAfdInput): Promise<TApiOutput<Contracts.TSendAfdOutput>> {
        const response = await this.service.SendAfd(input)
        return response
    }

}

export const agentController = new AgentController(new Contracts.AgentService(API))