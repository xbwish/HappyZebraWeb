import { OrderDistributionModelEnum, OrderTypeEnum } from "@/enum";

export interface CartQuery {
    userId?: number;
    ids?: string;

    /** 购物车类型(对应订单类型，普通，团购，秒杀，拼团，接龙等....) */
    type?: OrderTypeEnum;
    areaId?: number;
    point?: number;
    /** 优惠券码(带小写,号多个编码) */
    couponCode?: string | null;
    /** 配送方式（快递物流，同城配送，门店自提） */
    receiptType?: OrderDistributionModelEnum;

    objectId?:number;

    /** 地址 */
    userShipId?: number | string;
}