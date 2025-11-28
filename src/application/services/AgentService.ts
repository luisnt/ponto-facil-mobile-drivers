import type * as Contracts from "@/application/dto";
import { iApi, TApiOutput } from "@/domain/contracts";
import { apiConfig as config } from "@/infra/config";

export class AgentService {
    private readonly userAgent: string = "MOBILE"
    private readonly password: string = "MOBILE"

    constructor(private readonly Api: iApi) { }

    public async Settings(input: Contracts.TSettingsInput): Promise<TApiOutput<Contracts.TSettingsOutput>> {
        const response = await this.Api.Get<Contracts.TDeviceId, Contracts.TSettingsOutput>({
            ...config.Agent.Settings(input.serie),
        });
        return response
    }

    public async RepService({ serie: username, ...input }: Contracts.TRepServiceInput & Contracts.TSettingsInput): Promise<TApiOutput<Contracts.TRepServiceOutput>> {
        const { userAgent, password } = this
        const response = await this.Api.Post<Contracts.TRepServiceInput, Contracts.TRepServiceOutput>({
            ...config.Agent.RepService({ userAgent, username, password }),
            Body: { ...input }
        });
        return response
    }

    public async SendAfd(input: Contracts.TSendAfdInput): Promise<TApiOutput<Contracts.TSendAfdOutput>> {
        const response = await this.Api.Post<Contracts.TSendAfdInput, Contracts.TSendAfdOutput>({
            ...config.Agent.AfdSend,
            Body: { ...input }
        });
        return response
    }
}