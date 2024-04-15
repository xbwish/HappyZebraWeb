<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="formDetial.name"></CoreshopTitle>
    <div class="layout-form">
      <!-- banner -->
      <div class="banner-box">
        <div v-if="formDetial.headType == 3">
          <video class="carousel-img" :src="formDetial.headTypeVideo" :poster="formDetial.headTypeValue"></video>
        </div>
        <Swipe v-else indicator-color="#ffffff" :autoplay="4000">
          <SwipeItem v-for="item of formState.images || []" :key="item">
            <img class="carousel-img" :src="item" />
          </SwipeItem>
        </Swipe>
        <div class="description cs-display-flex cs-align-items-center cs-justify-content-space-between">
          <p>{{ formDetial.description }}</p>
          <CoreshopShare :wxShare="formState.wxShare" :shareParams="formState.shareParams" />
        </div>
      </div>

      <!-- 主体内容 -->
      <div class="form-centent">
        <div v-for="item in formDetial.items" :key="item.id">
          <div class="cs-m-b-5" v-if="item.type == FormType.goods">
            <CoreshopFormGoods :data="item" @handleConfirm="handleGoodsConfirm" @handleDelete="handleGoodsDelete" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.checbox">
            <CoreshopFormChecbox :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.text">
            <CoreshopFormText :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.date">
            <CoreshopFormDate :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.time">
            <CoreshopFormTime :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.radio">
            <CoreshopFormRadio :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.money">
            <CoreshopFormMoney :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.password">
            <CoreshopFormPassword :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.textarea">
            <CoreshopFormTextarea :data="item" @handleConfirm="handleConfirm" />
          </div>
          <!-- <div class="cs-m-b-5" v-if="item.type == FormType.coordinate">
            <CoreshopFormCoordinate :data="item" />
          </div> -->
          <div class="cs-m-b-5" v-if="item.type == FormType.area">
            <CoreshopFormArea :data="item" @handleConfirm="handleConfirm" />
          </div>
          <div class="cs-m-b-5" v-if="item.type == FormType.image">
            <CoreshopFormImage :data="item" @handleConfirm="handleConfirm" />
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="btn-box">
      <CoreshopButton class="cs-percent-w-100" :size="btnSize.medium" @on-click="handleFormSubmit">
        <CoreshopLanguage :text="formDetial.buttonName" />
      </CoreshopButton>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { queryFormDetial, queryFormSubmit } from "@/composables/form";
import { Result } from "@/model/result";
import { useAccountStore } from "@/store";
import { FormType } from "@/enum/form.enum";
import { showToast, showSuccessToast, closeToast } from "vant";
import { redirectLogin } from "@/utils";
import { OrderTypeEnum, ShareType, UrlSharePageType, UrlShareClentType, shareUrl, btnSize } from "@/enum";
import { IWxShare, IShareParams, IShareMessageArguments } from "@/model";
import { Swipe, SwipeItem } from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
  layout: false,
});

const formState: UnwrapRef<{
  images: Array<string>;
  data: Array<any>;
  paymentType: number;
  wxShare: IWxShare;
  shareParams: IShareParams;
}> = reactive({
  images: [],
  data: [],
  paymentType: 1,
  wxShare: {},
  shareParams: { params: {} },
});

// 分享接口参数
const getShareUrl = (data: IShareMessageArguments) => {
  formState.shareParams.client = UrlShareClentType.wxofficial;
  formState.shareParams.page = UrlSharePageType.form;
  if (process.client) {
    formState.shareParams.url = `${window.location.origin}${shareUrl}`;
  }
  formState.shareParams.type = ShareType.url;
  formState.shareParams.params.id = data.id;

  // 分享信息
  formState.wxShare.title = data.title;
  formState.wxShare.desc = data.desc;
  formState.wxShare.imgUrl = data.imgUrl;
};

const getFormDetial: Result<Array<any>> = await queryFormDetial({
  id: useRoute().params.id,
  token: useAccountStore().getToken,
});

const formDetial: any = getFormDetial.data;

if (formDetial.type == 1) {
  formState.paymentType = OrderTypeEnum.formPay;
} else if (formDetial.type == 2) {
  formState.paymentType = OrderTypeEnum.formOrder;
}

// 分享信息
getShareUrl({
  title: formDetial.name || "",
  desc:coreShopLang( "表单") || "",
  imgUrl: "",
  id: formDetial.id || 0,
});

if (formDetial?.needLogin) {
  redirectLogin();
}

formState.images = formDetial.images?.split(",");

const handleGoodsConfirm = (data: any) => {
  if (formState.data.length > 0) {
    let arr = formState.data.filter((item) => item.key == data.key);
    let isHave = arr.filter((p) => p.value.productId == data.value.productId);
    if (arr.length > 0) {
      if (isHave.length > 0) {
        isHave[0].value.nums += data.value.nums;
      } else {
        formState.data.push(data);
      }
    } else {
      formState.data.push(data);
    }
  } else {
    formState.data.push(data);
  }
};
const handleGoodsDelete = (id: number) => {
  formState.data.forEach((item, index) => {
    if (item.value.productId == id) {
      formState.data.splice(index, 1);
    }
  });
  console.log(formState.data);
};

const handleConfirm = (data: any) => {
  if (formState.data.length > 0) {
    let arr = formState.data.filter((item) => item.key == data.key);
    if (arr.length > 0) {
      arr[0].value = data.value;
    } else {
      formState.data.push(data);
    }
  } else {
    formState.data.push(data);
  }
};

// 提交
const handleFormSubmit = async () => {
  let data: Array<any> = [];
  formState.data.forEach((item) => {
    let arr = [];
    arr.push(item.value);
    if (item.value != "") {
      data.push({
        key: item.key,
        value: JSON.stringify(arr),
      });
    }
  });

  if (data.length == 0) {
    showToast(coreShopLang("请填写表单数据"));
    return;
  }

  const result: Result<any> = await queryFormSubmit({
    data: [...data],
    id: formDetial.id,
    token: useAccountStore().getToken,
  });

  if (result.status) {
    if (formDetial.type == "1" || formDetial.type == "2") {
      showSuccessToast(result.msg);
      setTimeout(function () {
        closeToast();
        navigateTo(
          `/order/payment?formId=${result.data.formSubmitId}&type=${formState.paymentType}&recharge=${result.data.money}`
        );
      }, 1000);
    }
  } else {
    showToast(result.msg);
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
