export interface UserCoupon {
    count: number;
    display: string;
    list: Array<UserCouponList>;
    page: number;
}

export interface UserCouponList {
    conditions: Array<string>;
    couponCode: string;
    couponName: string;
    createTime: string;
    endTime: string;
    etime: string;
    expression1: string;
    expression2: string;
    isExpire: boolean;
    isUsed: boolean;
    promotionId: number;
    results: Array<string>;
    startTime: string;
    stime: string;
    updateTime: string | null;
    usedId: string | number | null;
    userId: number;
    isShow?: boolean;
    id: string;
    [key: string]: any;
}


export interface ICouponList {
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
    parameters: any;
    promotionCondition: Array<any>;
    promotionResult: Array<any>;
    results: Array<string>;
    sort: number;
    startTime: string;
    type: number;
    [key: string]: any;
}