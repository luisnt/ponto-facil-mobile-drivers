import { TApiConfig, TBasicAuthorization } from "@/domain/contracts";

export const apiConfig: TApiConfig = {
    Mobile: {
        Login: {
            Url: "http://www.proinddy.com.br/mobile/v3/auth",
            Headers: { "Content-Type": "application/json" }
        }
    },
    Agent: {
        Settings: (serie: string) => ({
            Url: `http://www.proinddy.com.br/mobile/v3/auth/settings/${serie}`,
            Headers: { Accept: "application/json" },
            Query: {}
        }),
        RepService: ({ userAgent, username, password }: TBasicAuthorization) => {
            const credentials = `${username}:${password}`
            return {
                Url: "http://relogio.proinddy.com.br/conexaorep",
                Headers: {
                    "Content-Type": "application/json",
                    "User-Agent": `${userAgent}`,
                    Authorization: `Basic ${btoa(credentials)}`
                }
            }
        },
        AfdSend: {
            Url: "https://www.proinddy.com.br/mobile/v3/afd",
            Headers: { "Content-Type": "application/json" }
        }
    },
    WhatsApp: {
        Message: (message: string) => ({
            Url: "http://srv.proinddy.com.br/acme/sis/test/sendzapdelphi.php",
            Headers: {
                "User-Agent": "MOBILE",
                Accept: "*/*",
                Connection: "close"
            },
            Query: {
                // abc: "9892298077",
                abc: "98981112233",
                token: "@9876",
                msg: message
            }
        })
    }
}