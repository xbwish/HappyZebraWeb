import { post } from '@/utils/http';
import { IOrderStatusSum, IOrderList, OrderDetail, ServiceOrder, ServiceOrderDetail, ServicesTickets } from '@/model/order';
import { orderStatus, orderPayStatus, orderShipStatus, orderConfirmStatus } from '~~/enum/order.enum'

// 获取全部订单列表
const getOrderList: string = 'api/Order/GetOrderList';
export const queryOrderList = (params: any) => post<IOrderList>(getOrderList, params, true);

// 获取订单不同状态的数量
const getOrderStatusSum: string = 'api/Order/GetOrderStatusNum';
export const queryOrderStatusSum = (params?: any) => post<IOrderStatusSum>(getOrderStatusSum, params, true);

// 获取订单详情
const orderDetail: string = 'api/Order/OrderDetails';
export const queryOrderDetail = (params?: any) => post<OrderDetail>(orderDetail, params, true);

// 根据订单id取拼团信息，用在订单详情页
const getOrderPinTuanTeamInfo: string = 'api/PinTuan/GetPinTuanTeam';
export const queryOrderPinTuanTeamInfo = (params: any) => post<any>(getOrderPinTuanTeamInfo, params, true);

// 确认收货
const confirmOrder: string = 'api/Order/OrderConfirm';
export const queryConfirmOrder = (params?: any) => post(confirmOrder, params, true);

// 获取个人服务订单列表
const getUserServicesPageList: string = 'api/User/GetServicesPageList';
export const queryUserServicesPageList = (params: any) => post<ServiceOrder>(getUserServicesPageList, params, true);

//获取单个服务订单
const getServicesById: string = 'api/User/GetServicesById';
export const queryServicesById = (params?: any) => post<ServiceOrderDetail>(getServicesById, params, true);

//获取单个服务订单下面服务券
const getServicesTickets: string = 'api/User/GetServicesTickets';
export const queryServicesTickets = (params?: any) => post<Array<ServicesTickets>>(getServicesTickets, params, true);

// 订单状态
export const handleStatusText = (item: any) => {
    let text: string = "";
    switch (item.status) {
        case orderStatus.normal:

            if (item.payStatus === orderPayStatus.no) {
                text = '待付款';
            } else if (item.payStatus >= orderPayStatus.yes && item.shipStatus === orderShipStatus.no) {
                text = '待发货';
            } else if (item.payStatus >= orderPayStatus.yes && item.shipStatus === orderShipStatus.partialNo) {
                text = '部分发货';
            } else if (item.payStatus >= orderPayStatus.yes && item.shipStatus >= orderShipStatus.yes && item.confirmStatus === orderConfirmStatus.receiptNotConfirmed) {
                text = '已发货';
            } else if (item.payStatus >= orderPayStatus.yes && item.shipStatus >= orderShipStatus.yes && item.confirmStatus >= orderConfirmStatus.confirmReceipt && item.isComment === false) {
                text = '待评价';
            } else if (item.payStatus >= orderPayStatus.yes && item.shipStatus >= orderShipStatus.yes && item.confirmStatus >= orderConfirmStatus.confirmReceipt && item.isComment === true) {
                text = '已评价';
            }

            break;
        case orderStatus.complete:
            text = '已完成';
            break;
        case orderStatus.cancel:
            text = '已取消';
            break;
    }
    return text;
}


//获取支付信息
const getPaymentsCheckpay: string = 'api/Payments/CheckPay';
export const queryPaymentsCheckpay = (params: any) => post<Array<any>>(getPaymentsCheckpay, params, true);
