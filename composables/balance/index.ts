import { get, post } from '@/utils/http';
import { Category } from '@/model/category';
import { DefaultBankCard, BankCardOrganization, UserCash } from '@/model/member';
import { ITopUp } from '@/model';

/** 获取用户余额明细 */
export const queryBalanceList = (params: any) => post<Array<Category>>('api/User/UserBalance', params, true);

/** 用户提现列表 */
export const queryCashList = (params: any) => post<Array<Category>>('api/User/CashList', params, true);

/** 获取我的银行卡列表 */
export const queryBankCardList = (params?: any) => post<Array<DefaultBankCard>>('api/User/GetMyBankcardsList', params, true);

/** 删除银行卡 */
export const queryRemoveBankCard = (params: any) => post<any>('api/User/Removebankcard', params, true);

/** 设置默认银行卡 */
export const querySetDefaultBankCard = (params: any) => post<any>('api/User/SetDefaultBankCard', params, true);

/** 获取银行卡组织信息 */
export const queryBankCardOrganization = (params: any) => post<BankCardOrganization>('api/User/GetBankCardsOrganization', params, true);

/** 添加银行卡 */
export const queryAddBankCard = (params: any) => post<any>('api/User/AddBankCards', params, true);

/** 获取默认的银行卡 */
export const queryDefaultBankCard = (params?: any) => post<DefaultBankCard>('api/User/GetDefaultBankCard', params, true);

/** 用户提现 */
export const queryUserToCash = (params: any) => post<UserCash>('api/User/Cash', params, true);

/** 获取充值列表 */
export const queryTopUplist = () => post<Array<ITopUp>>('api/TopUp/TypeList');

/** 获取充值详情 */
export const getTopUpDetail = (params: { id: number }) => post<ITopUp>('api/TopUp/getTypeDetail', params)
