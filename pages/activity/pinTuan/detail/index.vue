<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('团购详情')"></CoreshopTitle>
    <div style="padding-bottom: 1.5rem">
      <div class="detail-box">
        <CoreshopGoodDetailProductInfo
          :goodDetail="detailData.goodsInfo"
          :chooseSku="detailData.chooseSku"
          :sharePageType="UrlSharePageType.pinTuan"
          :teamId="detailData.teamId"
          @handleShowSku="handleCloseSku"
          :serviceDescription="detailData.serviceDescription"
          @handleChangeGoodSku="handleChangeGoodSku"
        >
          <template #countdown>
            <div
              class="cs-font-size-12 cs-color-gray cs-display-flex cs-align-items-center"
              v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 1"
            >
              <CoreshopLanguage :text="$t('仅剩')" />：
              <van-count-down
                :time="detailData.goodsInfo?.groupTimestamp * 1000"
                class="cs-display-flex cs-align-items-center"
              >
                <template #default="timeData">
                  <span class="block">{{ timeData.days }}</span>
                  <span class="colon">{{ $t("天") }}</span>
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
            <div
              class="cs-font-size-12 cs-color-gray cs-display-flex cs-align-items-center"
              v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 2"
            >
              <CoreshopLanguage :text="$t('即将开团')" />：
              <van-count-down
                :time="detailData.goodsInfo?.groupTimestamp * 1000"
                class="cs-display-flex cs-align-items-center"
              >
                <template #default="timeData">
                  <span class="block">{{ timeData.days }}</span>
                  <span class="colon">{{ $t("天") }}</span>
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
          </template>
          <template #meta>
            <ul
              class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
            >
              <li class="product__meta-availability">
                <CoreshopLanguage :text="$t('已售')" />:
                <span class="text-success">{{
                  detailData.goodsInfo?.buyPinTuanCount || "0"
                }}</span>
              </li>
              <li>
                <CoreshopLanguage :text="$t('销量')" />:
                <a href="">{{ detailData.goodsInfo?.buyCount || "0" }}</a>
              </li>
              <li>
                <CoreshopLanguage :text="$t('库存剩余')" />:
                {{ detailData.goodsInfo?.product?.stock || 0 }}
              </li>
              <li>
                <CoreshopShare
                  :wxShare="detailData.wxShare"
                  :shareParams="detailData.shareParams"
                  :shareOptions="detailData.shareOptions"
                  :sharePageType="UrlSharePageType.pinTuan"
                >
                </CoreshopShare>
              </li>
            </ul>
          </template>
        </CoreshopGoodDetailProductInfo>
      </div>

      <!-- 开团信息 -->
      <div class="pingtuan-box">
        <div class="title">
          <p class="cs-font-weight-bold">{{ $t("开团信息") }}</p>
        </div>
        <div>
          <div
            v-if="
              detailData.goodsInfo?.pinTuanRecord &&
              detailData.goodsInfo?.pinTuanRecord?.length > 0
            "
          >
            <p class="cs-font-size-12 cs-p-b-5">
              {{ detailData.goodsInfo.pinTuanRecordNums || 0
              }}{{ $t("人在拼单可直接参与") }}
            </p>
            <ul>
              <li
                v-for="item in detailData.goodsInfo?.pinTuanRecord"
                :key="item.id"
                class="cs-p-t-5 cs-p-b-5 cs-display-flex cs-align-items-center cs-justify-content-space-between"
              >
                <div class="cs-percent-w-40">
                  <p class="cs-font-size-12">
                    {{ $t("还差") }}
                    <span class="cs-color-red"
                      >{{ item.teamNums || "" }}{{ $t("人") }}</span
                    >
                    {{ $t("拼成") }}
                  </p>
                  <p class="cs-font-size-18 cs-color-red">
                    {{ $t("剩余") }}：
                    <NCountdown
                      :render="renderPingTuanCountdown"
                      :duration="item.lastTime * 1000"
                      :active="true"
                    />
                  </p>
                </div>
                <div class="cs-position-relative cs-percent-w-40 cs-h-30">
                  <img
                    v-for="(items, idx) in item.teams"
                    :key="items.userAvatar"
                    :class="[
                      'cs-m-l-' + idx * 5,
                      'userAvatar cs-w-30 cs-h-30 cs-percent-border-radius-50',
                    ]"
                    :src="items.userAvatar"
                    alt=""
                  />
                </div>

                <div>
                  <CoreshopButton
                    v-if="item.isOverdue"
                    :text="$t('已结束')"
                    text-color="#000"
                    :size="btnSize.medium"
                    :bordered="true"
                  />
                  <CoreshopButton
                    v-else
                    :text="$t('去拼单')"
                    @on-click="
                      handlePingTuanBuyNow(
                        OrderBuyProductModeEnum.buyNow,
                        item.teamId
                      )
                    "
                    :size="btnSize.medium"
                    bg-color="#f56c6c"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="cs-font-size-12 cs-color-gray">
              {{ $t("暂无开团信息") }}
            </p>
          </div>
        </div>
      </div>

      <!-- 商品详情 -->
      <CoreshopGoodDetailProductDetailAndEvaluate
        :goodParams="detailData.goodParams"
        :id="route.query.id"
        :intro="detailData.goodsInfo?.intro"
        :commonQuestion="detailData.serviceDescription.commonQuestion"
      />

      <!-- 商品规格弹框 -->
      <CoreshopGoodDetailProductSku
        :show="detailData.showSku"
        :goodDetail="detailData.goodsInfo"
        @handleChangeGoodNum="handleChangeGoodNum"
        :chooseSku="detailData.chooseSku"
        @handleShowSku="handleCloseSku"
        @handleChangeGoodSku="handleChangeGoodSku"
      >
        <template #button>
          <div
            class="cs-m-t-20 cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100"
          >
            <!-- <CoreshopButton class="cs-percent-w-48" bg-color="#404040"
                            @click="handleBuyNow(OrderBuyProductModeEnum.addCart)" :size="btnSize.medium">
                            NT${{ detailData.goodsInfo?.product?.price }}
                            <CoreshopLanguage class="cs-font-size-12" text="单独购买" />
                        </CoreshopButton>
                        <CoreshopButton v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 1"
                            class="cs-percent-w-48" bg-color="#f56c6c"
                            @click="handleBuyNow(OrderBuyProductModeEnum.buyNow)" :size="btnSize.medium">
                            NT${{ detailData.pinTuanPrice }}
                            <CoreshopLanguage class="cs-font-size-12" text="发起拼团" />
                        </CoreshopButton>
                        <CoreshopButton v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 2"
                            class="cs-percent-w-48" bg-color="#f56c6c" :size="btnSize.medium">
                            NT${{ detailData.pinTuanPrice }}
                            <CoreshopLanguage text="即将开团" />
                        </CoreshopButton>
                        <CoreshopButton v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 3"
                            class="cs-percent-w-48" bg-color="#f56c6c" :size="btnSize.medium">
                            NT${{ detailData.pinTuanPrice }}
                            <CoreshopLanguage text="拼团已结束" />
                        </CoreshopButton> -->
            <CoreshopButton
              class="cs-flex-1"
              bg-color="#f56c6c"
              @click="handleBuyNow"
              :size="btnSize.medium"
            >
              {{ $t("立即购买") }}
            </CoreshopButton>
          </div>
        </template>
      </CoreshopGoodDetailProductSku>

      <!-- 底部栏 -->
      <CoreshopGoodDetailProductFooter>
        <template #button>
          <div
            class="cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100"
          >
            <CoreshopButton
              class="cs-percent-w-48"
              bgColor="#404040"
              @click="handleShowSku(OrderBuyProductModeEnum.addCart)"
              :size="btnSize.medium"
            >
              NT${{ detailData.goodsInfo?.product?.price }}
              <CoreshopLanguage
                class="cs-font-size-12"
                :text="$t('单独购买')"
              />
            </CoreshopButton>
            <CoreshopButton
              v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 1"
              class="cs-percent-w-48"
              bg-color="#f56c6c"
              @click="handleShowSku(OrderBuyProductModeEnum.buyNow)"
              :size="btnSize.medium"
            >
              NT${{ detailData.pinTuanPrice }}
              <CoreshopLanguage
                class="cs-font-size-12"
                :text="$t('发起拼团')"
              />
            </CoreshopButton>
            <CoreshopButton
              v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 2"
              class="cs-percent-w-48"
              bg-color="#f56c6c"
              :size="btnSize.medium"
            >
              NT${{ detailData.pinTuanPrice }}
              <CoreshopLanguage :text="$t('即将开团')" />
            </CoreshopButton>
            <CoreshopButton
              v-if="detailData.goodsInfo?.pinTuanRule?.pinTuanStartStatus == 3"
              class="cs-percent-w-48"
              bg-color="#e84f5d"
              :size="btnSize.medium"
            >
              class="cs-percent-w-48" bg-color="#f56c6c" size="medium">
            </CoreshopButton>
          </div>
        </template>
      </CoreshopGoodDetailProductFooter>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import type { CountdownProps } from "naive-ui"
import { NCountdown } from "naive-ui"
import { queryPinTuanGoodsInfo, queryGoodsParams } from "@/composables/activity"
import type { Result } from "@/model/result"
import { coreShopAuthCookie } from "@/consts"
import { SkuItem, GoodDescription } from "@/model/product"
import { queryServiceDescription } from "@/composables/productService"
import * as cartService from "@/composables/cartService"
import { IpinTuan } from "@/model/activity"
import { showToast } from "vant"
import {
  GoodParams,
  IWxShare,
  IShareParams,
  IShareMessageArguments,
} from "@/model"
import {
  OrderTypeEnum,
  OrderBuyProductModeEnum,
  ShareType,
  UrlSharePageType,
  UrlShareClentType,
  shareUrl,
  btnSize,
} from "@/enum"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const route = useRoute()

const detailData: UnwrapRef<{
  goodsInfo: IpinTuan
  chooseSku: SkuItem
  serviceDescription: GoodDescription
  nums: number
  discountAmount: number //拼团优惠金额
  pinTuanPrice: number
  goodParams: Array<GoodParams>
  teamId: number
  showSku: boolean
  wxShare: IWxShare
  shareParams: IShareParams
  shareOptions: { groupId: number }
  pinTuanType: OrderBuyProductModeEnum
}> = reactive({
  goodsInfo: {},
  chooseSku: {},
  serviceDescription: {
    commonQuestion: [],
    delivery: [],
    service: [],
  },
  nums: 1,
  discountAmount: 0,
  pinTuanPrice: 0,
  goodParams: [],
  teamId: 0,
  showSku: false,
  wxShare: {},
  shareParams: { params: {} },
  shareOptions: { groupId: Number(route?.query.id) },
  pinTuanType: OrderBuyProductModeEnum.addCart,
})

// 分享接口参数
const getShareUrl = (data: IShareMessageArguments) => {
  detailData.shareParams.client = UrlShareClentType.wxofficial
  detailData.shareParams.page = UrlSharePageType.pinTuan
  if (process.client) {
    detailData.shareParams.url = `${window.location.origin}${shareUrl}`
  }
  detailData.shareParams.type = ShareType.url
  detailData.shareParams.params.groupId = route?.query.id
  detailData.shareParams.params.goodsId = route?.query.goodsId
  detailData.shareParams.params.teamId = route?.query.teamId || 0

  // 分享信息
  detailData.wxShare.title = data.title
  detailData.wxShare.desc = data.desc
  detailData.wxShare.imgUrl = data.imgUrl
}

// 获取团购详情
const getGoodsInfo = async () => {
  const { message } = useCoreShopMessage()
  let data: any = {
    id: route?.query.id,
    data: true,
  }

  const cookie = useCookie(coreShopAuthCookie)
  if (cookie.value) {
    data["token"] = cookie.value
  }

  const goodsInfo: Result<IpinTuan> = await queryPinTuanGoodsInfo(data)

  if (Object.keys(goodsInfo.data).length < 1) {
    message.warning(coreShopLang("该商品不存在"), {
      duration: 2000,
      onAfterLeave: () => {
        navigateTo(`/activity/groupBuying`)
      },
    })
  } else if (!goodsInfo.data.isMarketable) {
    message.warning(coreShopLang("该商品已下架"), {
      duration: 2000,
      onAfterLeave: () => {
        navigateTo(`/activity/groupBuying`)
      },
    })
  } else {
    detailData.goodsInfo = goodsInfo.data

    if (detailData.goodsInfo?.skuList?.sku_list.length) {
      detailData.goodsInfo?.skuList?.sku_list.forEach((item: any) => {
        let price =
          item?.price - (detailData.goodsInfo?.pinTuanRule?.discountAmount || 0)
        item["pingTuanPrice"] = price >= 0 ? price : 0
        item["defaultPrice"] = item?.price
      })
    }

    console.log(detailData.goodsInfo?.skuList?.sku_list)
    // 分享信息
    getShareUrl({
      title: goodsInfo.data.name || "",
      desc: goodsInfo.data.brief || "",
      imgUrl: goodsInfo.data.image || "",
    })

    detailData.goodsInfo["groupTimestamp"] = Number(
      goodsInfo.data.pinTuanRule?.lastTime
    )

    const defaultSku: SkuItem =
      goodsInfo.data.skuList?.sku_list?.find(
        (x) => parseFloat(x._id as string) === goodsInfo.data.product?.id
      ) || {}

    detailData.chooseSku = defaultSku

    detailData.discountAmount = Number(
      parseFloat(String(goodsInfo.data.pinTuanRule?.discountAmount)).toFixed(2)
    )

    detailData.pinTuanPrice = moneySub(
      String(goodsInfo.data?.product?.price),
      String(detailData.discountAmount)
    )
  }
}

// 获取商品参数
const getGoodsParams = async () => {
  const goodParams: Result<Array<GoodParams>> = await queryGoodsParams({
    id: route?.query.id,
  })
  detailData.goodsInfo.goodParams = goodParams.data
}

// 获取商品关键词
const getGoodDescription = async () => {
  const goodDescription: Result<GoodDescription> =
    await queryServiceDescription()
  detailData.serviceDescription.commonQuestion =
    goodDescription.data?.commonQuestion || []
  detailData.serviceDescription.delivery = goodDescription.data?.delivery || []
  detailData.serviceDescription.service = goodDescription.data?.service || []
}

getGoodsInfo()
getGoodDescription()
getGoodsParams()

// 开团信息里的倒计时
const renderPingTuanCountdown: CountdownProps["render"] = ({
  hours,
  minutes,
  seconds,
}) => {
  return `
    ${String(minutes).padStart(2, "0")}  ${coreShopLang("分")}
    ${String(seconds).padStart(2, "0")}  ${coreShopLang("秒")}`
}

// 获取到所要购买的数量
const handleChangeGoodNum = (num: number) => {
  detailData.nums = num
}

// 用户选择某一个规格
const handleChangeGoodSku = (sku: SkuItem) => {
  detailData.chooseSku = sku
}

// 立即拼团
const handleBuyNow = async () => {
  const result: Result<number> = await cartService.cartAddCart({
    nums: detailData.nums,
    productId: detailData.chooseSku?._id || "",
    type: detailData.pinTuanType, // 1 加入购物车即单独购买  2购买
    cartType: OrderTypeEnum.pinTuan,
    objectId: Number(route?.query.id),
    teamId: detailData.teamId,
  })

  if (!result.status) {
    showToast(result.msg as string)
    return
  }
  navigateTo(
    `/order/submit?cartIds=${result.data}&orderType=${
      OrderTypeEnum.pinTuan
    }&objectId=${route?.query.id}${
      detailData.teamId != 0 ? `&teamId=${detailData.teamId}` : ``
    }`
  )
}

const handlePingTuanBuyNow = async (
  type: OrderBuyProductModeEnum,
  teamId: number = 0
) => {
  detailData.pinTuanType = type
  detailData.teamId = teamId
  await handleBuyNow()
}

const handleShowSku = (type: OrderBuyProductModeEnum) => {
  detailData.pinTuanType = type
  detailData.showSku = !detailData.showSku
  detailData.goodsInfo?.skuList?.sku_list.forEach((item: any) => {
    if (type === OrderBuyProductModeEnum.addCart) {
      item.price = item.defaultPrice
    } else {
      item.price = item.pingTuanPrice
    }
  })
}

const handleCloseSku = () => {
  detailData.showSku = !detailData.showSku
}
</script>

<style lang="scss" scoped>
.pingtuan-box {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.2rem;
    font-size: 0.35rem;
  }

  ul {
    max-height: 220px;
    overflow: auto;
  }
}

.userAvatar {
  position: absolute;
  top: 0;
  border: 2px solid #dcdcdc;
  background-color: #fff;
}

.block {
  min-width: 20px;
  padding: 0 2px;
  height: 24px;
  background-color: #3c9cff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.colon {
  color: #3c9cff;
  margin: 0 3px;
}
</style>
