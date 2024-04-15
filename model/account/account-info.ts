import { Base } from "../base";

export interface IAccountInfo extends Base {
    userName?: string;
    nickName?: string;
    mobile?: string;
    // todo
    sex?: number;
    balance?: number;
    avatarImage?: string;
    birthday?: string;
    collectionCount?: number;
    footPrintCount?: number;
    //todo
    grade?: number;
    gradeName?: string;
    orderCount?: number;
    parentId?: number;
    passWord?: string;
    point?: number;
    status?: number;
    userCouponCount?: number;
    [key: string]: any;
}