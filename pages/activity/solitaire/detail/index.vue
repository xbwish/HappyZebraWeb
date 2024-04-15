<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('接龙详情')"></CoreshopTitle>
    <div style="padding-bottom: 1.5rem">
      <div class="shop-box cs-display-flex cs-justify-content-space-between">
        <div class="cs-display-flex cs-justify-content-space-between">
          <div class="">
            <img class="cs-w-40 cs-border-radius-5" :src="config.shopLogo" alt="" />
          </div>
          <div class="cs-m-l-10">
            <p class="cs-font-size-14">{{ config.shopName }}</p>
            <p class="cs-font-size-14">{{ config.shareTitle }}</p>
          </div>
        </div>
        <div class="btn-box">
          <a :href="`tel:${config.shopMobile}`">
            <Icon name="phone-o" :size="18" />
            {{$t('联系商家')}}
          </a>
        </div>
      </div>
      <div class="detail-box">
        <div class="solitaire-title">
          <div class="cs-font-size-14 cs-p-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between">
            <p class="cs-percent-w-90">{{ solitaireDetailState.model.title }}</p>
            <CoreshopShare :wxShare="solitaireDetailState.wxShare" :shareParams="solitaireDetailState.shareParams" />
          </div>
          <p class="cs-font-size-12 cs-color-gray cs-p-b-5">
            {{
              solitaireDetailState.model?.createTime
                ? timeFormat(solitaireDetailState.model?.createTime, "mm月dd日")
                : ""
            }}
            ~
            {{
              solitaireDetailState.model?.endTime
                ? timeFormat(solitaireDetailState.model?.endTime, "mm月dd日 hh:MM:ss")
                : ""
            }}
          </p>
          <p>
            <Tag class="delivery-price" type="success" v-if="(solitaireDetailState.model?.minDeliveryPrice || 0) > 0"
              >{{ solitaireDetailState.model.minDeliveryPrice }}{{$t('元起送')}}</Tag
            >
            <Tag type="primary" v-if="(solitaireDetailState.model?.startBuyPrice || 0) > 0"
              >{{ solitaireDetailState.model.startBuyPrice }}{{$t('元起购')}}</Tag
            >
          </p>
          <div class="cs-m-t-5 cs-font-size-12" v-html="solitaireDetailState.model.contentBody"></div>
        </div>

        <section class="solitaire-goods">
          <div
            class="cs-display-flex cs-justify-content-space-between cs-p-t-10 cs-p-b-10 cs-m-b-5"
            v-for="(item, index) in solitaireDetailState.items"
            :key="item.id"
          >
            <div class="cs-percent-w-28">
              <img class="cs-percent-w-90 cs-border-radius-5" :src="item.productObj.images" alt="" />
            </div>
            <div class="cs-percent-w-72 cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
              <div>
                <p class="cs-font-size-14 title">{{ item.goodObj.name }}</p>
                <p class="cs-font-size-12 desc">{{ item.productObj.spesDesc }}</p>
              </div>
              <div class="cs-display-flex cs-align-items-end cs-justify-content-space-between">
                <p
                  class="cs-color-red cs-line-height-no-px-1 cs-text-price cs-font-size-16 cs-display-flex cs-align-items-baseline"
                >
                  {{ item.price }}
                  <span class="cs-m-l-10 cs-font-size-12 cs-color-gray cs-text-decoration-line-through"
                    >NT${{ item.productObj.mktprice || "0.00" }}</span
                  >
                </p>
                <Stepper
                  :default-value="0"
                  :min="0"
                  v-model="item.nums"
                  theme="round"
                  button-size="22"
                  integer
                  @minus="handleSubtract(item)"
                  @plus="handleAdd(item)"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- 接龙清单 -->
        <div class="solitaire-order">
          <p class="cs-font-size-14 cs-m-b-10">
            <CoreshopLanguage :text="$t('接龙清单')" />
          </p>
          <ul class="solitaire-box" v-if="solitaireDetailState.record.length > 0">
            <li
              class="solitaire-item cs-display-flex cs-align-items-center cs-justify-content-space-between cs-background-color-gray cs-p-10 cs-m-b-5 cs-border-radius-5"
              v-for="(item, index) in solitaireDetailState.record"
              :key="index"
            >
              <div class="avatar">
                <img class="cs-w-20 cs-percent-border-radius-50" :src="item.avatarImage || '/images/empty.png'" />
                <div>
                  <div class="cs-display-flex cs-align-items-center">
                    <p class="cs-font-size-12 cs-m-t-4 nick-name">{{ item.nickName }}</p>
                  </div>
                  <p class="cs-font-size-12">{{ timeFormat(item.create, "mm月dd日") }}</p>
                </div>
              </div>
              <div class="cs-display-flex cs-align-items-center">
                <div>
                  <p class="cs-font-size-12 cs-text-align-right">{{ item.productSku }}</p>
                  <p class="cs-font-size-12 cs-text-align-right">x{{ item.nums }}</p>
                </div>
              </div>
            </li>
          </ul>
          <CoreshopNoData v-else :text="$t('购买后就可以展示效果了哦')" />
        </div>

        <!-- 合计 -->
        <div class="footer-btn-box">
          <p class="cs-font-size-14 cs-color-gray cs-m-r-30">
            {{$t('合计')}}:
            <span class="cs-text-price cs-color-red cs-font-size-16">{{ solitaireDetailState.totalprice }}</span>
          </p>
          <CoreshopButton @on-click="handleSubmit" class="cs-w-200 btn cs-font-size-14">
            <CoreshopLanguage :text="$t('立即结算')" />
          </CoreshopButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { querySolitaireDetail } from "@/composables/activity";
import { Result } from "@/model/result";
import * as cartService from "@/composables/cartService";
import { SolitaireDetail, SolitaireDetailItems, SolitaireList, SolitaireDetailRecord } from "@/model/activity";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { useConfigStore } from "@/store";
import {
  OrderTypeEnum,
  OrderBuyProductModeEnum,
  ShareType,
  UrlSharePageType,
  UrlShareClentType,
  shareUrl,
} from "@/enum";
import { IWxShare, IShareParams, IShareMessageArguments } from "@/model";
import { Tag, Icon, Stepper, showSuccessToast, showToast } from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
  layout: false,
});

interface ISolitaireDetail {
  items: Array<SolitaireDetailItems>;
  model: SolitaireList;
  record: Array<SolitaireDetailRecord>;
  totalprice: number;
  wxShare: IWxShare;
  shareParams: IShareParams;
  deleteId: number;
}

interface ProductMapCartId {
  productId: number;
  cartId: number;
}

const config = useConfigStore().getConfig;

const solitaireDetailState: UnwrapRef<ISolitaireDetail> = reactive({
  items: [],
  model: {},
  record: [],
  totalprice: 0,
  wxShare: {},
  shareParams: { params: {} },
  deleteId:0,
});

// 分享接口参数
const getShareUrl = (data: IShareMessageArguments) => {
  solitaireDetailState.shareParams.client = UrlShareClentType.wxofficial;
  solitaireDetailState.shareParams.page = UrlSharePageType.solitaire;
  if (process.client) {
    solitaireDetailState.shareParams.url = `${window.location.origin}${shareUrl}`;
  }
  solitaireDetailState.shareParams.type = ShareType.url;
  solitaireDetailState.shareParams.params.id = data.id;

  // 分享信息
  solitaireDetailState.wxShare.title = data.title;
  solitaireDetailState.wxShare.desc = data.desc;
  solitaireDetailState.wxShare.imgUrl = data.imgUrl;
};

/** 购物车数组 */
let productIdMapcartIds: Array<ProductMapCartId> = [];

const route: RouteLocationNormalizedLoaded = useRoute();

const handleQuerySolitaireDetail = async () => {
  const solitaireResult: Result<SolitaireDetail> = await querySolitaireDetail({ id: route.query.id });
  if (solitaireResult.status && solitaireResult.data) {
    solitaireDetailState.items = solitaireResult.data?.items || []; 
    solitaireDetailState.model = solitaireResult.data?.model || {};
    solitaireDetailState.record = solitaireResult.data?.record || [];

    // 分享信息
    getShareUrl({
      title: solitaireResult.data?.model?.title || "",
      desc: solitaireResult.data?.model?.description || "",
      imgUrl: solitaireResult.data?.model?.thumbnail || "",
      id: solitaireResult.data?.model?.id || 0,
    });
  }
};

/** 查询接龙列表 */
await handleQuerySolitaireDetail();

/** 减少商量购买数量 */
const handleSubtract = async (product: SolitaireDetailItems) => {
  let solitaireProduct: SolitaireDetailItems = solitaireDetailState.items.find((x) => x.id === product.id)!;
  solitaireProduct.nums = Math.max((solitaireProduct.nums || 0) - 1, 0);
  if (solitaireProduct.nums === 0) {
    await cartService.cartDeleteProduct({ id: solitaireDetailState.deleteId });
    productIdMapcartIds = productIdMapcartIds.filter((x) => x.productId !== product.productId);
  } else {
    await handleJoinCart({ nums: solitaireProduct.nums, id: product.productId });
  }
  handleCalculateGoodsTotalMoney();
};

/** 添加 商品购买数量 */
const handleAdd = async (product: SolitaireDetailItems) => {
  let solitaireProduct: SolitaireDetailItems = solitaireDetailState.items.find((x) => x.id === product.id)!;
  solitaireProduct.nums = (solitaireProduct.nums || 0) + 1;
  const cardId: number | null = await handleJoinCart({ nums: solitaireProduct.nums, id: product.productId });
  if (cardId) {
    solitaireDetailState.deleteId = cardId;
    productIdMapcartIds.push({ productId: product.productId, cartId: cardId });
  }

  handleCalculateGoodsTotalMoney();
};

/** 添加购物车到购物车 */
const handleJoinCart = async (item: { nums: number; id: number }): Promise<number | null> => {
  const addResult: Result<number> = await cartService.cartAddCart({
    nums: item.nums,
    productId: item.id,
    type: OrderBuyProductModeEnum.buyNow,
    cartType: OrderTypeEnum.solitaire,
    objectId: Number(useRoute().query.id),
  });

  if (addResult.status) {
    showSuccessToast(addResult.msg);
    return addResult.data;
  }
  return null;
};

/** 计算商品总价钱 */
const handleCalculateGoodsTotalMoney = () => {
  solitaireDetailState.totalprice = solitaireDetailState.items?.reduce((pre, item) => {
    return (item.price * 1000 * (item.nums || 0) + pre * 1000) / 1000;
  }, 0);
};

// 立即结算
const handleSubmit = () => {
  if (productIdMapcartIds.length === 0) {
    showToast(coreShopLang("请先选择商品"));
    return;
  }

  if (solitaireDetailState.totalprice < (solitaireDetailState.model.startBuyPrice as number)) {
    showToast(coreShopLang("最小购买价格为") + solitaireDetailState.model.startBuyPrice + coreShopLang('元') + coreShopLang("请增加购买产品"));
    return;
  }

  navigateTo(
    `/order/submit?cartIds=${productIdMapcartIds.map((item) => item.cartId).join(",")}&orderType=${
      OrderTypeEnum.solitaire
    }&objectId=${route.query.id}`
  );
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
