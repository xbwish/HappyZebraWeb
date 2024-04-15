import { get, post } from '@/utils/http';
import { AfterSalesList,AfterSalesDetail ,Aftersalesinfo} from '@/model/member';
import { OrderDetail } from '@/model/order';

// 售后单列表
const afterSalesList: string = 'api/Order/AftersalesList';
export const queryAfterSalesList = (params?: any) => post<AfterSalesList>(afterSalesList, params, true);

// 售后单详情
const aftersalesinfo: string = 'api/Order/Aftersalesinfo';
export const queryAftersalesinfo = (params: any) => post<Aftersalesinfo>(aftersalesinfo, params, true);

// 用户发送退货包裹
const sendShip: string = 'api/Order/SendReship';
export const querySendShip = (params: any) => post<any>(sendShip, params, true);

// 获取订单详情
const orderDetail: string = 'api/Order/OrderDetails';
export const queryOrderDetail = (params: any) => post<any>(orderDetail, params, true);

// 添加售后单
const addAfterSales: string = 'api/Order/AddAftersales';
export const queryAddAfterSales = (params: any) => post<AfterSalesDetail>(addAfterSales, params, true);

// 订单评价接口
const orderEvaluate: string = 'api/User/OrderEvaluate';
export const createOrderEvaluate = (params: any) => post<OrderDetail>(orderEvaluate, params, true);


