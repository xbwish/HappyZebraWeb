export * from './address';
export * from './afterSales';
export * from './agent';
export * from './balance';
export * from './coupon';
export * from './distribution';
export * from './history';
export * from './invoice';
export * from './notice';


export interface Areas {
    label: string;
    value: number;
    children: Array<Areas>;
}

export interface PointLog {
    balance: number;
    createTime: string;
    id: number;
    num: number;
    remarks: string;
    type: number;
    typeName: string;
    userId: number;
}