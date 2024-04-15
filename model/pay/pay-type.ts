import { PaymentTypeEnum } from "@/enum";
/** 支付方式 */
export interface PayType {
    code: string;
    id: PaymentTypeEnum;
    isOnline: boolean;
    memo: string;
    name: string;
    parameters: string;
    sort: number;
}