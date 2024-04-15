<template>
  <CoreshopTitle :title="$t('在线充值')"></CoreshopTitle>
  <div class="recharge-box">
    <div class="recharge-center">
      <ul>
        <li class="my-balance">
          <div>{{$t('当前金额')}}</div>
          <div>NT$ {{ getUserInfo.data.balance }}</div>
        </li>
        <li>
          <div>{{$t('储值金额')}}</div>
          <div class="rechange_money">{{ state.topUpMoney }}</div>
        </li>
      </ul>
      <div class="choose_rechange_box">
        <div class="tip">{{$t('请选择您的充值方案')}}</div>
        <div class="rechange_type">
          <div
            class="item"
            v-for="item of state.topUplist"
            :key="item.id"
            :class="{ active: item.id === state.topUpTypeId }"
            @click="onChooseTopUpType(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="note">
        <p>{{$t('充值须知')}}：</p>
        <p>1、{{$t('充值金额永不过期')}}；</p>
        <p>2、{{$t("充值一经办理概不退款")}}；</p>
        <p>3、{{$t("充值金额将无法用于提现")}}；</p>
      </div>
    </div>

    <div class="btn-box" @click="handleGoPay">
      <div>{{$t('去支付')}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryUserInfo } from "@/composables/member";
import * as balanceService from "@/composables/balance";
import { useMemberStore } from "@/store";
import { OrderTypeEnum } from "@/enum";
import { showToast } from "vant";
import { ITopUp, Result, IAccountInfo } from "@/model";
import { usePageConfig } from "@/store";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
usePageConfig().set_show_back();

const state = reactive<{
  topUplist: Array<ITopUp>;
  topUpTypeId?: number;
  topUpMoney?: number;
}>({
  topUplist: [],
  topUpTypeId: undefined,
  topUpMoney: undefined,
});

const getUserInfo: Result<IAccountInfo> = await queryUserInfo();
useMemberStore().setAccountInfo(getUserInfo.data);

const queryTopUplist = async () => {
  const topUpRes: Result<Array<ITopUp>> = await balanceService.queryTopUplist();
  if (!Array.isArray(topUpRes.data) || topUpRes.data.length === 0) {
    state.topUpTypeId = undefined;
    state.topUplist = [];
    return;
  }
  state.topUplist = topUpRes.data;
  state.topUpMoney = topUpRes.data[0].defaultMoney;
  state.topUpTypeId = topUpRes.data[0].id;
};

queryTopUplist();

const handleGoPay = () => {
  if (!state.topUpTypeId) {
    showToast(coreShopLang("请选择充值方式"));
    return;
  }

  if (typeof state.topUpMoney !== "number") {
    showToast(coreShopLang("请输入正确的充值金额"));
    return;
  }

  if (state.topUpMoney <= 0) {
    showToast(coreShopLang("充值金额不能小于等于0"));
    return;
  }

  return navigateTo(`/order/payment?recharge=${state.topUpTypeId}&type=${OrderTypeEnum.recharge}`);
};

const onChooseTopUpType = (topUpType: ITopUp) => {
  state.topUpTypeId = topUpType.id;
  state.topUpMoney = topUpType.defaultMoney;
};
</script>

<style lang="scss" scoped>
.recharge-box {
  padding-top: 0.1rem;
  background-color: #ffff;
  margin: 0.25rem 0.25rem 0.5rem 0.25rem;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  .recharge-center {
    ul {
      border-radius: 10px;
      color: #292B2E;
      li {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0.4rem;
        align-items: center;
        font-size: 0.4rem;
        background-color: #fff;
        div:nth-of-type(1) {
          // margin-right: 0.2rem;
        }

        div:nth-of-type(2) {
          // flex: 1;
        }
      }
      .my-balance{
        color: #292B2E;
        font-family: "PingFang HK";
        font-weight: 500;
      }
    }
  }
  .note {
    font-size: 0.3rem;
    padding: 0 0.4rem 0.6rem 0.4rem;
    line-height: 0.625rem;
    color: #999999;
    p{
      line-height: 0.45rem;
    }
  }

  .btn-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 9.5rem;
    padding: 0.5rem 0.4rem;
    font-size: 0.4rem;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    div {
      width: calc(100% - 0.5rem);
      margin: 0 auto;
      padding: 0.25rem;
      background-color: #D33123;
      border-radius: 20px;
    }
    .n-button{
      height: 1.125rem;
    }
  }
}
.rechange_money {
  // border-bottom: 0.5px solid #e7e7e8;
  line-height: 25px;
  color: #D33123;
}
.choose_rechange_box {
  padding: 0.25rem 0.4rem;
  .tip {
    color: #292B2E;
    font-family: "PingFang HK";
    font-size: 0.3rem;
    // font-weight: 600;
  }
  .rechange_type {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.25rem;
    justify-content: space-between;
    .item {
      background: #f3f1f1;
      border-radius: 4px;
      padding: 10px 0px;
      width: 47%;
      text-align: center;
      margin-bottom: 10px;
      border: 1px solid transparent;
      color: #292B2E;
      &.active {
        border: 1px solid #D33123;
        background-color: #D33123;
        color: #ffffff;
      }
    }
  }
}
</style>
