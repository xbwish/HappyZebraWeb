import { post } from '@/utils/http';
import { UserCoupon, ICouponList } from '@/model/member';

// 用户已领取的优惠券列表
const userCoupon: string = 'api/Coupon/UserCoupon';
export const queryUserCoupon = (params: any) => post<UserCoupon>(userCoupon, params, true);

// 可领取优惠券列表
const couponList: string = 'api/Coupon/CouponList';
export const queryCouponList = (params: any) => post<Array<ICouponList>>(couponList, params);

// 用户领取优惠券
export const receiveCoupon = (params: { id: number }) => post<any>('api/Coupon/GetCoupon', params, true);

