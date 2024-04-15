import { post } from '@/utils/http';
import { Product, CommentData, ProductData, ProductQuery } from '@/model/product';

/** 查询商品列表 */
export const queryGetGoodsPageList = (params: ProductQuery, isToken: boolean = false) => post<ProductData>('api/Good/GetGoodsPageList', params, isToken,undefined,`api/Good/GetGoodsPageList/${params.where}`);

/** 查看商品详情 */
export const queryProductDetial = (params: any) => post<Product>('api/Good/GetDetial', params).then(res => {
    let goodDetail: Product = res.data;
    if (goodDetail && goodDetail.images) {
        goodDetail.imageArr = goodDetail.images?.split(',');
    }
    res.data = goodDetail;
    return res;
});

/** 查询详情 带上token */
export const queryGoodsDetailByToken = (params: { [key: string]: any }) => post('api/Good/GetDetialByToken', params, true).then(res => {
    let goodDetail: Product = res.data;
    if (goodDetail && goodDetail.images) {
        goodDetail.imageArr = goodDetail.images?.split(',');
    }
    res.data = goodDetail;
    return res;
});

/** 获取随机推荐商品  */
export const queryGoodsRecommendList = (params: { id: number, data: boolean } = { id: 20, data: true }) => {
    return post<Array<Product>>('api/Good/GetGoodsRecommendList', params)
}

/** 获取商品评论信息 */
export const queryGoodComment = (params: { page: number | string, limit: number, id: number }) => {
    return post<CommentData>('api/Good/GetGoodsComment', params).then(res => {
        if (res.data?.list) {
            res.data.list = res.data.list.map(item => ({ ...item, commentImage: item.images?.split(',') || [] }))
        }
        return res;
    });
}

/** 获取商城关键词说明 */
export const queryServiceDescription = (params?: ProductQuery) => post<any>('api/Common/GetServiceDescription', params);

/** 商品收藏 关注/取消 */
export const queryGoodsCollection = (params: any) => post<any>('api/User/GoodsCollectionCreateOrDelete', params, true);

/** 添加商品浏览足迹 */
export const addGoodsBrowsing = (params: any) => post<any>('api/User/AddGoodsBrowsing', params, true);

/** 发票模糊查询 */
export const queryInvoiceInfo = (params: any) => post<any>('api/Order/GetTaxCode', params, true);

/** 各类型商品查询查询 */
export const queryGoodsByType = (params: any) => post<any>('api/good/GetGoodsByType', params, false, null, `api/good/GetGoodsByType/${params.type}`);
/** 获取全局促销列表 */
export const queryPromotionList = (params: any) => post<any>('api/Promotion/GetPromotionList', params, false);


