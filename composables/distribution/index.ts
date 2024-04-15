import { post } from '@/utils/http'; 
import {
    AgentInfo, RecommendUser, AgentOrder,
    AgentOrderList,AgentGoodsList,AgentRanking
} from '@/model/member'; 


// 获取分销商进度状态
const getDistributionInfo: string = 'api/Distribution/Info';
export const queryDistributionInfo = (params?: any) => post<AgentInfo>(getDistributionInfo, params, true);

// 申请分销商 此接口返回data数据为null
const applyDistribution: string = 'api/Distribution/ApplyDistribution';
export const queryApplyDistribution = (params?: any) => post<any>(applyDistribution, params, true);


// 用户推荐列表
const recommendUserList: string = 'api/User/Recommend';
export const queryRecommendUserList = (params?: any) => post<Array<RecommendUser>>(recommendUserList, params, true);

// 获取余额明细
const getBalanceList: string = 'api/User/UserBalance';
export const queryBalanceList = (params?: any) => post<any>(getBalanceList, params, true);

//分销订单统计
const getDistributionOrderSum: string = 'api/Distribution/GetOrderSum';
export const queryDistributionOrderSum = (params?: any) => post<AgentOrder>(getDistributionOrderSum, params, true);

// 获取分销商排行
const getDistributionRanking: string = 'api/Distribution/getDistributionRanking';
export const queryDistributionRanking = (params?: any) => post<AgentRanking>(getDistributionRanking, params, true);

//我的分销订单
const getDistributionOrder: string = 'api/Distribution/MyOrder';
export const queryDistributionOrder = (params?: any) => post<Array<AgentOrderList>>(getDistributionOrder, params, true);


export * from './store';
export * from './term';
