<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('团购详情')"></CoreshopTitle>
    <div style="padding-bottom: 1.5rem">
      <div class="detail-box">
        <CoreshopGoodDetailProductInfo
          :goodDetail="detailData.goodsInfo"
          :chooseSku="detailData.chooseSku"
          :serviceDescription="detailData.serviceDescription"
          @handleChangeGoodNum="handleChangeGoodNum"
          @handleChangeGoodSku="handleChangeGoodSku"
        >
          <template #countdown>
            <div class="cs-font-size-16 duration">
              <CoreshopLanguage :text="$t('仅剩')" />：
              <NCountdown
                :render="renderCountdown"
                :duration="detailData.goodsInfo?.timestamp * 1000"
                :active="true"
              />
            </div>
          </template>
          <template #meta>
            <ul
              class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
            >
              <li>
                <CoreshopLanguage :text="$t('已售')" />:
                {{ detailData.goodsInfo?.buyCount || "0" }}
              </li>
              <li>
                <CoreshopLanguage :text="$t('单包量')" />:
                {{ detailData.goodsInfo?.ticketNumber || "0" }}
              </li>
              <li>
                <CoreshopLanguage :text="$t('库存剩余')" />:
                {{ detailData?.goodsInfo?.amount || 0 }}
              </li>
              <li>
                <CoreshopShare
                  :wxShare="detailData.wxShare"
                  :shareParams="detailData.shareParams"
                  :shareOptions="detailData.shareOptions"
                  :sharePageType="UrlSharePageType.serviceGoods"
                >
                </CoreshopShare>
              </li>
            </ul>
          </template>
          <template #point>
            <div class="form-group product__option">
              <label class="product__option-label">
                <CoreshopLanguage :text="$t('服务网点')" />
              </label>
              <div class="product__actions">
                <Tag
                  type="primary"
                  class="cs-m-r-5"
                  v-for="(item, index) in detailData.goodsInfo.consumableStores"
                  :key="index"
                >
                  {{ item }}
                </Tag>
              </div>
            </div>
            <div class="form-group product__option">
              <label class="product__option-label">
                <CoreshopLanguage :text="$t('会员级别')" />
              </label>
              <div class="product__actions">
                <Tag
                  type="success"
                  class="cs-m-r-5"
                  v-for="(item, index) in detailData.goodsInfo
                    .allowedMemberships"
                  :key="index"
                >
                  {{ item }}
                </Tag>
              </div>
            </div>
            <div class="form-group product__option">
              <label class="product__option-label">
                <CoreshopLanguage :text="$t('有效期')" />
              </label>
              <div class="product__actions">
                {{ detailData.goodsInfo.startTime }} ~
                {{ detailData.goodsInfo.endTime }}
              </div>
            </div>
          </template>
        </CoreshopGoodDetailProductInfo>
      </div>

      <!-- 商品详情 -->
      <CoreshopGoodDetailProductDetailAndEvaluate
        :id="route.query.id"
        :goodDetail="detailData.goodsInfo"
        :goodParams="detailData.goodsInfo.goodParams"
        :intro="detailData.goodsInfo.intro"
        :commonQuestion="detailData.serviceDescription.commonQuestion"
      />

      <!-- 底部栏 -->
      <CoreshopGoodDetailProductFooter>
        <template #button>
          <div
            class="cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100"
          >
            <CoreshopButton
              class="cs-percent-w-100"
              @click="handleBuyNow($event)"
              size="medium"
            >
              <CoreshopLanguage
                class="cs-font-size-12"
                :text="$t('立即购买')"
              />
            </CoreshopButton>
          </div>
        </template>
      </CoreshopGoodDetailProductFooter>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { NCountdown, CountdownProps, NTag } from "naive-ui"
import {
  queryServiceDetail,
  queryAddServiceOrder,
  queryGoodsParams,
} from "@/composables/activity"
import type { Result } from "@/model/result"
import { SkuItem, GoodDescription } from "@/model/product"
import { queryServiceDescription } from "@/composables/productService"
import { showToast } from "vant"
import {
  GoodParams,
  IWxShare,
  IShareParams,
  IShareMessageArguments,
} from "@/model"
import {
  OrderTypeEnum,
  ShareType,
  UrlSharePageType,
  UrlShareClentType,
  shareUrl,
} from "@/enum"
import { Tag } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const route = useRoute()

const detailData: UnwrapRef<{
  goodsInfo: {
    intro: string
    goodParams: Array<GoodParams>
    [key: string]: any
  }
  chooseSku: SkuItem | null
  serviceDescription: GoodDescription
  isFav: boolean
  nums: number
  wxShare: IWxShare
  shareParams: IShareParams
  shareOptions: { serviceGoodsId: number }
}> = reactive({
  goodsInfo: {
    intro: "",
    goodParams: [],
  },
  chooseSku: null,
  serviceDescription: {
    commonQuestion: [],
    delivery: [],
    service: [],
  },
  isFav: false,
  nums: 1,
  wxShare: {},
  shareParams: { params: {} },
  shareOptions: { serviceGoodsId: Number(route?.query.id) },
})

// 分享接口参数
const getShareUrl = (data: IShareMessageArguments) => {
  detailData.shareParams.client = UrlShareClentType.wxofficial
  detailData.shareParams.page = UrlSharePageType.serviceGoods
  if (process.client) {
    detailData.shareParams.url = `${window.location.origin}${shareUrl}`
  }
  detailData.shareParams.type = ShareType.url
  detailData.shareParams.params.serviceGoodsId = route?.query.id

  // 分享信息
  detailData.wxShare.title = data.title
  detailData.wxShare.desc = data.desc
  detailData.wxShare.imgUrl = data.imgUrl
}

// 获取团购详情
const getGoodsInfo = async () => {
  let data = {
    id: route?.query.id,
  }

  try {
    const goodsInfo: Result<any> = await queryServiceDetail(data)

    detailData.goodsInfo = goodsInfo.data

    // 分享信息
    getShareUrl({
      title: goodsInfo.data.title || "",
      desc: goodsInfo.data.description || "",
      imgUrl: goodsInfo.data.thumbnail || "",
    })

    detailData.isFav = goodsInfo.data.isFav
    if (!goodsInfo.data["image"]) {
      detailData.goodsInfo["image"] = goodsInfo.data.thumbnail
    }
    if (!goodsInfo.data["images"]) {
      detailData.goodsInfo["images"] = goodsInfo.data.thumbnail
    }
    detailData.goodsInfo["intro"] = goodsInfo.data.contentBody
    detailData.goodsInfo["name"] = goodsInfo.data.title
    detailData.goodsInfo["brief"] = goodsInfo.data.description

    const defaultSku: SkuItem = {
      price: goodsInfo.data.money,
    }

    detailData.chooseSku = defaultSku

    getGoodDescription()
    getGoodsParams()
  } catch (error: any) {
    showToast(error.msg)
  }
}
getGoodsInfo()

// 获取商品参数
const getGoodsParams = async () => {
  const goodParams: Result<Array<GoodParams>> = await queryGoodsParams({
    id: route?.query.id,
  })
  detailData.goodsInfo.goodParams = Array.isArray(goodParams.data)
    ? goodParams.data
    : []
}

// 获取商品关键词
const getGoodDescription = async () => {
  const goodDescription: Result<GoodDescription> =
    await queryServiceDescription()
  detailData.serviceDescription.commonQuestion =
    goodDescription.data.commonQuestion
  detailData.serviceDescription.delivery = goodDescription.data.delivery
  detailData.serviceDescription.service = goodDescription.data.service
}

// 倒计时
const renderCountdown: CountdownProps["render"] = ({
  hours,
  minutes,
  seconds,
}) => {
  let day = ""
  if (hours / 24 > 1) {
    day = `${String(Math.floor(hours / 24))} ${coreShopLang("天")}  ${String(
      hours % 24
    ).padStart(2, "0")} ${coreShopLang("时")}`
  } else {
    day = `${String(hours).padStart(2, "0")} ${coreShopLang("时")}`
  }
  return `
        ${day}
        ${String(minutes).padStart(2, "0")} ${coreShopLang("分")}
        ${String(seconds).padStart(2, "0")} ${coreShopLang("秒")}`
}

// 获取到所要购买的数量
const handleChangeGoodNum = (num: number) => {
  detailData.nums = num
}
// 用户选择某一个规格
const handleChangeGoodSku = (sku: SkuItem) => {
  detailData.chooseSku = sku
}

// 立即购买
const handleBuyNow = async (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  try {
    const data: Result<string> = await queryAddServiceOrder({
      id: route?.query.id,
    })

    if (data.status) {
      navigateTo(
        `/order/payment?orderId=${data.data}&type=${OrderTypeEnum.serviceOrder}&serviceId=${route?.query.id}`
      )
    } else {
      showToast(data.msg)
    }
  } catch (result: any) {
    showToast(result.msg)
  }
}

const handleProductRecommend = (id: number) => {
  navigateTo(`/goods/detail/${id}`)
}
</script>

<style lang="scss" scoped>
.product__option {
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
}
:deep(.product__option-label) {
  min-width: 1.5rem !important;
}
.duration {
  color: #000000;
}
</style>
