<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('添加金融卡')"></CoreshopTitle>
    <div>
      <div class="balance-detail-box cs-m-t-10">
        <ul class="detail-list-box clr" v-if="cardListData.list.length > 0">
          <li v-for="item in cardListData.list" :key="item.id" class="fl">
            <SwipeCell>
              <div class="card-item">
                <div>
                  <img class="cs-percent-w-100 cs-display-flex" :src="item.bankLogo" alt="" />
                </div>
                <div class="cs-font-size-12" style="text-align: left;width: 100%;">
                  <p style="text-align: left;"><b>{{ item.accountName }}</b> &nbsp;&nbsp;&nbsp;{{ item.cardNumber }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ item.accountBank }}</p>
                </div>
                <div class="isdefault cs-font-size-14" v-if="item.isdefault">
                  <CoreshopLanguage text="默认" />
                </div>
              </div>

              <template #right>
                <div class="actions">
                  <div class="set-default" @click="handleSetDefault(item)">{{$t('设为默认')}}</div>
                  <div class="delete" @click="handleDeleteCard(item.id!)">{{$t('删除')}}</div>
                </div>
              </template>
            </SwipeCell>
          </li>
          <div class="add-btn">
            <CoreshopButton
              class="cs-display-flex cs-p-t-15 cs-p-b-15 cs-percent-w-100"
              bgColor="#D33123"
              round
              size="medium"
              @click="handleAddCard"
            >
              <CoreshopLanguage :text="$t('点我添加金融卡')" />
            </CoreshopButton>
        </div>
        </ul>
        <div v-else class="empty-content cs-m-t-10 ">
          <CoreshopNoData :text="$t('暂无金融卡')" class="van-empty"></CoreshopNoData>
          <div class="add-btn">
            <CoreshopButton
              class="cs-display-flex cs-p-t-15 cs-p-b-15 cs-percent-w-100"
              bgColor="#D33123"
              round
              size="medium"
              @click="handleAddCard"
            >
              <CoreshopLanguage :text="$t('点我添加金融卡')" />
            </CoreshopButton>
          </div>
        </div>
      </div>

      <Popup
        v-model:show="cardListData.addShowModalRef"
        :round="true"
        :safe-area-inset-bottom="true"
        position="bottom"
        @click-overlay="handleAddCardCancel"
        :z-index="99"
        :style="{ height: '70%' }"
      >
        <div class="cs-p-20">
          <p class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-16 cs-m-b-15">
            <span class="add-card-tip">{{ $t("添加金融卡") }}</span>
            <Icon class="close-icon" name="close" :size="20" @click="handleAddCardCancel" />
          </p>

          <CellGroup>
            <Field :border="false" v-model="cardListData.form.accountName" :label="$t('持卡人戶名')" 
            :placeholder="$t('請輸入持卡人戶名')"></Field>
            <Field
              :border="false"
              v-model="cardListData.form.cardNumber"
              @blur="handleCheckCard"
              :label="$t('持卡人帳號')"
              :placeholder="$t('請輸入持卡人帳號')"
            ></Field>
           
            <Field
              :border="false"
              v-model="cardListData.form.cardTypeName"
              :label="$t('银行名称')"
              :placeholder="$t('请输入银行名称')"
            ></Field>
            <!-- <Field
              :border="false"
              v-model="cardListData.form.bankName"
              :label="$t('金融卡类型')"
              :placeholder="$t('请输入金融卡类型')"
            ></Field> -->
            <Field :border="false" v-model="cardListData.form.accountBank" :label="$t('開戶支行')" :placeholder="$t('請輸入開戶支行')"></Field>
            <!-- <CoreshopCascaderAddress
              :areaId="cardListData.form.areaId"
              :areaName="cardListData.areaName"
              @handleChangeValue="handleChangeValue"
            >
            </CoreshopCascaderAddress> -->
            <div class="default">
              <Checkbox :border="false" v-model="cardListData.form.isDefault" checked-color="#D33123">{{$t('勾选将设为默认提现用户')}}</Checkbox>
            </div>
          </CellGroup>
          <div  class="confirm">
            <coreshop-button
              :text="$t('保存')"
              @click="handleAddCardOk"
              :size="btnSize.medium"
              :bordered="true"
              bg-color="#D33123"
          />
          </div>
         
        </div>
      </Popup>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Result } from "@/model/result";
import { UnwrapRef } from "vue";
import {
  queryRemoveBankCard,
  queryBankCardOrganization,
  querySetDefaultBankCard,
  queryBankCardList,
  queryAddBankCard,
} from "@/composables/balance";
import { DefaultBankCard, BankCardOrganization } from "@/model/member";
import {
  Popup,
  showConfirmDialog,
  Field,
  CellGroup,
  SwipeCell,
  Checkbox,
  showToast,
  Icon,
  showSuccessToast,
} from "vant";
import { btnSize } from "@/enum";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
  layout: false,
});

interface Ifrom {
  cardNumber?: string; // 金融卡号
  accountName: string; // 开户人姓名
  bankName: string; // 银行名称
 // bankCode: string; // 银行缩写码
  accountBank: string; // 开户行
 //cardType: number; // 卡类型
  cardTypeName: string; // 卡片类型
  isDefault: number;
  //areaId?: number;
}

const cardListData: UnwrapRef<{
  list: Array<DefaultBankCard>;
  addShowModalRef: boolean;
  cardId?: number;
  form: Ifrom;
  areaName?: string;
}> = reactive({
  list: [],
  addShowModalRef: false,
  cardId: undefined,
  areaName: undefined,
  form: {
    cardNumber: undefined,
    accountName: "",
    bankName: "",
    //bankCode: "",
    accountBank: "",
   // cardType: 1,
    cardTypeName: "",
    isDefault: 0,
   // areaId: undefined,
  },
});

const query = async () => {
  const cardList: Result<Array<DefaultBankCard>> = await queryBankCardList();
  cardListData.list = cardList.data;
};
query();

// 弹框获取区域ID
// const handleChangeValue = async (val: number, area: string) => {
//   cardListData.form.areaId = val;
//   cardListData.areaName = area;
// };

// 金融卡设置默认
const handleSetDefault = async (item: any) => {
  const setDefault: Result<any> = await querySetDefaultBankCard({
    id: item.id,
  });
  showSuccessToast(setDefault.msg);
  query();
};

// const handleModalOk = async () => {
//   const removeBankCard: Result<any> = await queryRemoveBankCard({
//     id: cardListData.cardId,
//   });
//   showSuccessToast(removeBankCard.msg);
//   query();
// };

// 删除金融卡
const handleDeleteCard = (item: any) => {
  cardListData.cardId = item.id;

  showConfirmDialog({
    title: coreShopLang("提示"),
    message: coreShopLang("确定删除该金融卡"),
  })
    .then(() => {
     // handleModalOk();
    })
    .catch(() => {
      // on cancel
    });
};

// 添加金融卡
const handleAddCard = () => {
  cardListData.addShowModalRef = true;
};
const handleAddCardCancel = () => {
  cardListData.addShowModalRef = false;
  reastCard();
};
const handleAddCardOk = async () => {
  if (!cardListData.form.cardNumber) {
    showToast(coreShopLang("請輸入持卡人金融卡號"));
    return;
  }
  if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,30}$/.test(cardListData.form.accountName)) {
    showToast(coreShopLang("請輸入持卡人戶名"));
    return;
  }
  if (!cardListData.form.accountBank) {
    showToast(coreShopLang("請輸入開戶支行"));
    return;
  }
  // if (!cardListData.form.areaId) {
  //   showToast(coreShopLang("请选择开户行所在地区"));
  //   return;
  // }
  /*if (!cardListData.form.bankName) {
    showToast(coreShopLang("请检查金融卡号是否有误"));
    return;
  }*/

  const addBankCard: Result<any> = await queryAddBankCard({
    bankAreaId:0,...cardListData.form,
  });
  showSuccessToast(addBankCard.msg);
  handleAddCardCancel();
  query();
};
const reastCard = () => {
  cardListData.form.cardNumber = undefined;
  cardListData.form.accountName = "";
  cardListData.form.bankName = "";
  // cardListData.form.bankCode = "";
  // cardListData.form.accountBank = "";
  // cardListData.form.cardType = 1;
   cardListData.form.cardTypeName = "";
  cardListData.form.isDefault = 0;
  // cardListData.form.areaId = undefined;
  // cardListData.areaName = undefined;
};
// 判断获取金融卡类型
// const handleCheckCard = async () => {
//   cardListData.form.cardNumber = cardListData.form.cardNumber?.replace(/\s+/g, "");

//   const checkCardRes: Result<BankCardOrganization> = await queryBankCardOrganization({
//     id: cardListData.form.cardNumber,
//   });

//   if (!checkCardRes.status) {
//     showToast(checkCardRes.msg);
//     return;
//   }

  //cardListData.form.bankName = checkCardRes.data.name;
  //cardListData.form.cardType = checkCardRes.data.type;
  //cardListData.form.bankCode = checkCardRes.data.bankCode;
 // cardListData.form.cardTypeName = checkCardRes.data.typeName;
//};
</script>

<style lang="scss" scoped>
.active {
  background-color: #dc2828;
  color: #fff;
}

.confirm {

  .n-button{
    position: fixed;
    bottom: 20px;
    width: 90%;
    height: 36px !important;
  }
}


.default {
  // border-top: 0.5px solid #dedede;
  border-color: transparent;
  padding: 15px 0;
  margin: 0 10px;
}

.add-card-tip {
  font-weight: 500;
}

.detail-list-box {
  position: relative;
  width: 9.5rem;
  margin: 0 auto;

  li {
    background: #ffffff;

    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin-bottom: 10px;
    .card-item {
      width: 9rem;
      padding: 0.6rem 0.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      position: relative;

      div:nth-of-type(1) {
        margin-left: 5%;
        width: 27%;
      }

      div:nth-of-type(2) {
        width: 65%;
      }
    }

    .isdefault {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 11;
      color: #ffffff;
      width: 0px;
      height: 0px;
      border-bottom: solid 1.2rem transparent;
      border-right: solid 1.2rem transparent;
      border-top: solid 1.2rem #ff7159;

      span {
        position: absolute;
        top: -1rem;
        left: 0.1rem;
        z-index: 12;
        color: #ffffff;
        font-size: 0.25rem;
        white-space: pre;
      }
    }

    .btn-box {
      position: absolute;
      right: 10px;
      bottom: 5px;
      cursor: pointer;
    }
  }
}
.add-btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem 0.25rem 0.8rem  0.25rem;
  width: 4.75rem;
  font-size: 0.4rem;
  text-align: center;
  color: #fff;
  .n-button{
    height: 1.1rem;
    border-radius: 0.55rem;
  }
  div {
    width: calc(100% - 0.5rem);
    margin: 0 auto;
    padding: 0.15rem;
  }
}

.actions {
  display: flex;
  height: 100%;

  .set-default,
  .delete {
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .set-default {
    background-color: #f3f3f3;
  }

  .delete {
    background-color: #f56c6c;
    // background-color: #D33123;
    color: #ffffff;
    height: 100%;
    padding: 0 10px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
.balance-detail-box{
  
  position: relative;
  // background: #fff;
  margin: 0 12px;
  border-radius: 8px;
  .van-empty{
    padding: 34px 0 10px 0 !important;
  }
}
.empty-content{
  background: #fff;
  position: relative;
  // margin: 0 12px;
  border-radius: 8px;
  .van-empty{
    padding: 34px 0 10px 0 !important;
  }
}
.van-hairline--top-bottom:after, .van-hairline-unset--top-bottom:after{
  border: none !important;
}
</style>
