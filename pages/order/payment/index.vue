<template>
  <NuxtLayout name="personal-center">
    <div style="padding-bottom: 1.5rem">
      <coreshop-title :title="$t('支付页面')"></coreshop-title>
      <div class="cs-background-color-white cs-p-20 cs-m-b-10 container">
        <h3 class="card-title">{{$t('支付信息')}}</h3>
        <table class="table checkout__totals cs-percent-w-100">
          <tbody class="checkout__totals-products">
            <tr>
              <td class="label">{{$t('订单类型')}}</td>
              <td>
                <span
                  v-if="
                    paymentState.type == OrderTypeEnum.common ||
                    paymentState.type == OrderTypeEnum.pinTuan ||
                    paymentState.type == OrderTypeEnum.group ||
                    paymentState.type == OrderTypeEnum.seckill ||
                    paymentState.type == OrderTypeEnum.bargain ||
                    paymentState.type == OrderTypeEnum.giveaway ||
                    paymentState.type == OrderTypeEnum.solitaire ||
                    paymentState.type == OrderTypeEnum.transactionComponent
                  "
                  >{{$t('商品订单')}}</span
                >
                <span v-if="paymentState.type == OrderTypeEnum.recharge">{{$t('充值订单')}}</span>
                <span v-if="paymentState.type == OrderTypeEnum.formPay">{{$t('表单订单')}}</span>
                <span v-if="paymentState.type == OrderTypeEnum.formOrder">{{$t('付款码')}}</span>
                <span v-if="paymentState.type == OrderTypeEnum.serviceOrder">{{$t('服务订单')}}</span>
              </td>
            </tr>
            <template
              v-if="
                paymentState.type == OrderTypeEnum.common ||
                paymentState.type == OrderTypeEnum.pinTuan ||
                paymentState.type == OrderTypeEnum.group ||
                paymentState.type == OrderTypeEnum.seckill ||
                paymentState.type == OrderTypeEnum.bargain ||
                paymentState.type == OrderTypeEnum.giveaway ||
                paymentState.type == OrderTypeEnum.solitaire ||
                paymentState.type == OrderTypeEnum.transactionComponent
              "
            >
              <tr>
                <td class="label">{{$t('订单号')}}</td>
                <td>
                  <span v-for="(item, index) in paymentState.orderInfo?.rel" :key="index">{{
                    item.sourceId || ""
                  }}</span>
                </td>
              </tr>
              <tr>
                <td class="label">{{$t('订单金额')}}</td>
                <td class="cs-font-size-22 cs-color-red">NT${{ paymentState.orderInfo?.money }}</td>
              </tr>
            </template>

            <template v-else-if="paymentState.type == OrderTypeEnum.recharge">
              <tr>
                <td class="label">{{$t('充值规则')}}</td>
                <td class="cs-font-size-22">{{ topUpState.topUpDetail?.title }}</td>
              </tr>
              <tr>
                <td class="label">{{$t('支付金额')}}</td>
                <td class="cs-font-size-22 cs-color-red">NT${{ topUpState.topUpDetail?.defaultMoney }}</td>
              </tr>
              <tr v-if="topUpState.topUpDetail?.giftMoney || 0 > 0">
                <td class="label">{{$t('赠送金额')}}</td>
                <td class="cs-font-size-22">NT${{topUpState.topUpDetail!.giftMoney }}</td>
              </tr>
              <tr v-if="topUpState.topUpDetail?.giftPoint || 0 > 0">
                <td class="label">{{$t('赠送积分')}}</td>
                <td class="cs-font-size-22">{{topUpState.topUpDetail!.giftPoint}}</td>
              </tr>
            </template>

            <template v-else-if="paymentState.type == OrderTypeEnum.serviceOrder">
              <tr>
                <td  class="label">{{$t('购买服务')}}</td>
                <td>{{ paymentState.serviceInfo.title || "" }}</td>
              </tr>
              <tr>
                <td  class="label">{{$t('服务金额')}}</td>
                <td class="cs-font-size-22 cs-color-red">NT${{ paymentState.serviceInfo.money || "" }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="card-body cs-p-20 cs-background-color-white container pay-type">
        <div class="payment-methods">
          <h3 class="card-title cs-m-b-10">{{$t('支付方式')}}</h3>
          <ul class="payment-methods__list">
            <!-- <template v-for="item in paymentState.payList" :key="item.id">
              <li
                class="payment-methods__item cs-m-b-15"
                v-if="!(paymentState.type == OrderTypeEnum.recharge && item.code == 'balancepay')"
              >
                <label class="payment-methods__item-header" @change="handleSelectPay(item)">
           
                  <span class="payment-methods__item-title cs-display-flex cs-align-items-center cs-m-l-10 cs-m-r-10">
                    <img class="cs-w-25 cs-m-r-5" :src="'/images/' + item.code + '.png'" alt="" />{{ item.name }}
                  </span>
                  <span class="cs-color-yellow cs-m-l-10" v-if="item.id === PaymentTypeEnum.balancepay"
                    >{{$t('当前余额')}}：{{ paymentState.info.balance }}{{$t('元')}}</span
                  >
                  <span class="payment-methods__item-radio input-radio">
                    <span class="input-radio__body">
                      <input class="input-radio__input" name="checkout_payment_method" type="radio" />
                      <span class="input-radio__circle"></span>
                    </span>
                  </span>
                </label>
              </li>
            </template> -->
           <RadioGroup @change="handleSelectPay" v-model="checkRadio">
              <template v-for="item in paymentState.payList" :key="item.id">
                <Cell :border="false" v-if="!(paymentState.type == OrderTypeEnum.recharge && item.code == 'balancepay')" @click="checkRadio = item.code">
                    <template #title>
                      <span class="payment-methods__item-title cs-display-flex cs-align-items-center cs-m-r-10">
                        <img class="cs-w-25 cs-m-r-5" :src="'/images/' + item.code + '.png'" alt="" />{{ $t(item.name) }}
                      </span>
                      <span class="cs-color-yellow cs-m-l-10" v-if="item.id === PaymentTypeEnum.balancepay">{{$t('當前餘額')}}：{{ paymentState.info.balance }}{{$t('元')}}</span>
                    </template>
                    <template #right-icon>
                      <Radio :name="item.code" checked-color="#D33123"/>
                    </template>
                </Cell>
              </template>
            </RadioGroup> 

          </ul>
        </div>
        
      </div>
      <div class="pay_tip">{{$t('注：如果您在支付中選擇的支付方式不適合或異常，請在此處選擇其他支付方式 ')}}</div>
      <div class="btn cs-display-flex">
        <CoreshopButton
          size="medium"
          class="cs-flex-1"
          round
          bg-color="#D33123"
          @on-click="handlerPay"
          :text="$t('立即支付')"
        />
      </div>
      <CoreshopModal
        class="cs-percent-w-90"
        :title="$t('商家微信支付二维码')"
        :showModal="paymentState.showModal"
        @handleModalCancel="handleModalCancel"
      >
        <img
          class="cs-percent-w-80 cs-display-block cs-margin-auto cs-p-20"
          :src="'data:image/png;base64,' + paymentState.payWxImg"
          alt=""
        />
      </CoreshopModal>
    
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { paymentList, queryPay, queryCheckOrderIsPaid } from "@/composables/cartService";
import { queryServiceDetail } from "@/composables/activity";
import { Result } from "@/model/result";
import { OrderTypeEnum, PaymentTypeEnum } from "@/enum";
import { useMemberStore } from "@/store";
import { ServiceDetail } from "@/model/activity";
import { queryPaymentsCheckpay } from "@/composables/order";
import { showLoadingToast, closeToast, showToast, showSuccessToast, RadioGroup,CellGroup,Radio,Cell } from "vant";
import { IAccountInfo } from "@/model/account";
import { PayType } from "@/model";
import { useTopUp } from "../hooks";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
  layout: false,
});

let times: any = null; // 支付轮询，用作注销
const route = useRoute();
const { topUpState, getTopUpDetail } = useTopUp();
const checkRadio = ref('');
const paymentState: UnwrapRef<{
  payList: Array<PayType>;
  info: IAccountInfo;
  orderId: any;
  type: number;
  showModal: boolean;
  payWxImg: string;
  paymentId: string;
  time: number; // 10分钟倒计时
  code: string;
  selectPayType?: PaymentTypeEnum;
  serviceInfo: any;
  orderInfo: any;
  isWechat?: boolean;
}> = reactive({
  orderId: route.query.orderId,
  type: Number(route.query.type),
  payList: [],
  info: await useMemberStore().getUserData,
  showModal: false,
  payWxImg: "",
  paymentId: "",
  time: 600,
  code: "",
  selectPayType: undefined,
  serviceInfo: {},
  orderInfo: {},
  isWechat: isWechat(),
});

let paymentButtonDisable: boolean = false;

// 获取订单详情
const getOrderInfo = async () => {
  let data = {
    ids: paymentState.orderId,
    paymentType: paymentState.type,
  };
  const getPaymentsCheckpay: Result<any> = await queryPaymentsCheckpay(data);
  paymentState.orderInfo = getPaymentsCheckpay.data;
};

//获取服务详情
const getServiceDetail = async () => {
  const checkPayResult: Result<ServiceDetail> = await queryServiceDetail({
    id: useRoute().query.serviceId,
  });
  if (!checkPayResult.status || !checkPayResult.data) {
    return navigateTo("/");
  }
  paymentState.serviceInfo = checkPayResult.data;
};

// 商品订单
if (
  route.query.orderId &&
  [
    OrderTypeEnum.common,
    OrderTypeEnum.pinTuan,
    OrderTypeEnum.group,
    OrderTypeEnum.seckill,
    OrderTypeEnum.bargain,
    OrderTypeEnum.giveaway,
    OrderTypeEnum.solitaire,
    OrderTypeEnum.transactionComponent,
  ].includes(paymentState.type)
) {
  getOrderInfo();
}
// 充值订单 获取用户id
else if (route.query.type && paymentState.type == OrderTypeEnum.recharge) {
  if (!route.query.recharge) {
    showToast(coreShopLang("充值异常"));
  } else {
    getTopUpDetail({ id: Number(route.query.recharge) });
  }
} else if (
  /** 表单提交 */
  route.query.formId &&
  (paymentState.type == OrderTypeEnum.formPay || paymentState.type == OrderTypeEnum.formOrder)
) {
  // 表单订单 id传到订单上
  paymentState.orderId = "" + route.query.formId;
} else if (paymentState.type == OrderTypeEnum.serviceOrder) {
  getServiceDetail();
}

/** 余额支付 */
const balancepayToPay = async (data: { [key: string]: any }) => {
  const payResult: Result<any> = await queryPay(data);
  if (!payResult.status) {
    paymentButtonDisable = false;
    showToast(payResult.msg);
    return;
  }
  closeToast();
  useMemberStore().setBalance();
   showSuccessToast({message:payResult.msg,duration:2000});
   setTimeout(() => {
   closeToast();
   return navigateTo(`/order/payment/result?id=${payResult.data.paymentId}&type=${PaymentTypeEnum.balancepay}`, {
        replace: true,
      });
   }, 1000);
};

// 缘界支付
const ecpayToPay = async (data: { [key: string]: any }) => {
  const payResult: Result<any> = await queryPay(data);
  if (!payResult.status) {
    paymentButtonDisable = false;
    showToast(payResult.msg);
    return;
  }

  window.location.href = `http://www.jlt1888.cc/AioCheckOut.aspx?parameterName=${JSON.stringify(payResult.data)}`
};

/** 微信支付 */
const wechatpay = async (data: { [key: string]: any }) => {
  const queryPayResult: Result<any> = await queryPay(data);

  if (!queryPayResult.status) {
    paymentButtonDisable = false;
    showToast(queryPayResult.msg);
    return;
  }

  if (!isWechat()) {
    paymentState.payWxImg = queryPayResult.otherData;
    paymentState.showModal = true;
    paymentState.paymentId = queryPayResult.data.paymentId;
    times = setInterval(async () => {
      const checkOrderPaidResult = await queryCheckOrderIsPaid({ id: paymentState.orderId });

      if (!checkOrderPaidResult.status) {
        clearInterval(times);
        paymentButtonDisable = false;
        showToast(checkOrderPaidResult.msg);
        return;
      }

      if (checkOrderPaidResult.status && checkOrderPaidResult.data) {
        clearInterval(times);
        showSuccessToast({message:coreShopLang('支付成功'),duration:2000});
        setTimeout(() => {
        closeToast();
        return navigateTo(`/order/payment/result?id=${paymentState.paymentId}&type=${PaymentTypeEnum.wechatpay}`, {
                replace: true,
            });
        }, 1000);
      }
    }, 1000);

    /** 公众号微信支付 */
  } else {
    // 一下为ts 提示的，不用理会
    if (typeof window.WeixinJSBridge === "undefined") {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady(queryPayResult.data), false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", onBridgeReady(queryPayResult.data));
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady(queryPayResult.data));
      }
    } else {
      onBridgeReady(queryPayResult.data);
    }
  }
};

function onBridgeReady(data: { [key: string]: any }) {
  window.WeixinJSBridge.invoke(
    "getBrandWCPayRequest",
    {
      debug: false,
      appId: data.appId, //公众号名称，由商户传入
      timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
      nonceStr: data.nonceStr, //随机串
      package: data.package,
      signType: data.signType, //微信签名方式：
      paySign: data.paySign, //微信签名
      jsApiList: ["chooseWXPay"],
    },
    function (res: any) {
      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        //支付成功后的操作
        //支付成功
        showLoadingToast({ message: coreShopLang("支付中"), forbidClick: true, duration: 4000 });
        setTimeout(() => {
          closeToast();
          return navigateTo(`/order/payment/result?id=${data.paymentId}&type=${PaymentTypeEnum.wechatpay}`, {
            replace: true,
          });
        }, 3000);
      } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        //取消支付的操作
        //取消支付
        paymentButtonDisable = false;
      } else {
        //支付失败
        showToast(coreShopLang("支付失败请重新支付"));
        paymentButtonDisable = false;
      }
    }
  );
}

/** 支付宝支付 */
const alipay = async (data: { [key: string]: any }) => {
  const queryPayResult: Result<any> = await queryPay(data);

  if (!queryPayResult.status) {
    paymentButtonDisable = false;
    showToast(queryPayResult.msg);
    return;
  }
  document.write(queryPayResult.data);
};

const getpaymentList: Result<Array<PayType>> = await paymentList();
paymentState.payList = paymentState.isWechat
  ? getpaymentList.data.filter((item: PayType) => item.code != "alipay")
  : getpaymentList.data;

// 立即支付
const handlerPay = async () => {
  if (!paymentState.selectPayType) {
    showToast(coreShopLang("请选择支付方式"));
    return;
  }
  if (paymentButtonDisable) {
    return;
  }

  paymentButtonDisable = true;
  // todo
  let data: any = {
    payment_code: paymentState.code,
    payment_type: paymentState.type,
    params: {},
  };
  data["ids"] = [
    OrderTypeEnum.common,
    OrderTypeEnum.pinTuan,
    OrderTypeEnum.group,
    OrderTypeEnum.seckill,
    OrderTypeEnum.bargain,
    OrderTypeEnum.giveaway,
    OrderTypeEnum.solitaire,
    OrderTypeEnum.transactionComponent,
    OrderTypeEnum.serviceOrder,
  ].includes(paymentState.type)
    ? paymentState.orderId
    : paymentState.info.id;

  // 判断订单支付类型
  if (paymentState.type == OrderTypeEnum.recharge) {
    data.ids = Number(route.query.recharge);
    data.params = { money: topUpState.topUpDetail?.defaultMoney };
  } else if (paymentState.type == OrderTypeEnum.formPay || paymentState.type == OrderTypeEnum.formOrder) {
    data.ids = paymentState.orderId;
    data.params = {};
  }

  // 余额支付
  if (PaymentTypeEnum.balancepay === paymentState.selectPayType) {
    showLoadingToast({
      message: coreShopLang("支付中"),
      duration: 0,
    });
    balancepayToPay(data);
    return;
  }
  // 缘界支付
  if (PaymentTypeEnum.ecpay === paymentState.selectPayType) {
    showLoadingToast({
      message: coreShopLang("支付中"),
      duration: 0,
    });
    ecpayToPay(data);
    return;
  }
  /** 微信支付 */
  if (PaymentTypeEnum.wechatpay === paymentState.selectPayType) {
    data["params"]["trade_type"] = isWechat() ? "JSAPI_OFFICIAL" : "MWEB";
    wechatpay(data);
    return;
  }
  /** 支付宝 */
  if (PaymentTypeEnum.alipay === paymentState.selectPayType) {
    data["params"]["trade_type"] = "MWEB";
    alipay(data);
    return;
  }
};

const handleModalCancel = () => {
  clearInterval(times);
  paymentState.showModal = false;
  paymentButtonDisable = false;
};

const handleSelectPay = (pay: string) => {
  paymentState.code = pay;
  paymentState.selectPayType = paymentState.payList.filter(item=> item.code == pay)[0].id
};
</script>

<style lang="scss" scoped>
.checkout__totals-products {
  td {
    padding: 6px 0;
    width: 50%;
    &.label {
      color: #6d7271;
    }
  }

  td:nth-of-type(2) {
    text-align: right;
  }

}

.payment-methods {
  li {
    line-height: 30px;
    .payment-methods__item-header {
      display: flex;
      align-items: center;

      .input-radio__body {
        display: flex;
      }
    }
  }
}

.btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 9.5rem;
  padding: 0.25rem;
  div {
    padding: 0.25rem;
    font-size: 0.35rem;
    color: #fff;
    background-color: #e84f5d;
    text-align: center;
    border-radius: 20px;
  }
  .n-button{
    height: 1.125rem;
  }
}
.container {
  padding: 16px 12px 8px 12px !important;
  box-shadow: 10px 24px 54px rgb(15 13 35 / 4%);
  border-radius: 8px;
  margin: 10px;
  &.pay-type {
    margin-top: 20px;
  }
}
.pay_tip {
  font-size: 12px;
  color: #979797;;
  margin:4px 10px;
}
.card-title{
  color: #292B2E;
  font-family: "PingFang HK";
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 4px;
}
.container:nth-of-type(2){
  margin-top: 0 !important;
}

:deep(.van-cell__title){
  display: flex;
}
:deep(.van-cell){
  padding-left: 0;
  padding-right: 0;
}
</style>
