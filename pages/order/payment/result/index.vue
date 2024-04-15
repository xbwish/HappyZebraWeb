<template>
	<coreshop-title :title="$t('支付结果页面')"></coreshop-title>
	<div class="cs-p-20 cs-background-color-white pay-contaner">
		<div class="container">
			<div class="order-success__body"  v-if="!resultState.showPopup">
				<div v-if="resultState.status && resultState.paymentInfo.status === 2">
					<svg class="cs-display-block cs-margin-auto" width="80" height="80" :fill="color.accentColor">
						<use xlink:href="/images/sprite.svg#check-100"></use>
					</svg>
					<h1 class="cs-font-size-16 cs-text-align-center cs-p-20">{{$t('支付成功')}}</h1>
					<div class="cs-font-size-14 cs-text-align-center cs-m-b-20">
						{{$t('平台已收到您的钱款已通知卖家发货')}}<br />
						{{$t('平台会及时通知您的交易状态请您关注')}}
					</div>
					<CoreshopButton class="cs-display-block cs-margin-auto" size="small" :text="$t('查看详情')"
						@on-click="handleOrderDetail" round text-color="#ffffff" />
				</div>
				<div v-else-if="resultState.status && resultState.paymentInfo.status === 1">
					<svg class="cs-display-block cs-margin-auto" width="100" height="100" fill="red">
						<use xlink:href="/images/sprite.svg#cross-10"></use>
					</svg>
					<h1 class="cs-font-size-16 cs-text-align-center cs-p-20">{{$t('支付失败')}}</h1>
					<div class="cs-font-size-14 cs-text-align-center cs-m-b-10">
						{{$t('因为某些问题导致支付失败请查看详情了解具体问题')}}
					</div>
					<CoreshopButton class="cs-display-block cs-margin-auto" :text="$t('查看详情')" @on-click="handleOrderDetail"
						:bordered="true" text-color="#000" />
				</div>
				<div class="order-success" v-if="routeQuery.type">
					<ul>
						<li>
							<span class="label"> {{$t('订单号')}}</span><span>{{ resultState.paymentInfo.sourceId }}</span>
						</li>
						<li>
							<span class="label"> {{$t('创建时间')}}</span><span>{{ resultState.paymentInfo.createTime }}</span>
						</li>
						<li>
							<span class="label">{{$t('总金额')}}</span><span>NT${{ resultState.paymentInfo.money }}</span>
						</li>
						<li>
							<span class="label"> {{$t('支付方式')}}</span><span>{{ $t(handlepaymentType(resultState.paymentInfo.paymentCode))
							}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<Overlay :show="resultState.showPopup" z-index="9999">
            <div  class="popup-box">
                <Loading type="spinner"  size="70"   />
                <p style="margin-top:30px; font-size: 0.35rem;">𫉬取支付結果中...</p>
            </div>
        </Overlay>
	</div>
</template>

<script setup lang="ts">
import { color } from "@/consts";
import { UnwrapRef } from "vue";
import { paymentInfo } from "@/composables/cartService";
import { Result } from "@/model/result";
import { OrderTypeEnum, PaymentTypeEnum } from "@/enum";
import { queryGoodsRecommendList } from "@/composables/productService";
import { Product } from "@/model/product";
import { paymentCode } from "@/enum";
import { showToast,Overlay ,Loading  } from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
const resultState: UnwrapRef<{
	status: boolean;
	orderId: number;
	showPopup: boolean;
	paymentInfo: {
		money: string;
		status: number;
		type: number;
		sourceId?: string;
		createTime?: string;
		paymentCode: string;
		[key: string]: any;
	}; // 支付单详情
}> = reactive({
	status: false,
	orderId: 0,
	showPopup:true,
	paymentInfo: {
		money: "",
		status: 2,
		type: 1,
		paymentCode: "",
	},
});

const routeQuery = useRoute().query;
let time:any = '', i:number = 0;
const getPayment = async () => {
	// 微信支持。余额支付  id 为支付单id
	// out_trade_no 为网页版本支付回调的支付单Id
   
	// 金额为0 
	if (routeQuery.id && routeQuery.money == '0')
	 {		
		resultState.status = true;
		resultState.showPopup = false;
		resultState.paymentInfo.money = '0.00';
		return;
	}

	if (!routeQuery.id && !routeQuery.out_trade_no) {
		showToast(coreShopLang("支付异常"));

		setTimeout(() => {
			return navigateTo("/", { replace: true });
		}, 2000);
		return;
	}

	let paymentId: string;
	if (
		[PaymentTypeEnum.wechatpay, PaymentTypeEnum.balancepay].includes(
			Number(routeQuery.type as string) as PaymentTypeEnum
		)
	) {
		paymentId = routeQuery.id as string;
	} else {
		paymentId = routeQuery.out_trade_no as string;
	}

	const getPaymentInfoRes: Result<any> = await paymentInfo({ id: paymentId });

	if (!getPaymentInfoRes.status) {
		showToast(getPaymentInfoRes.msg || coreShopLang("支付异常"));
		setTimeout(() => {
			return navigateTo("/", { replace: true });
		}, 2000);
		return;
	}

	resultState.orderId = getPaymentInfoRes.data.sourceId;
	resultState.status = true;
	resultState.paymentInfo = getPaymentInfoRes.data;
};

getPayment();
time = setInterval(function () {
    i++;
    if (i == 5 || resultState.paymentInfo.status == 2) {
        clearInterval(time);
        resultState.showPopup = false;
        return;
    }
    getPayment();
}, 3000);
const handlepaymentType = (type: string) => {
	switch (type) {
		case "balancepay":
			return paymentCode.balancepay;
		case "alipay":
			return paymentCode.alipay;
		case "offline":
			return paymentCode.offline;
		case "wechatpay":
			return paymentCode.wechatpay;
	}
};

const handleOrderDetail = () => {
	if (
		resultState.orderId &&
		(resultState.paymentInfo.type == OrderTypeEnum.common ||
			resultState.paymentInfo.type == OrderTypeEnum.pinTuan ||
			resultState.paymentInfo.type == OrderTypeEnum.group ||
			resultState.paymentInfo.type == OrderTypeEnum.seckill ||
			resultState.paymentInfo.type == OrderTypeEnum.bargain ||
			resultState.paymentInfo.type == OrderTypeEnum.giveaway ||
			resultState.paymentInfo.type == OrderTypeEnum.solitaire ||
			resultState.paymentInfo.type == OrderTypeEnum.transactionComponent)
	) {
		navigateTo(`/member/order/detail/${resultState.orderId}`, { replace: true });
	} else if (resultState.paymentInfo.type === OrderTypeEnum.recharge) {
		navigateTo(`/member/balance/detail`, { replace: true });
	} else if (
		resultState.paymentInfo.type === OrderTypeEnum.formPay ||
		resultState.paymentInfo.type === OrderTypeEnum.formOrder
	) {
	} else if (resultState.paymentInfo.type === OrderTypeEnum.serviceOrder) {
		navigateTo(`/member/serviceOrder`, { replace: true });
	}
};

/** 商品推荐商品 */
const result: Result<Array<Product>> = await queryGoodsRecommendList();
const recommendProducts: Array<Product> = result.data?.slice(0, 8) || [];
</script>

<style lang="scss" scoped>
.pay-contaner {
	background: #ffffff;
	box-shadow: 10px 24px 54px rgb(15 13 35 / 4%);
	border-radius: 8px;
	margin: 10px;
}

.order-success {
	margin-top: 0.5rem;

	ul {
		li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 0.35rem;
			padding: 0.2rem 0;
		}
	}
}

.label {
	color: #999999;
	font-weight: 400;
	font-size: 14px;
}
.popup-box{ 
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 200px; 
    padding: 30px 0;
    text-align: center;
    background-color: #fff;
    border-radius: 15px;
}
</style>
