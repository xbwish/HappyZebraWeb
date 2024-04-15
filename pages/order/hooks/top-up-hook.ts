import * as balanceService from '@/composables/balance';
import { showToast } from 'vant';
import { ITopUp } from '@/model';

export const useTopUp = () => {

    const topUpState = reactive<{
        topUpDetail?: ITopUp
    }>({
        topUpDetail: undefined
    });

    const getTopUpDetail = async (params: { id: number }) => {
        const topUpRes = await balanceService.getTopUpDetail(params);
        if (!topUpRes.status) {
            showToast(topUpRes.msg || "查询充值详情异常");
            return;
        }
        topUpState.topUpDetail = topUpRes.data;
    }
    return { topUpState, getTopUpDetail }
}