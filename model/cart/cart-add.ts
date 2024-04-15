/** 单个货品接入购物车 */
export interface CartAdd {
    /** 单品数量 */
    nums: number;
    /** 货品序号 */
    productId: number | string;
    /** 数量类型 1是直接增加，2是赋值 */
    type: number;
    /** 普通购物还是团购秒杀/关联CartTypes */
    cartType: number;
    /** 非普通货品，关联对象序列 */
    objectId?: number;
    /** 拼团的团id */
    teamId?: number;
}