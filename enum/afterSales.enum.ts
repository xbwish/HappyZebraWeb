/** 售后单状态 */
export enum billAftersalesStatus {
    /** 等待审核 */
    waitAudit = 1,
    /** 审核通过 */
    success = 2,
    /** 审核拒绝 */
    refuse = 3,
    /** 用户取消 */
    cancel = 4,
}

/** 退款单状态 【对应CoreCmsBillRefund.status字段】 */
export enum billRefundStatus {
    /** 未退款 */
    sTATUS_NOREFUND = 1,
    /** 已退款 */
    sTATUS_REFUND = 2,
    /** 同意退款但原路退还失败 */
    sTATUS_FAIL = 3,
    /** 拒绝 */
    sTATUS_REFUSE = 4,
}

/** 退货单状态 */
export enum billReshipStatus {
    /** 待退货 */
    toBeReturned = 1,
    /** 运输中 */
    transit = 2,
    /** 已收到退货 */
    ReceivedReturn = 3,
}