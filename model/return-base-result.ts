/** 返回查询列表结果的基类 */
export interface ReturnBaseResult {
    limit?: number;
    page?: number;
    totalCount?: number;
    totalPages: number;
}