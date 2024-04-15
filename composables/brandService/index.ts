import { get, post } from '@/utils/http';
import { Brand } from '@/model/brand';

const brandUrl: string = 'api/good/GetAllBrands';

/** 获取品牌列表 */
export const queryBrandList = (params?: { [key: string]: any }) => post<Array<Brand>>(brandUrl);