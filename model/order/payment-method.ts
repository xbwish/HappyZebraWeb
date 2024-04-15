export interface PaymentMethod {
    code: string;
    id: number
    isEnable: boolean;
    isOnline: boolean;
    memo: string;
    name: string;
    parameters: any;
    sort: number;
}