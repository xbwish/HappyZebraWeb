export interface GoodsBrowsing {
    count: number;
    list: Array<GoodsBrowsingDetail>
}

export interface GoodsBrowsingDetail {
    createTime: string;
    goodImage: string;
    goodsId: number;
    goodsName: string;
    id: number;
    isCollection: boolean;
    isdel: boolean;
    userId: number;
}