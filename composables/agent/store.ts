import { get, post } from '@/utils/http';
import { Category } from '~~/model/category';
import { AgentStoreInfo } from '@/model/member';

//获取店铺信息
const getAgentStoreInfo: string = 'api/Agent/GetStoreInfo';
export const queryAgentStoreInfo = (params?: any) => post<AgentStoreInfo>(getAgentStoreInfo, params);


// 店铺设置
const setAgentStore: string = 'api/Agent/SetStore';
export const queryAgentStore = (params: any) => post<any>(setAgentStore, params, true);

