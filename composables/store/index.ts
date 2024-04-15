import { get, post } from '@/utils/http';
import { Category } from '@/model/category';
import { Store } from '@/model/store';

/** 获取门店列表 */
const storeList: string = 'api/Store/GetStoreList';


const defaultStoreUrl: string = 'api/Store/GetDefaultStore';

export const queryStoreList = (params: any) => post<Array<Store>>(storeList, params);

/** 获取默认门店 */
export const getDefaultStore = (params: any = {}) => post<Store>(defaultStoreUrl, params);