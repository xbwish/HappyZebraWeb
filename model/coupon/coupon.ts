export interface CouponInfo {
    list: Array<Coupon>;
    page?:number;
    count?: number;
    display?: string;
}

export interface Coupon {
    conditions?: Array<string>;
    couponCode?: string;
    couponName?: string;
    createTime?: string;
    endTime?: string;
    etime?: string;
    expression1?: string;
    expression2?: string;
    isExpire?: boolean;
    isUsed?: boolean;
    promotionId?: string;
    startTime?: string;
    stime?: string;
    updateTime?: string;
    usedId?: string;
    userId?: string;
    /** 是否选中 */
    checked?: boolean;
}

export interface CouponList {
    conditions: Array<string>;
    effectiveDays: number;
    effectiveHours: number;
    endTime: string;
    expression1: string;
    expression2: string;
    getNumber: number;
    id: number;
    isAutoReceive: boolean;
    isDel: boolean;
    isEnable: boolean;
    isExclusive: boolean;
    maxGoodsNums: number;
    maxNums: number;
    maxRecevieNums: number;
    name: string;
    parameters: string | null;
    promotionCondition: Array<any>;
    promotionResult: Array<any>;
    results: Array<string>;
    sort: number;
    startTime: string;
    type: number;
}