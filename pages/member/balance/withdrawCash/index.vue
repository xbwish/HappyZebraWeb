<template>
  <CoreshopTitle :title="$t('余额提现')"></CoreshopTitle>
  <div style="padding-bottom: 1.5rem">
    <div class="withdrawCash-box">
      <div class="cs-border-solid-b cs-border-radius-5">
        <p
          v-if="balanceData.bankCardList.length == 0"
          @click="handleAddCard"
          class="cs-m-t-10 cs-display-flex cs-align-items-center cs-justify-content-space-between cs-border-solid-bottom cs-p-r-10 cs-p-l-10 cs-cursor-pointer"
        >
          <img class="cs-w-60 cs-h-60" src="/images/banck-icon.png" alt="" />
          <NIcon :size="20">
            <CoreshopIconChevronRight28Regular></CoreshopIconChevronRight28Regular>
          </NIcon>
        </p>
        <div
          v-else
          @click="handleShowCardList"
          class="cs-position-relative cs-cursor-pointer cs-display-flex cs-align-items-center cs-justify-content-space-between"
        >
          <div
            class="cs-display-flex cs-percent-w-100 cs-align-items-center cs-border-solid-bottom cs-p-10 cs-cursor-pointer"
          >
            <div class="cs-display-flex">
              <img class="cs-display-flex cs-margin-auto-0" :src="balanceData.defaultCard.bankLogo" alt="" />
            </div>
            <div class="cs-m-l-10 cs-font-size-12">
              <p>{{ balanceData.defaultCard.bankName }} - {{ balanceData.defaultCard.cardTypeName }}</p>
              <p>{{ balanceData.defaultCard.cardNumber }}</p>
            </div>
          </div>
          <div class="card-list-show">
            <NIcon v-if="balanceData.isShowCardList" :size="20">
              <CoreshopIconChevronUp20Regular></CoreshopIconChevronUp20Regular>
            </NIcon>
            <NIcon v-else :size="20">
              <CoreshopIconChevronDown20Regular></CoreshopIconChevronDown20Regular>
            </NIcon>
          </div>
        </div>
        <ul
          :class="[{ active: balanceData.isShowCardList }, ' card-list-box']"
          v-show="balanceData.bankCardList.length > 1"
        >
          <li
            v-for="item in balanceData.bankCardList"
            :key="item.id"
            @click="handleSelectCard(item)"
            class="cs-position-relative cs-cursor-pointer cs-display-flex cs-p-l-10 cs-p-r-10 cs-m-t-10 cs-m-b-10"
          >
            <div class="cs-display-flex cs-h-50">
              <img class="cs-display-flex cs-margin-auto-0" :src="item.bankLogo" alt="" />
            </div>
            <div class="cs-m-l-10 cs-font-size-12">
              <p>{{ item.bankName }} - {{ item.cardTypeName }}</p>
              <p>{{ item.cardNumber }}</p>
            </div>
            <div class="isSelect" v-if="balanceData.defaultCard.bankAreaId === item.id">
              <NIcon color="#e84f5d" :size="20">
                <CoreshopIconCheckmark20Filled></CoreshopIconCheckmark20Filled>
              </NIcon>
            </div>
          </li>
        </ul>
      </div>
      <div class="cs-border-radius-5 cs-m-t-5 cs-m-b-10 cs-p-10">
        <p class="explain">{{ tocashExplain() }}</p>
        <Field class="with-draw" v-model="balanceData.value" type="digit" :placeholder="$t('请输入体现金额')" />

        <p v-if="balanceData.flag" class="use-money">
          <CoreshopLanguage :text="$t('可提领佣金余额')" /> <span class="cs-color-red">NT$ {{ userData.usebalance }}</span>
        </p>
        <p v-else class="cs-color-red">
          <CoreshopLanguage :text="$t('提现金额超过可用余额')" />
        </p>
      </div>
    </div>

    <div class="btn-box">
      <div>
        <CoreshopButton
          :text="$t('确认提现')"
          @onClick="handleConfirmWithdrawal"
          bgColor="#D33123"
          round
          class="cs-percent-w-100"
          size="medium"
        >
        </CoreshopButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { NIcon } from "naive-ui";
import { useMemberStore, useConfigStore } from "@/store";
import { queryDefaultBankCard, queryBankCardList, queryUserToCash } from "@/composables/balance";
import { queryUserInfo } from "@/composables/member";
import { Result } from "@/model/result";
import { DefaultBankCard, UserCash } from "@/model/member";
import { Config } from "@/model/config";
import { IAccountInfo } from "@/model/account";
import { showToast, showSuccessToast, Field, closeToast } from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
const userData: IAccountInfo = await useMemberStore().getUserData;
const cofingData: Config = useConfigStore().getConfig;

const balanceData: UnwrapRef<{
  value?: number;
  flag: boolean;
  bankCardList: Array<DefaultBankCard>;
  isShowCardList: boolean;
  toCashMoneyLow: string;
  toCashMoneyRate: string;
  defaultCard: {
    bankAreaId: number;
    bankLogo?: string;
    bankName?: string;
    cardTypeName?: string;
    cardNumber?: string;
  };
}> = reactive({
  value: undefined,
  flag: true,
  bankCardList: [],
  isShowCardList: false,
  toCashMoneyLow: cofingData.toCashMoneyLow,
  toCashMoneyRate: cofingData.toCashMoneyRate,
  defaultCard: {
    bankAreaId: 0,
    bankLogo: undefined,
    bankName: undefined,
    cardTypeName: undefined,
    cardNumber: undefined,
  },
});

// 提现金额更新
const handleChangeValue = (val: number) => {
  balanceData.value = val;
  if (val > (userData.balance || 0)) {
    balanceData.flag = false;
  } else {
    balanceData.flag = true;
  }
};

// 提现文字说明
const tocashExplain = () => {
  if (balanceData.toCashMoneyRate && balanceData.toCashMoneyLow) {
    return (
      coreShopLang("最低提现金额") +
      balanceData.toCashMoneyLow +
      " NT$（" +
      coreShopLang("收取") +
      balanceData.toCashMoneyRate +
      " %）" +
      coreShopLang("服务费")
    );
  } else if (balanceData.toCashMoneyLow) {
    return coreShopLang("最低提现金额") + balanceData.toCashMoneyLow + " NT$";
  } else if (balanceData.toCashMoneyRate) {
    return coreShopLang("收取") + balanceData.toCashMoneyRate + " %" + coreShopLang("服务费");
  } else {
    return "";
  }
};

// 获取默认提现银行卡
const defaultBankCardQuery = async () => {
  try {
    const defaultBankCard: Result<DefaultBankCard> = await queryDefaultBankCard();
    balanceData.defaultCard.bankAreaId = defaultBankCard.data.id;
    balanceData.defaultCard.bankLogo = defaultBankCard.data.bankLogo;
    balanceData.defaultCard.bankName = defaultBankCard.data.bankName;
    balanceData.defaultCard.cardTypeName = defaultBankCard.data.cardTypeName;
    balanceData.defaultCard.cardNumber = defaultBankCard.data.cardNumber;
  } catch (error) {}
};
defaultBankCardQuery();

// 银行卡列表数据
const bankCardListRes: Result<Array<DefaultBankCard>> = await queryBankCardList();
balanceData.bankCardList = bankCardListRes.data;

// 银行卡列表下拉
const handleShowCardList = () => {
  balanceData.isShowCardList = !balanceData.isShowCardList;
};

// 选择银行卡
const handleSelectCard = (data: DefaultBankCard) => {
  if (data.bankAreaId != balanceData.defaultCard.bankAreaId) {
    let bankInfo = balanceData.bankCardList.filter((item: DefaultBankCard) => data.bankAreaId === item.bankAreaId)[0];
    balanceData.defaultCard.bankAreaId = bankInfo.id;
    balanceData.defaultCard.bankLogo = bankInfo.bankLogo;
    balanceData.defaultCard.bankName = bankInfo.bankName;
    balanceData.defaultCard.cardTypeName = bankInfo.cardTypeName;
    balanceData.defaultCard.cardNumber = bankInfo.cardNumber;
    handleShowCardList();
  }
};

// 添加银行卡跳转
const handleAddCard = () => {
  routerLink("/member/balance/bankcard");
};

// 确认提现
const handleConfirmWithdrawal = async () => {
  if (!balanceData.defaultCard) {
    showToast(coreShopLang("請選擇要提現的銀行卡"));
    return;
  }
  if (typeof balanceData.value === "undefined") {
    showToast(coreShopLang("請輸入要提現的金額"));
    return;
  }

  if (isNaN(balanceData.value)) {
    showToast(coreShopLang("請輸入要提現的金額"));
    return;
  }

  if (parseFloat(`${balanceData.value}`) <= 0) {
    showToast(coreShopLang("提現的金額不能小於等於0"));
    return;
  }

  if (parseFloat(`${balanceData.value}`) > (userData.balance || 0)) {
    showToast(coreShopLang("提現的金額不能大於可用餘額"));
    return;
  }

  if (!balanceData.flag) {
    showToast(coreShopLang("提現的金額要大於最低提現金額"));
    return;
  }
  try {
    const toCashRes: Result<UserCash> = await queryUserToCash({
      data: balanceData.value,
      id: balanceData.defaultCard.bankAreaId,
    });
    const getUserInfo: Result<any> = await queryUserInfo();
    useMemberStore().setAccountInfo(getUserInfo.data);
    balanceData.value = undefined;
    showSuccessToast(toCashRes.msg);
    setTimeout(() => {
      closeToast();
      return navigateTo("/member/center", { replace: true });
    }, 1000);
  } catch (error: any) {
    showToast(error.msg);
  }
};
</script>

<style lang="scss" scoped>
.withdrawCash-box {
  padding: 0.25rem;
  margin: 10px;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
}
.card-list-box {
  height: 0;
  transition: all 0.3s;
  overflow: overlay;
}

.card-list-box.active {
  height: 200px;
}

.isSelect,
.card-list-show {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.btn-box {
  position: absolute;
  // left: 50%;
  // bottom: 0;
  // transform: translateX(-50%);
  width: 9.5rem;
  padding: 0 0.25rem;
  font-size: 0.4rem;
  text-align: center;
  color: #fff;
  // background-color: #fff;

  div {
    // width: calc(100% - 0.5rem);
    // margin: 0 auto;
    padding: 0.15rem;
  }
  .n-button{
    
    height: 1.1rem;
  }
}
.explain {
  font-weight: 500;
  color: #000000;
}
.with-draw {
  color: #6E737D;
  box-sizing: border-box;
  padding-left: 8px !important;
  height: 1.1rem;
  border-radius: 4px;
  background: #EAECEF;
  margin: 8px 0;
}
.use-money {
  margin-top: 10px;
}
</style>
