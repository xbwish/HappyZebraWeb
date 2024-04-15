import { OrderTypeEnum } from "@/enum";
import { Base } from "../base";
import { SKU } from "../product";

/** 获取购物车列表提交实体 */
export interface Cart {
    amount?: number;
    costFreight?: number;
    goodsAmount?: number;
    userId?: number;
    weight?: number;
    type?: OrderTypeEnum;
    list?: Array<ProductItem>;
    coupon?: Array<any>;
    couponPromotionMoney?: number;
    orderPromotionMoney?: number;
    point?: number;
    pointExchangeMoney?: number;
    //todo
    promotionList?: any;

    /** 商品优惠 */
    goodsPromotionMoney?: number;

    /** 商品数量 */
    productNums?: number;
}

export interface ProductItem extends Base {
    good?: any;
    isCollection?: boolean;
    isSelect?: boolean;
    nums?: number;

    /** SKU Id */
    productId?: number;
    userId?: number;
    weight: number;
    products: CartSKU;

    // UI 界面使用
    /** 
     * 购物车商品是否选择
     *  
     */
    check?: boolean;

    /** 小计 */
    subtotal?: number;
}


export interface CartSKU extends SKU {
    //todo
    gradeInfo?: any;
    //todo
    gradePrice?: any;

}


// /** 获取购物车列表提交实体 */
// export interface CartList {
//     /** 用户序列 */
//     userId: number;
//     /** 购物车数据 */
//     ids: string;
//     /** 购物车类型 */
//     type: number;
//     /** 区域编码 */
//     areaId: number;
//     /** 积分 */
//     point: number;
//     /** 优惠券码 */
//     couponCode: string;
//     /** 配送方式是否包邮   1=快递配送（要去算运费）生成订单记录快递方式  2=门店自提（不需要计算运费）生成订单记录门店自提信息 */
//     receiptType: number;
//     /** 用户收货地址 */
//     userShipId: number;
//     /** 关联非普通订单对象序列 */
//     objectId: number;
// }

