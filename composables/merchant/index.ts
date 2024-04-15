import { post } from '@/utils/http';


const orderPageByMerchant: string = 'api/Store/GetOrderPageByMerchant';
const orderPageByMerchantSearch: string = 'api/Store/GetOrderPageByMerchantSearch';
const storeLadingList: string = 'api/Store/StoreLadingList';
const ladingInfo: string = 'api/Store/LadingInfo';
const ladingDel: string = 'api/Store/LadingDelete';
const exec: string = 'api/Store/Lading';
const verificationPageList: string = 'api/Service/VerificationPageList';
const logDelete: string = 'api/Service/LogDelete';
const getTicketInfo: string = 'api/Service/GetTicketInfo';
const ticket: string = 'api/Service/VerificationTicket';


// 获取门店订单列表
export const getOrderPageByMerchant = (params?: any) => post(orderPageByMerchant, params, true)
export const getOrderPageByMerchantSearch = (params?: any) => post(orderPageByMerchantSearch, params, true)

// 获取店铺提货单列表
export const getStoreLadingList = (params?: any) => post(storeLadingList, params, true)

// 获取提货单详情
export const getLadingInfo = (params?: any) => post(ladingInfo, params, true)

// 提货单删除
export const ladingDelete = (params?: any) => post(ladingDel, params, true)

//店铺提单核销操作
export const ladingExec = (params?: any) => post(exec, params, true)

//门店核销的服务券列表
export const getverificationPageList = (params?: any) => post(verificationPageList, params, true)

//删除核销券
export const serviceLogDelete = (params?: any) => post(logDelete, params, true)

// 获取服务券详情准备核销
export const getServiceVerificationTicketInfo = (params?: any) => post(getTicketInfo, params, true)

//核销服务券
export const verificationTicket = (params?: any) => post(ticket, params, true)
