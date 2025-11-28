import * as Contracts from "@/application"
import { TApiOutput } from "@/domain/contracts"
import { API } from "@/infra"

class MobileController {

    constructor(private readonly service: Contracts.MobileService) { }

    public async Login(input: Contracts.TLoginInput): Promise<TApiOutput<Contracts.TLoginOutput>> {
        const response = await this.service.Login(input)
        return response
    }

}

export const mobileController = new MobileController(new Contracts.MobileService(API))