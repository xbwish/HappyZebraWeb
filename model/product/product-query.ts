import { BaseQueryParams } from "../base-query-params";

export interface ProductQuery extends BaseQueryParams {
    /** 排序 字段名 + 空格 + desc 字段名 + 空格 + asc */
    order?: string;

}

export interface ProductQueryWhere {

    /**商品名称（模糊词组） */
    searchName?: string;

    /** 标签序列，逗号分隔的数组 */
    labelId?: string;

    /** 品牌序列 */
    brandId?: number | null | string;

    /** 栏目序列 */
    catId?: number | null | string;

    /** 价格结束 */
    priceTo?: number;

    /** 价格开始 */
    priceFrom?: number;

    /**商品大分类 */
    id?: number | null | string;
    [key: string]: any

}