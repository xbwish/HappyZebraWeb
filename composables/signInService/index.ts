import { post } from '@/utils/http';
import { SignInQuery, SignInResult } from '@/model/signIn';

// 获取服务列表
const getUserCheckByMonthUrl: string = 'api/CheckIn/GetUserCheckByMonth';

// 获取签到总次数
const getUserCheckCountUrl: string = 'api/CheckIn/GetUserCheckCount'

// 签到
const uerCheckInUrl: string = 'api/CheckIn/DoUserCheckIn';

/** 获取签到数据 */
export const getCheckByMonthDate = (params: SignInQuery) => post<Array<string>>(getUserCheckByMonthUrl, params, true);
/** 获取签到数据 */
export const getUserCheckCount = () => post<number>(getUserCheckCountUrl, {}, true);

/** 获取签到数据 */
export const uerCheckIn = (body: { date: string }) => post<SignInResult>(uerCheckInUrl, body, true);


