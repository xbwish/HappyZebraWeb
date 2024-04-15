
/** 订单状态[对应CoreCmsOrder表status字段] */
export  enum orderStatus {
    /** 订单正常 */
    normal = 1,
    /** 订单完成 */
    complete = 2,
    /** 订单取消 */
    cancel = 3,
}
/** 订单支付状态[对应CoreCmsOrder表payStatus字段] */
export enum orderPayStatus {
    /** 未付款 */
    no = 1,
    /** 已付款 */
    yes = 2,
    /** 部分付款 */
    partialYes = 3,
    /** 部分退款 */
    partialNo = 4,
    /** 已退款 */
    refunded = 5,
}
/** 订单发货状态[对应CoreCmsOrder表shipStatus字段] */
export enum orderShipStatus {
    /** 未发货 */
    no = 1,
    /** 部分发货 */
    partialYes = 2,
    /** 已发货 */
    yes = 3,
    /** 部分退货 */
    partialNo = 4,
    /** 已退货 */
    returned = 5,
}
/** 订单收货状态[对应CoreCmsOrder表confirmStatus字段] */
export enum orderConfirmStatus {
    /** 未确认收货 */
    receiptNotConfirmed = 1,
    /** 已确认收货 */
    confirmReceipt = 2,
}
/** 全局总订单类型 */
export enum orderAllStatusType {
    /** 待付款 */
    aLL_PENDING_PAYMENT = 1,
    /** 待发货 */
    aLL_PENDING_DELIVERY = 2,
    /** 待收货 */
    aLL_PENDING_RECEIPT = 3,
    /** 待评价 */
    aLL_PENDING_EVALUATE = 4,
    /** 已评价 */
    aLL_COMPLETED_EVALUATE = 5,
    /** 已完成 */
    aLL_COMPLETED = 6,
    /** 已取消 */
    aLL_CANCEL = 7,
    /** 部分发货 */
    aLL_PARTIAL_DELIVERY = 8,
}

export enum userSexTypes {
    MAN = 1,  // 男
    WOMAN = 2, // 女
    SECRECY = 3, // 保密
}

export enum invoiceType {
    no = 1,
    personal = 2,
    company = 3,
}
