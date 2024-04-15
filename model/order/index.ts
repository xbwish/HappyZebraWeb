export * from './create-order';
export * from './order-distribution-model';
export * from './usable-point-query';
export * from './order-detail';
export * from './service-order';
export * from './payment-method';

export interface IOrderStatusSum {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    isAfterSale: number;
}


export interface IGoodsCollection {
    list: Array<IGoodsCollectionList>;
    [key: string]: any;
}

export interface IGoodsCollectionList {
    goodsId: number;
    goodsName: string;
    id: number;
    userId: number;
    createTime: string;
    goods: any;
    [key: string]: any;
}

export interface IOrderList {
    count: number;
    limit: number;
    page: number;
    status: number;
    [key: string]: any;
    list: Array<any>;
}
