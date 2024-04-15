import { Base } from "../base";

export interface SolitaireList  extends Base{
    contentBody?: string | null;
    description?: string;
    endTime?: string;
    isDelete?: false
    isShow?: true
    items?: null
    minDeliveryPrice?: number;
    startBuyPrice?: number;
    startTime?: string;
    status?: number;
    thumbnail?: string;
    title?: string;
    createTime?: string;
    [key: string]: any;
}

export interface SolitaireDetail {
    items: Array<SolitaireDetailItems>;
    model: SolitaireList;
    record: Array<SolitaireDetailRecord>
    [key: string]: any;
}

export interface SolitaireDetailItems {
    activityStock: number;
    goodId: number;
    goodObj: any;
    id: number;
    isDelete: boolean;
    oneCanBuy: number;
    price: number;
    productId: number;
    productObj: any;
    solitaireId: number;
    sortId: number;

    /** 购买数量 */
    nums?: number;
    [key: string]: any;
}
export interface SolitaireDetailRecord {
    avatarImage: string | null;
    create: string;
    nickName: string | null;
    nums: number;
    productName: string;
    productSku: string;
    [key: string]: any;
}