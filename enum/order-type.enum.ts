/**
 * 商品类型  决定 订单类型
 * */
export enum OrderTypeEnum {
    /** 普通 */
    common = 1,
    /** 拼团 */
    pinTuan = 2,
    /** 团购 */
    group = 3,
    /** 秒杀 */
    seckill = 4,
    /** 砍价 */
    bargain = 6,
    /** 赠品 */
    giveaway = 7,
    /** 接龙 */
    solitaire = 8,
    /** 微信交易组件 */
    transactionComponent = 10,
    //充值
    recharge = 201,
    //服务订单
    serviceOrder = 501,
    //表单付款码
    formPay = 301,
    //表单订单
    formOrder = 302,
}


/** 支付方式 */
export enum paymentsTypes {
    /** 微信支付 */
    wechatpay = 1,
    /** 支付宝支付 */
    alipay = 2,
    /** 线下支付 */
    offline = 3,
    /** 余额支付 */
    balancepay = 4,
}
/** 支付方式 */
export enum paymentCode {
    /** 微信支付 */
    'wechatpay' = '微信支付',
    /** 支付宝支付 */
    'alipay' = '支付宝支付',
    /** 线下支付 */
    'offline' = '线下支付',
    /** 余额支付 */
    'balancepay' = '余额支付',
}

/** 服务订单下面服务券状态 */
export enum ServicesTicketsStatus {
    /** 正常 */
    normal = 0,
    /** 过期 */
    overdue = 1,
    /** 作废 */
    cancellation = 2,
    /** 已核销 */
    verification = 3,
}