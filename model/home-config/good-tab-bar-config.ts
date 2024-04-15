export interface GoodTabBarConfig {
    parameters?: {
        list?: Array<GoodTabBarItemConfig>
    }
}

export interface GoodTabBarItemConfig {
    column: number;
    title: string;
    list: Array<{
        id: number;
        image: string;
        name: string;
        price: number;
        mktprice: number;
        buyCount: number;
        initialSales: number;
        unit: string;
        pointsDeduction: number;
        points: number;
        brief: string;
        divCount: number;
    }>
}