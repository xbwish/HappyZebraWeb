import { OrderTypeEnum } from "@/enum";

/** 订单可使用积分 */
export interface UsablePoint {

    /** 购物车类型 */
    cartType: OrderTypeEnum | undefined;

    /** 购物车序列号 */
    ids: string;

    /** 订单金额 */
    orderMoney: number | undefined;

}