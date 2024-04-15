import { post } from '@/utils/http';
import { Address } from '@/model/address';
import { CreateOrder, OrderDistributionModel, UsablePoint } from '@/model/order';
import { OrderTypeEnum } from '@/enum';
import { Cart, CartQuery } from '@/model/cart';
import { Point } from '@/model/point';
import { CouponInfo, CouponQuery } from '@/model/coupon';

const cartList = 'api/Cart/GetList';
const CRESTE_ORDER = 'api/Order/CreateOrder';
const UERDEFAULTSHIP = 'api/User/GetUserDefaultShip';
const orderDistributionModel = 'api/Order/GetOrderDistributionModel';
const getCartCoupon = 'api/Cart/GetCartAvailableCoupon';
const usablePoint = 'api/User/GetUserPoint';

/** 生成订单 */
export const createOrder = (params: CreateOrder) => post<any>(CRESTE_ORDER, params, true);

/** 获取用户默认收货地址 */
export const GetUserDefaultShip = (params?: any) => post<Address>(UERDEFAULTSHIP, params, true);

/**
 * 获取不同类型营销下单支持的配送方式
 */

export const queryOrderDistributionModel = (params?: { id: OrderTypeEnum }) => post<OrderDistributionModel>(orderDistributionModel, params, true);
/**
 * 根据购物车已有数据获取能够使用的优惠券
 */
export const queryCartCoupon = (params?: CouponQuery) => post<CouponInfo>(getCartCoupon, params, true);

/** 获取购物车列表 */

export const queryCartList = (params?: CartQuery) => post<Cart>(cartList, params, true);

/** 判断用户下单可以使用多少积分 */

export const queryUsablePoint = (params: UsablePoint) => post<Point>(usablePoint, params, true,undefined,`${usablePoint}${new Date().getTime()}`);


























