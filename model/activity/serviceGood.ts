export interface ServiceDetail {
    allowedMembership: string;
    allowedMemberships: Array<string>;
    amount: number;
    consumableStore: string;
    consumableStores: Array<string>;
    contentBody: string;
    createTime: string;
    description: string;
    endTime: string;
    id: number;
    maxBuyNumber: number;
    money: number;
    openStatus: number;
    startTime: string;
    status: number;
    thumbnail: string;
    ticketNumber: number;
    timestamp: number;
    title: string;
    updateTime: string;
    validityEndTime: string;
    validityStartTime: string;
    validityType: number;
    [key: string]: any;
}

export interface ServiceList {
    count: number;
    list: Array<ServiceDetail>
}