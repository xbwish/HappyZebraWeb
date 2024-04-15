import { post } from '@/utils/http';
import { Category } from '@/model/category';
import { CollectionList } from '@/model/goods';
import { Product } from "@/model/product";

/** 商品分类 */
export const queryAllCategories = () => post<Array<Category>>('api/Good/GetAllCategories');

/** 商品详情 */
const getDetial: string = 'api/Good/GetDetial';
export const queryDetial = (params: any) => post<Product>(getDetial, params);

/** 获取随机推荐商品 */
const getGoodsRecommendList: string = 'api/Good/GetGoodsRecommendList';
export const queryGoodsRecommendList = (params: any) => post<Array<Product>>(getGoodsRecommendList, params);


/** 商品收藏关注列表 */
const goodsCollectionList: string = 'api/User/GoodscollectionList';
export const queryGoodsCollectionList = (params: any) => post<CollectionList>(goodsCollectionList, params, true);














