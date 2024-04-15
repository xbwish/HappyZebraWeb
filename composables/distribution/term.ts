import { post } from '@/utils/http';
import { IteamSum } from '@/model/member';

// 获取我的上级邀请人
const getMyInvite: string = 'api/User/GetMyInvite';
export const queryMyInvite = (params?: any) => post<any>(getMyInvite, params, true);

//分销团队统计
const getDistributionTeamSum: string = 'api/Distribution/GetTeamSum';
export const queryDistributionTeamSum = (params?: any) => post<IteamSum>(getDistributionTeamSum, params, true);
