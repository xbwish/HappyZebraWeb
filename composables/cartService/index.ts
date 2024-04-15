import { post } from '@/utils/http';
import { CartAdd, Cart, CartSetProductNum } from '@/model/cart';

/** 添加购物车 */
const CART_ADD_CART_URL: string = 'api/Cart/AddCart';

/** 删除购物车商品 */
const CART_DELETE_URL = 'api/Cart/DoDelete';

/** 获取购物车列表 */
const CART_GET_LIST = 'api/Cart/GetList';

/** 设置购物车商品数量 */
const CART_SET_CART_NUM = 'api/Cart/SetCartNum';

/** 获取支付信息 */
const CHECK_PAY = 'api/Payments/CheckPay';

/** 获取店铺支付方式列表 */
const GET_PAYMENTLIST = 'api/Payments/GetList';

/** 支付接口 */
const PAY = 'api/User/Pay';

/** 获取支付单详情 */
const PAYMENT_INFO = 'api/Payments/GetInfo';

/** 获取购物车数量和商品总价格 */
const CART_NUM_MONEY = 'api/User/GetCartNumberAndMoney';


// 微信支付轮询接口
const checkOrderIsPaid = 'api/Order/CheckOrderIsPaid';

/** 添加商品到购物车 */
export const cartAddCart = (body: CartAdd) => post<number>(CART_ADD_CART_URL, body, true);

/** 删除购物车商品 */
export const cartDeleteProduct = (params: { id: number }) => post<any>(CART_DELETE_URL, params, true);

/** 获取购物车列表 */
export const cartGetCartList = (params: any = {}) => post<Cart>(CART_GET_LIST, params, true);

/** 设置购物车商品数量 */
export const cartSetCartProductNum = (params?: CartSetProductNum) => post<any>(CART_SET_CART_NUM, params, true);



/** 获取支付信息 */
export const checkPay = (params: any) => post<any>(CHECK_PAY, params, true);

/** 获取店铺支付方式列表 */
export const paymentList = (params?: any) => post<any>(GET_PAYMENTLIST, params);

/** 支付接口 */
export const queryPay = (params: any) => post<any>(PAY, params, true);

/** 获取支付单详情 */
export const paymentInfo = (params: any) => post<any>(PAYMENT_INFO, params, true);

// 微信支付轮询接口
export const queryCheckOrderIsPaid = (params: any) => post<any>(checkOrderIsPaid, params, true);

// 查询购物车商品数量和总价
export const queryCartNumAndMoney = (params?: any) => post<any>(CART_NUM_MONEY, params, true);
