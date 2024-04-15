import { get, post } from '@/utils/http';
import { Category } from '~~/model/category';
import { AgentTeamSum } from '@/model/member';

// 获取我的上级邀请人
const getMyInvite: string = 'api/User/GetMyInvite';
export const queryMyInvite = (params?: any) => post<any>(getMyInvite, params, true);


// 代理团队统计
const getAgentTeamSum: string = 'api/Agent/GetTeamSum';
export const queryAgentTeamSum = (params?: any) => post<AgentTeamSum>(getAgentTeamSum, params, true);

