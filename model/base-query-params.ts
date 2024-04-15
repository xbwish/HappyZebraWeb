/** 查询基类 */
export interface BaseQueryParams {
    /** 当前页码 */
    page?: number;

    /**每页数量 */
    limit?: number;

    /** 查询条件 */
    where?: string;
}