/** 查询团购秒杀下单数量返回实体 */
export interface findLimitOrderDto {
    /** 总单数 */
    totalOrders: number;
    /** 用户总单数 */
    totalUserOrders: number;
}
/** 发票模糊查询提交实体 */
export interface getTaxCodePost {
    /** 发票抬头 */
    name: string;
}
/** 创建订单提交参数 */
export interface IcreateOrder {
    /** 区域序列 */
    areaId: number;
    /** 购物车货品数据 */
    cartIds: number;
    /** 优惠券码 */
    couponCode: string;
    /** 买家留言 */
    memo: string;
    /** 积分 */
    point: number;
    /** 收货方式,1快递物流，2同城配送，3门店自提 */
    receiptType: number;
    /** 来源平台 */
    source: number;
    /** 发票税务编号 */
    taxCode: string;
    /** 发票抬头 */
    taxName: string;
    /** 发票类型 */
    taxType: number;
    /** 用户地址库序列 */
    ushipId: number;
    /** 门店序列 */
    storeId?: number;
    /** 订单类型，1是普通订单，2是拼团订单 */
    orderType: number;
    /** 提货人姓名 */
    ladingName?: string;
    /** 提货人联系方式 */
    ladingMobile?: string;
    /** 非普通订单关联营销对象序列 */
    objectId: number;
    /** 拼团订单分组序列 */
    teamId: number;
    /** 场景值（升级微信自定义交易组件后弃用） */
    scene: number;
    /** 是否需要推单，1:需要，0:不需要 */
    requireOrder: number;
    /** requireOrder = 1时生效，0，非二级商户号订单，1，二级商户号订单，2，两种方式皆可（后续只会存在1） */
    requiredFundType: number;
    /** 跟踪ID，有效期十分钟，会影响主播归因、分享员归因等，需创建订单前调用，调用生成订单 api 时需传入该参数 */
    traceId: string;
    /** 运费 */
    costFreight: number;
}

