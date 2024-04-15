import { OrderDistributionModelEnum, OrderTypeEnum } from "@/enum"
import { Result } from "@/model/result";
import { OrderDistributionModel, UsablePoint } from "@/model/order";
import { Option } from "@/model/option";
import { OrderDistributionModelConst } from "@/consts";
import * as submitOrderSrvice from './submit-order.service';
import * as  storeService from '@/composables/store';
import { Address } from "@/model/address";
import { Cart, CartQuery } from "@/model/cart";
import { Point } from "@/model/point";
import { CouponInfo, CouponQuery } from "@/model/coupon";
import { Store } from "@/model/store";
import { showToast  } from 'vant'

export const useSubmitOrer = () => {

    /** 查询订单支持的配送方式 */
    const queryOrderDistributionModel = async (orderType: OrderTypeEnum) => {
        const result: Result<OrderDistributionModel> = await submitOrderSrvice.queryOrderDistributionModel({ id: orderType });
        let orderDistributionModel: Array<Option> = [];

        if (!result.status) {
            showToast(result.msg);
            return orderDistributionModel;
        }
        const { isOpenMailing, isOpenHomeDelivery, isOpenSelfDelivery } = result.data;

        if (isOpenMailing) {
            orderDistributionModel.push({ label: OrderDistributionModelConst.mailing, value: OrderDistributionModelEnum.mailing });
        }

        if (isOpenHomeDelivery) {
            orderDistributionModel.push({ label: OrderDistributionModelConst.homeDelivery, value: OrderDistributionModelEnum.homeDelivery });
        }

        if (isOpenSelfDelivery) {
            orderDistributionModel.push({ label: OrderDistributionModelConst.selfDelivery, value: OrderDistributionModelEnum.selfDelivery });
        }
        return orderDistributionModel;
    }

    /** 获取默认收获地址 */
    const getUserDefaultShip = async () => {
        const result: Result<Address> = await submitOrderSrvice.GetUserDefaultShip();
        if (!result.status) {
            return {};
        }
        return result.data ||{} ;
    }

    /** 获取购物车列表 */
    const queryCartList = async (params: CartQuery) => {
        const result: Result<Cart> = await submitOrderSrvice.queryCartList(params);
        if (!result.status) {
            showToast(result.msg);
            return {};
        }

        let cart: Cart = result.data;
        cart.productNums = cart.list?.reduce((pre, item) => pre += item.nums||0, 0)

        return result.data;
    }

    /**  获取积分 */
    const queryUsablePoint = async (params: UsablePoint) => {
        const result: Result<Point> = await submitOrderSrvice.queryUsablePoint(params);
        if (!result.status) {
            //   showToast(result.msg);
            return {};
        }
        return result.data;
    }

    const queryCartCoupon = async (params: CouponQuery) => {
        const result: Result<CouponInfo> = await submitOrderSrvice.queryCartCoupon(params);
        if (!result.status) {
            return [];
        }
        return !Array.isArray(result.data?.list) ? [] : result.data.list;
    }


    const queryDefaultStore = async () => {
        const result: Result<Store> = await storeService.getDefaultStore();
        if (!result.status) {
            showToast(result.msg);
            return null;
        }
        return result.data;
    }

    return { queryOrderDistributionModel, getUserDefaultShip, queryCartList, queryUsablePoint, queryCartCoupon, queryDefaultStore };
}