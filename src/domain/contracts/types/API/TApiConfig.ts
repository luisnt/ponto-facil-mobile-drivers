import { TBasicAuthorization } from "../../../../application/dto/agent"
import { TApiEndpoint } from "./TApiEndpoint"
import { TGetApiEndpoint } from "./TGetApiEndpoint"

export type TApiConfig = {
    Mobile: { Login: TApiEndpoint }
    Agent: {
        Settings: (serie: string) => TGetApiEndpoint
        RepService: ({ userAgent, username, password }: TBasicAuthorization) => TApiEndpoint
        AfdSend: TApiEndpoint
    },
    WhatsApp: {
        Message: (message: string) => TGetApiEndpoint;
    }
}