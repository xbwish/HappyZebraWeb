import { UrlSharePageType } from "@/enum";

export interface Share {
    page?: UrlSharePageType;
    params?: Params;
    userShareCode?: string;
}

export interface Params {
    groupId?: string;
    goodsId?: string;
    teamId?: string;
    store?: string;
    articleId?: string;
    articleType?: string;
    pageCode?: string;
    id?: string;
    [key: string]: any;
}

export interface IShareParams {
    client?: number;
    url?: string;
    type?: number;
    page?: number;
    params?: any;
    [key: string]: any;
}

export interface IShareMessageArguments {
    title?: string,
    desc?: string,
    imgUrl?: string,
    id?: number,
    goodsId?: number;
}