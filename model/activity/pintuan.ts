import { Product } from '@/model/product';

export interface IpinTuan extends Product{ 
    pinTuanRecord?: Array<PinTuanRecordList>;
    isMarketable?: boolean; 
    buyPinTuanCount?: number;
    pinTuanRecordNums?: number;
    pinTuanRule?: {
        peopleNumber?: number;
        lastTime?: string;
        discountAmount?: number;
        pinTuanStartStatus?: number;
        name?: string;
        [key: string]: any;
    }; 
    [key: string]: any;
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