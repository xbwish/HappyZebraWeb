<template>
  <NuxtLayout name="personal-center">
    <coreshop-title :title="$t('团购详情')"></coreshop-title>
    <div style="padding-bottom: 1.5rem">
      <div class="detail-box">
        <CoreshopGoodDetailProductInfo
          :goodDetail="detailData.goodsInfo"
          :chooseSku="detailData.chooseSku"
          :serviceDescription="detailData.serviceDescription"
          :sharePageType="UrlSharePageType.group"
          @handleShowSku="handleShowSku"
          @handleChangeGoodSku="handleChangeGoodSku"
        >
          <template #countdown>
            <div
              class="cs-font-size-12 cs-color-gray cs-display-flex cs-align-items-center"
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
          </template>
          <template #meta>
            <ul
              class="cs-display-flex cs-text-align-center cs-justify-content-space-between"
            >
              <li>
                <CoreshopLanguage :text="$t('销量')" />:
                <a href="javascript:;">{{
                  detailData.goodsInfo?.buyCount || "0"
                }}</a>
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
                  :sharePageType="UrlSharePageType.group"
                >
                </CoreshopShare>
              </li>
            </ul>
            <div
              class="groupPromotionResult"
              v-if="detailData.goodsInfo?.groupPromotionResult"
            >
              <p class="cs-font-size-12">{{ $t("当前团购活动规则") }}：</p>
              <p class="cs-font-size-13">
                {{ detailData.goodsInfo.groupPromotionResult }}
              </p>
              <Icon
                class="icon"
                name="close"
                size="20"
                @click="detailData.goodsInfo.groupPromotionResult = null"
              />
            </div>
          </template>
        </CoreshopGoodDetailProductInfo>

        <!-- 商品详情 -->
        <CoreshopGoodDetailProductDetailAndEvaluate
          :id="route.query.id"
          :goodParams="detailData.goodParams"
          :intro="detailData.goodsInfo?.intro"
          :commonQuestion="detailData.serviceDescription.commonQuestion"
        />

        <!-- 商品规格弹框 -->
        <CoreshopGoodDetailProductSku
          :show="detailData.showSku"
          :goodDetail="detailData.goodsInfo"
          @handleChangeGoodNum="handleChangeGoodNum"
          :chooseSku="detailData.chooseSku"
          @handleShowSku="handleShowSku"
          @handleChangeGoodSku="handleChangeGoodSku"
        >
          <template #button>
            <div
              class="cs-m-t-20 cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100"
            >
              <CoreshopButton
                class="cs-percent-w-100"
                bg-color="#e84f5d"
                :size="btnSize.medium"
                @click="handleBuyNow($event)"
              >
                <CoreshopLanguage :text="$t('立即团购')" />
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
                class="cs-percent-w-100"
                bg-color="#e84f5d"
                :size="btnSize.medium"
                @click="handleShowSku"
              >
                <CoreshopLanguage :text="$t('立即团购')" />
              </CoreshopButton>
            </div>
          </template>
        </CoreshopGoodDetailProductFooter>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryGroupInfo, queryGoodsParams } from "@/composables/activity"
import type { Result } from "@/model/result"
import { SkuItem, GoodDescription } from "@/model/product"
import { queryServiceDescription } from "@/composables/productService"
import * as cartService from "@/composables/cartService"
import {
  OrderTypeEnum,
  OrderBuyProductModeEnum,
  ShareType,
  UrlSharePageType,
  UrlShareClentType,
  shareUrl,
  btnSize,
} from "@/enum"
import {
  GoodParams,
  IWxShare,
  IShareParams,
  IShareMessageArguments,
} from "@/model"
import { IGroupDetail } from "@/model/activity"
import { showToast, Icon } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const route = useRoute()

const detailData: UnwrapRef<{
  goodsInfo: IGroupDetail | null
  chooseSku: SkuItem | null
  serviceDescription: GoodDescription
  nums: number
  goodParams: Array<GoodParams>
  showSku: boolean
  wxShare: IWxShare
  shareParams: IShareParams
  shareOptions: { groupId: number }
}> = reactive({
  goodsInfo: null,
  chooseSku: null,
  serviceDescription: {
    commonQuestion: [],
    delivery: [],
    service: [],
  },
  nums: 1,
  goodParams: [],
  showSku: false,
  wxShare: {},
  shareParams: { params: {} },
  shareOptions: { groupId: Number(route?.query.id) },
})

// 分享接口参数
const getShareUrl = (data: IShareMessageArguments) => {
  detailData.shareParams.client = UrlShareClentType.wxofficial
  detailData.shareParams.page = UrlSharePageType.group
  if (process.client) {
    detailData.shareParams.url = `${window.location.origin}${shareUrl}`
  }
  detailData.shareParams.type = ShareType.url
  detailData.shareParams.params.groupId = route?.query.id

  // 分享信息
  detailData.wxShare.title = data.title
  detailData.wxShare.desc = data.desc
  detailData.wxShare.imgUrl = data.imgUrl
}

// 获取团购详情
const getGoodsInfo = async () => {
  const { message } = useCoreShopMessage()
  let data = {
    id: route?.query.id,
    type: OrderTypeEnum.group,
    needSku: true,
  }

  const goodsInfo: Result<IGroupDetail> = await queryGroupInfo(data)
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

    // 分享信息
    getShareUrl({
      title: goodsInfo.data.name || "",
      desc: goodsInfo.data.brief || "",
      imgUrl: goodsInfo.data.image || "",
    })

    const defaultSku: SkuItem =
      goodsInfo.data.skuList?.sku_list?.find(
        (x) => parseFloat(x._id as string) === goodsInfo.data.product?.id
      ) || {}
    detailData.chooseSku = defaultSku
  }
}

/** 获取商品关键词 */
const getGoodDescription = async () => {
  const goodDescription: Result<GoodDescription> =
    await queryServiceDescription()
  detailData.serviceDescription.commonQuestion =
    goodDescription.data.commonQuestion
  detailData.serviceDescription.delivery = goodDescription.data.delivery
  detailData.serviceDescription.service = goodDescription.data.service
}

/** 获取商品参数 */
const getGoodsParams = async () => {
  const goodParams: Result<Array<GoodParams>> = await queryGoodsParams({
    id: route?.query.id,
  })
  detailData.goodParams = goodParams.data
}

getGoodsInfo()
getGoodDescription()
getGoodsParams()

// 获取到所要购买的数量
const handleChangeGoodNum = (num: number) => {
  detailData.nums = num
}
// 用户选择某一个规格
const handleChangeGoodSku = (sku: SkuItem) => {
  detailData.chooseSku = sku
}

// 立即拼团
const handleBuyNow = async (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  const result: Result<number> = await cartService.cartAddCart({
    nums: detailData.nums,
    productId: detailData.chooseSku?._id as string,
    type: OrderBuyProductModeEnum.buyNow,
    cartType: OrderTypeEnum.group,
    objectId: detailData.goodsInfo?.groupId,
  })

  if (!result.status) {
    showToast(result.msg)
    return
  }
  navigateTo(
    `/order/submit?cartIds=${result.data}&orderType=${OrderTypeEnum.group}&objectId=${detailData.goodsInfo?.groupId}`
  )
}

const handleShowSku = () => {
  detailData.showSku = !detailData.showSku
}
</script>

<style lang="scss" scoped>
.groupPromotionResult {
  position: relative;
  margin-top: 5px;
  background-color: rgba(240, 160, 32, 0.18);
  color: #f0a020;
  padding: 5px;
  border-radius: 5px;
  .icon {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }
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
