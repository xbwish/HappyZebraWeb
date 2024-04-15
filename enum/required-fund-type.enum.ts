/** 
 * 下单前置检查-商户订单类型（原则上只能是1，应为官方文档说以后只有1，所以我们也只是用1） 
 * */
export const enum RequiredFundType {
    /** 二级商户号订单 */
    secondMerchantOrder = 1,

    /** 非二级商户号订单  */
    notSecondMerchantOrder = 0,

    /** 两种方式皆可 */
    All = 2
}