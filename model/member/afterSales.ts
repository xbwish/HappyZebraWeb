export interface AfterSalesList {
    hasNextPage: boolean;
    list: Array<AfterSalesDetail>;
    page: number;
    totalPage: number;
}

export interface AfterSalesDetail {
    aftersalesId: string;
    billRefund: any;
    billReship: any;
    createTime: string;
    images: Array<AftersalesImages>
    items: Array<AftersalesItems>;
    mark: any;
    order: any;
    orderId: string;
    reason: string;
    refundAmount: number;
    status: number;
    statusName: string;
    type: number;
    updateTime: string | null;
    userId: number;
    userNickName: string;
}

export interface AftersalesImages {
    aftersalesId: string;
    imageUrl: string;
    sortId: number;
}

export interface AftersalesItems {
    addon: string;
    aftersalesId: string;
    bn: string;
    createTime: string;
    goodsId: number;
    id: number;
    imageUrl: string;
    name: string;
    nums: number;
    orderItemsId: number;
    productId: number;
    sn: string;
    updateTime: string | null;
}

export interface Aftersalesinfo {
    info: AfterSalesDetail;
    reship: {
        reshipAddress: string;
        reshipArea: string;
        reshipMobile: string;
        reshipName: string;
    }
}

 