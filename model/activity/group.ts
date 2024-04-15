import { Product } from '@/model/product';

export interface GroupList {
    goods?: Array<{
        id: number;
        image: string;
        name: string;
        brief: string;
        buyPromotionCount: number;
        stock: number;
        price: number;
        mktprice: number;
        [key: string]: any;
    }>;
    list: Array<GroupDetailList>;
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface GroupDetailList {
    id: number;
    name: string;
    maxNums: number;
    parameters: string;
    groupId: number;
    goodThumbnail?:string;
    [key: string]: any;
}

export interface IGroupDetail extends Product{
    groupId?: number;
    [key: string]: any;
}