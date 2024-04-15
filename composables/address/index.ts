import { get, post } from '@/utils/http';
import { Address } from '@/model/address';

/** 获取用户的收货地址列表 */
const getUserShip: string = 'api/User/GetUserShip';
export const queryUserShip = (params?: any) => post<Array<Address>>(getUserShip, params, true);

/** 设置默认收货地址  此接口返回的是null 所以写了any代替 */
export const setDefaultShip = (params: {id:number}) => post('api/User/SetDefShip', params, true);

/** 收货地址删除 此接口返回的是null 所以写了any代替 */
const removeShip: string = 'api/User/RemoveShip';
export const queryRemoveShip = (params: any) => post<Address>(removeShip, params, true);

/** 获取收货地址详情 */
const shipDetail: string = 'api/User/GetShipDetail';
export const queryShipDetail = (params: any) => post<Address>(shipDetail, params, true);


/** 收货地址编辑 */
export const editShip = (params: any) => post<Address>('api/User/SaveUserShip', params, true);

/** 存储用户收货地址 */
export const addUserShip = (params: any) => post<Address>('api/User/SaveUserShip', params, true);

/** 获取区域ID */
const getAreaId: string = 'api/User/GetAreaId';
export const queryAreaId = (params: any) => post<any>(getAreaId, params);


