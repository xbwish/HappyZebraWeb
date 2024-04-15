export interface AgentInfo {
    conditionMsg: string;
    conditionProgress: number;
    conditionStatus: boolean;
    createTime: string;
    currentMonthOrder: number;
    freezeAmount: number;
    gradeId: number;
    gradeName: string;
    id: number;
    isDelete: boolean;
    mobile: string;
    name: string;
    needApply: boolean;
    qq: string;
    settlementAmount: number;
    store: string;
    storeBanner: string;
    storeDesc: string | null;
    storeLogo: string | null;
    storeName: string | null;
    todayFreezeAmount: number;
    todayOrder: number;
    todayUser: number;
    totalGoods: number;
    totalSettlementAmount: number;
    updateTime: string;
    userId: number;
    verifyStatus: number;
    verifyTime: string;
    weixin: string;
}

export interface RecommendUser {
    avatarImage: string;
    childNum: number;
    createTime: string;
    mobile: string;
    nickName: string;
}

export interface AgentOrder {
    allOrder: number;
    allOrderMoney: number;
    customerOrder: number;
    customerOrderMoney: number;
    monthOrder: number;
    monthOrderMoney: number;
    procurementServiceOrder: number;
    procurementServiceOrderMoney: number;
}

export interface AgentOrderList {
    agentOrderDetails: Array<any>;
    amount: number;
    buyUserAvatar: string;
    buyUserId: number;
    buyUserNickName: string;
    createTime: string;
    distributorName: string | null;
    goodsAmount: number;
    id: number;
    isDelete: boolean;
    isSettlement: number;
    orderId: string;
    payedAmount: number;
    updateTime: string;
    userId: number;
}

export interface AgentGoodsList {
    className: string;
    limit: number;
    list: Array<any>;
    order: any;
    page: number;
    totalCount: number;
    totalPages: number;
    where: string;
}

export interface AgentRanking {
    data: Array<AgentRankingDataList>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}
export interface AgentRankingDataList {
    createtime: string;
    id: number;
    nickname: string;
    orderCount: number;
    totalInCome: number;
    ranking:number;
    [key: string]: any;
}

export interface AgentStoreInfo {
    createTime: string;
    name: string;
    storeBanner: string;
    storeDesc: string | null;
    storeLogo: string | null;
    storeName: string | null;
    [key: string]: any;
}

export interface AgentTeamSum {
    count: number;
    first: number;
    monthCount: number;
    monthFirst: number;
    monthSecond: number;
    second: number;
}