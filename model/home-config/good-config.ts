export interface GoodConfig {
    parameters?: {
        lookMore?: string;
        brandId?: string;
        column?: number;
        display?: string;
        lookTitle?: string;
        classifyId?: string;
        title?: string;
        list?: Array<GoodItem>;
    };
}

export interface GoodItem{
    id: string;
    image: string;
    name: string;
    brief: string;
    buyCount: number;
    initialSales: number;
    unit: string;
    viewCount: number;
    price: number;
    mktprice: number;
    divCount: number;
    points: number;
    pointsDeduction: number;
    isRecommend:boolean;
    isHot:boolean;
}