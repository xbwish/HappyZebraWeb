import { post } from '@/utils/http'; 
import { AgentStoreInfo } from '@/model/member';

// 店铺设置
const setDistributionStore: string = 'api/Distribution/SetStore';
export const queryDistributionStore = (params: any) => post<any>(setDistributionStore, params,true);


// 获取店铺信息
const getDistributionStoreInfo: string = 'api/Distribution/GetStoreInfo';
export const queryDistributionStoreInfo = (params?: any) => post<AgentStoreInfo>(getDistributionStoreInfo, params);
