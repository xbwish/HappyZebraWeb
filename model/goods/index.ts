import { Product } from '@/model/product';
 
export interface GoodParams {
    name?: string;
    value?: string;
}

export interface PinTuanRecordList {
    closeTime: string;
    createTime: string;
    goodName: string;
    goodsId: number;
    id: number;
    isOverdue: boolean;
    lastTime: number;
    nickName: string;
    orderId: string;
    parameters: string;
    peopleNumber: number;
    ruleId: number;
    ruleName: null
    status: number;
    teamId: number;
    teamNums: number;
    teams: Array<any>;
    updateTime: string;
    userAvatar: string;
    userId: number;
}

export interface CollectionList {
    count: number;
    list: Array<CollectionDetail>;
}

export interface CollectionDetail {
    createTime: string;
    goods: Product;
    goodsId: number;
    goodsName: string;
    id: number;
    userId: number;
}

