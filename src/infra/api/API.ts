import { iApi } from "@/domain/contracts"
import { apiConfig } from "@/infra/config"
import { FetchApiDriver as Driver } from "./drivers"

export const API: iApi = new Driver(apiConfig)
