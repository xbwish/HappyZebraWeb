<template>
  <NuxtLayout name="coreshop-shop-header-back">
    <coreshop-title :title="detailData.goodDetail?.name" />
    <PullRefresh v-model="state.pullRefresh" @refresh="onPullRefresh()">
      <div style="padding-bottom: 1.5rem">
        <CoreshopGoodDetailProductInfo
          :goodDetail="detailData.goodDetail"
          :chooseSku="productDetailState.chooseSku"
          :serviceDescription="detailData.serviceDescription"
          @handleShowSku="handleShowSku"
          :promotionList="state.promotionList"
        >
          <template #meta>
            <ul
              class="cs-display-flex cs-align-items-center cs-justify-content-space-between statistics"
            >
              <li>
                <CoreshopLanguage :text="$t('销量')" />:
                {{ detailData.goodDetail?.buyCount || "0" }}
              </li>
              <li>
                <CoreshopLanguage :text="$t('库存剩余')" />:
                {{ detailData.goodDetail?.product?.stock || 0 }}
              </li>
              <li
                @click="handleCollection"
                class="cs-display-flex cs-text-align-center"
              >
                <Icon
                  size="15"
                  :name="detailData.isFav ? 'like' : 'like-o'"
                  :color="detailData.isFav ? '#f56c6c' : ''"
                />
                <span class="cs-m-l-5" style="line-height: 16px">{{
                  $t("收藏")
                }}</span>
              </li>
              <li>
                <CoreshopShare
                  :wxShare="detailData.wxShare"
                  :shareParams="detailData.shareParams"
                  :shareOptions="state.shareOptions"
                  :sharePageType="UrlSharePageType.goods"
                >
                </CoreshopShare>
              </li>
            </ul>
          </template>
          <template #point>
            <section class="point-box">
              <div
                v-if="
                  config.pointSwitch == 1 &&
                  config.pointExchangeModel == 2 &&
                  config.pointShowExchangePrice == 1 &&
                  detailData.goodDetail?.product?.pointsDeduction > 0
                "
              >
                <p>{{ config.pointShowName }}{{ $t("兑换价") }}:</p>
                <p v-if="config.pointDiscountedProportion">
                  {{
                    config.pointDiscountedProportion *
                    detailData.goodDetail?.product?.pointsDeduction
                  }}{{ config.pointShowName }}+{{
                    parseFloat(
                      `${
                        (detailData.goodDetail.product?.price || 0) -
                        (detailData.goodDetail.product?.pointsDeduction || 0)
                      }`
                    )?.toFixed(2)
                  }}
                  {{ $t("元") }}
                </p>
              </div>
              <div
                class="cs-m-l-20"
                v-if="config.pointSwitch == 1 && config.pointGetModel == 2 && config.pointShowPoint == 1 && (detailData.goodDetail?.product?.points as number) > 0"
              >
                <p>{{ $t("买就送") }}:</p>
                <p>
                  {{ detailData.goodDetail?.product?.points
                  }}{{ config.pointShowName }}
                </p>
              </div>
            </section>
          </template>
        </CoreshopGoodDetailProductInfo>

        <!-- 商品详情 -->
        <CoreshopGoodDetailProductDetailAndEvaluate
          :goodDetail="detailData.goodDetail"
          :id="route.params.id"
          :intro="detailData.goodDetail.intro"
          :goodParams="detailData.goodParams"
          :agentData="detailData?.goodDetailExtendInfo"
          :commonQuestion="detailData.serviceDescription.commonQuestion"
        />

        <CoreshopProductRecommend />

        <!-- 商品规格弹框 -->
        <CoreshopGoodDetailProductSku
          :show="detailData.showSku"
          :goodDetail="detailData.goodDetail"
          :chooseSku="productDetailState.chooseSku"
          @handleShowSku="handleShowSku"
          @handleChangeGoodSku="handleChangeGoodSku"
          @handleChangeGoodNum="handleChangeGoodNum"
        >
          <template #button>
            <div
              class="cs-m-t-20 cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100"
            >
              <CoreshopButton
                class="cs-percent-w-48"
                round
                bgColor="#404040"
                @click="handleAddCart($event)"
                :size="btnSize.medium"
              >
                <CoreshopLanguage :text="$t('加入购物车')" />
              </CoreshopButton>
              <CoreshopButton
                class="cs-percent-w-48"
                round
                bg-color="#e84f5d"
                @click="handleBuyNow($event)"
                :size="btnSize.medium"
              >
                <CoreshopLanguage :text="$t('立即购买')" />
              </CoreshopButton>
            </div>
          </template>
        </CoreshopGoodDetailProductSku>
      </div>
      <!-- 底部栏 -->
      <CoreshopGoodDetailProductFooter>
        <template #button>
          <div
            class="cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100"
          >
            <CoreshopButton
              class="cs-percent-w-48"
              @click="handleShowSku"
              round
              bgColor="#404040"
              :size="btnSize.medium"
            >
              <CoreshopLanguage :text="$t('加入购物车')" />
            </CoreshopButton>
            <CoreshopButton
              class="cs-percent-w-48"
              bg-color="#e84f5d"
              round
              @click="handleShowSku"
              :size="btnSize.medium"
            >
              <CoreshopLanguage :text="$t('立即购买')" />
            </CoreshopButton>
          </div>
        </template>
      </CoreshopGoodDetailProductFooter>
    </PullRefresh>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { useRoute } from "vue-router"
import type { Result } from "@/model/result"
import { SkuItem } from "@/model/product"
import {
  queryGoodsCollection,
  queryPromotionList,
} from "@/composables/productService"
import * as cartService from "@/composables/cartService"
import {
  OrderTypeEnum,
  OrderBuyProductModeEnum,
  btnSize,
  UrlSharePageType,
  promotionType,
} from "@/enum"
import { useCartStore, useConfigStore } from "@/store"
import { showSuccessToast, showToast, PullRefresh, Icon } from "vant"
import { useProduct } from "../hooks"
import { PromotionList } from "@/model/product"
const config = useConfigStore().getConfig
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({ layout: false })

const { queryProductDetail, detailData, productDetailState } = useProduct()
const cartStore = useCartStore()

queryProductDetail()

const route = useRoute()

const state: UnwrapRef<{
  pullRefresh: boolean
  shareOptions: { goodsId: number }
  promotionList: Array<PromotionList>
}> = reactive({
  pullRefresh: false,
  shareOptions: {
    goodsId: Number(route.params.id),
  },
  promotionList: [],
})

// 获取优惠信息
const promotionState: Result<Array<PromotionList>> = await queryPromotionList({
  id: promotionType.promotion,
})
state.promotionList = promotionState.data

/** 下拉刷新 */
const onPullRefresh = () => {
  queryProductDetail()
  state.pullRefresh = false
}

// 添加购物车
const handleAddCart = async (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  const buyResult: Result<number> = await cartService.cartAddCart({
    nums: productDetailState.nums || 1,
    productId: productDetailState.chooseSku?._id || "",
    type: OrderBuyProductModeEnum.addCart, // 1 加入购物车  2购买
    cartType: OrderTypeEnum.common,
  })

  if (!buyResult.status || !buyResult.data) {
    showToast(buyResult.msg as string)
    return
  }
  cartStore.setCartProductTotal()
  showSuccessToast(coreShopLang('"加入购物车"'))
  handleShowSku()
}

// 立即购买
const handleBuyNow = async (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  const buyResult: Result<number> = await cartService.cartAddCart({
    nums: productDetailState.nums || 1,
    productId: productDetailState.chooseSku?._id || "",
    type: OrderBuyProductModeEnum.buyNow, // 1 加入购物车  2购买
    cartType: OrderTypeEnum.common,
    // 非普通订单关联营销对象序列
    objectId: 0,
  })

  if (!buyResult.status || !buyResult.data) {
    showToast(buyResult.msg as string)
    return
  }
  cartStore.setCartProductTotal()
  navigateTo(
    `/order/submit?orderType=${OrderTypeEnum.common}&cartIds=${buyResult.data}`
  )
}

const handleChangeGoodSku = (sku: SkuItem) => {
  productDetailState.chooseSku = sku
}

const handleChangeGoodNum = (num: number) => {
  productDetailState.nums = num
}

// 收藏
const handleCollection = async () => {
  const goodsCollection: Result<any> = await queryGoodsCollection({
    id: route.params.id as unknown as number,
  })
  showSuccessToast(goodsCollection.msg as string)
  detailData.isFav = !detailData.isFav
}

const handleShowSku = () => {
  detailData.showSku = !detailData.showSku
}
</script>
<style lang="scss" scoped>
.statistics {
  margin-top: 10px;
}

.point-box {
  display: flex;
  align-items: center;
  color: #666666;
  font-size: 0.3rem;

  div {
    display: flex;
    align-items: center;
  }
}
</style>
