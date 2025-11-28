import type * as Contracts from "@/application/dto";
import { iApi, TApiOutput } from "@/domain/contracts";
import { apiConfig as config } from "@/infra/config";

export class MobileService {

    constructor(private readonly Api: iApi) { }

    public async Login(input: Contracts.TLoginInput): Promise<TApiOutput<Contracts.TLoginOutput>> {
        const response = await this.Api.Post<Contracts.TLoginInput, TApiOutput<Contracts.TLoginOutput>>({
            ...config.Mobile.Login,
            Body: input
        })
        return response
    }
}