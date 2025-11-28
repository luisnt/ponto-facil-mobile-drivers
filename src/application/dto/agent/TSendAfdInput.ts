import { TDeviceId } from "./TDeviceId";
import { TSendAfdInputRecords } from "./TSendAfdInputRecords";

export type TSendAfdInput = {
    registros: TSendAfdInputRecords;
    rep: TDeviceId;
};