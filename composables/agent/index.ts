import { get, post } from '@/utils/http';
import { Category } from '~~/model/category';
import {
    AgentInfo, RecommendUser, AgentOrder,
    AgentOrderList,AgentGoodsList,AgentRanking
} from '@/model/member'; 


/** 获取代理商进度状态 */
const getAgentInfo: string = 'api/Agent/Info';
export const queryAgentInfo = (params?: any) => post<AgentInfo>(getAgentInfo, params, true);

/**申请代理商       此接口返回data数据为null  */
const applyAgent: string = 'api/Agent/ApplyAgent';
export const queryApplyAgent = (params?: any) => post<any>(applyAgent, params, true);


/** 用户推荐列表 */
const recommendUserList: string = 'api/User/Recommend';
export const queryRecommendUserList = (params: any) => post<Array<RecommendUser>>(recommendUserList, params, true);

/** 代理订单统计 */
const getAgentOrderSum: string = 'api/Agent/GetOrderSum';
export const queryAgentOrderSum = (params?: any) => post<AgentOrder>(getAgentOrderSum, params, true);

/** 我的代理订单 */
const getAgentOrder: string = 'api/Agent/MyOrder';
export const queryAgentOrder = (params: any) => post<Array<AgentOrderList>>(getAgentOrder, params, true);

/** 获取代理池商品数据 */
const getAgentGoodsPageList: string = 'api/Agent/GetGoodsPageList';
export const queryAgentGoodsPageList = (params: any) => post<AgentGoodsList>(getAgentGoodsPageList, params);


/** 获取代理商排行 */
const getAgentRanking: string = 'api/Agent/GetAgentRanking';
export const queryAgentRanking = (params: any) => post<AgentRanking>(getAgentRanking, params, true);


export * from './store';
export * from './term';
