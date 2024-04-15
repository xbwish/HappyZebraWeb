export interface Config {
    /** 1:启用 */
    pointSwitch?: number;

    pointExchangeModel?: number;

    pointShowExchangePrice?: number;
    pointDiscountedProportion?: number;
    pointShowName?: string;
    pointMoney?: number;
    invoiceSwitch?: boolean;
    /** 1开启 2未开启 */
    showCoupon?: number;  
    recommendKeys?:Array<string>;
    [key: string]: any
}
