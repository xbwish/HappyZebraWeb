export interface ServiceOrder {
    count:number;
    list: Array<ServiceOrderListDetail>
}

export interface ServiceOrderListDetail {
    createTime:string;
    id:number;
    isPay:boolean;
    payTime:string;
    paymentId: string;
    service: any ;
    serviceOrderId: string;
    serviceTitle: string;
    servicesEndTime: string;
    servicesId:number;
    status:number;
    statusStr: string;
    userId:number;
    userName: string;
}

export interface ServiceOrderDetail {
    allowedMembership: string;
    allowedMemberships:Array<string>;
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
}

export interface ServicesTickets {
    createTime: string;
    id: number;
    isVerification:boolean;
    redeemCode: string;
    securityCode: string;
    serviceId: number;
    serviceOrderId: string;
    status: number;
    statusStr: string;
    userId: number;
    validityEndTime: string;
    validityStartTime: string;
    validityType: number;
    verificationTime: string | null;
}