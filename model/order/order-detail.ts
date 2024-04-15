import { Base } from "../base";
import { Product } from "../product";

export interface OrderDetail {
    amount?: number;
    costFreight?: number;
    //todo
    coupon?: Array<any>;
    couponPromotionMoney?: number;
    goodsAmount?: number;
    goodsPromotionMoney?: number;
    orderPromotionMoney?: number;
    point?: number;
    pointExchangeMoney?: number;
    //todo
    promotionList?: any;
    //todo
    type?: number;
    userId?: number;
    weight?: number;
    list: Array<OrderProductItem>,
    [key: string]: any;
}

export interface OrderProductItem extends Base {
    //todo
    good: any;
    id?: number;
    isCollection?: boolean;
    isSelect?: boolean;
    nums?: number;
    productId?: number;
    //todo
    type?: number;
    userId?: number;
    weight?: number;
    products?: OrderProductInfo
}

export interface OrderProductInfo extends Product {
    levelOne?: number;
    levelThree?: number;
    levelTwo?: number;
    weight?: number;
    marketable?: boolean;
    pointsDeduction?: number;
    costprice?: number;
}



