
/** 订单支持配送类型 同城配送，门店自提 */
export interface OrderDistributionModel {
    /**
     * 同城配送 
     */
    isOpenHomeDelivery: boolean;

    /**
     * 快递物流
     */
    isOpenMailing: boolean;

    /** 门店自提 */
    isOpenSelfDelivery: boolean;
}
