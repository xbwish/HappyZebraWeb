<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('售后详情')"></CoreshopTitle>

    <div>
      <!--状态图标-->
      <div class="cs-background-color-white box-shadow">
        <div
          class="cs-p-t-20 cs-p-20 return-success"
          v-if="
            afterSalesDetailData.status == billAftersalesStatus.success &&
            afterSalesDetailData.refundStatus == billRefundStatus.sTATUS_REFUND
          "
        >
          <img class="cs-w-140 cs-display-block" src="/images/are.png" alt="" />
          <div class="cs-text-align-center cs-font-size-14">
            {{ $t("退款成功") }}
          </div>
        </div>
        <div
          class="cs-p-t-20 cs-p-b-20"
          v-if="afterSalesDetailData.status == billAftersalesStatus.refuse"
        >
          <img
            class="cs-w-140 cs-display-block cs-margin-auto"
            src="/images/arg.png"
            alt=""
          />
          <p class="cs-text-align-center cs-font-size-14">
            {{ $t("申请驳回") }}
          </p>
          <p class="cs-text-align-center cs-font-size-14 label">
            {{ $t("驳回原因") }}：{{ afterSalesDetailData.mark }}
          </p>
        </div>
      </div>

      <!--退款单状态-->
      <div
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-font-size-16 cs-background-color-white after-sale-progress box-shadow"
      >
        <p class="cs-font-size-14 cs-font-weight-bold cs-m-b-10">
          {{ $t("售后单进度") }}
        </p>
        <div class="cs-font-size-14 status">
          <span v-if="afterSalesDetailData.statusName">{{
            afterSalesDetailData.statusName
          }}</span>
          <span v-if="afterSalesDetailData.reshipName">{{
            afterSalesDetailData.reshipName
          }}</span>
          <span v-if="afterSalesDetailData.refundName">{{
            afterSalesDetailData.refundName
          }}</span>
        </div>
      </div>

      <!--物流信息-->
      <div
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-border-radius-10 box-shadow"
        v-if="
          afterSalesDetailData.status == billAftersalesStatus.success &&
          afterSalesDetailData.reshipStatus == billReshipStatus.toBeReturned &&
          afterSalesDetailData.refundStatus != billRefundStatus.sTATUS_REFUND
        "
      >
        <div>
          <div class="cs-font-size-14 cs-font-weight-bold cs-m-b-10">
            {{ $t("退货邮寄信息") }}
          </div>
          <div>
            <p class="cs-font-size-14">
              <span class="cs-w-70 cs-display-inline-block label"
                >{{ $t("收货人") }}：</span
              ><span>{{ afterSalesDetailData.reshipInfo.reshipName }}</span>
              <span class="cs-m-l-20">{{
                afterSalesDetailData.reshipInfo.reshipMobile
              }}</span>
            </p>
            <p class="cs-font-size-14">
              <span class="cs-w-70 cs-display-inline-block label"
                >{{ $t("收货地址") }}：</span
              >
              <span>{{
                afterSalesDetailData.reshipInfo.reshipArea +
                afterSalesDetailData.reshipInfo.reshipAddress
              }}</span>
            </p>
          </div>
        </div>
      </div>

      <!--商品信息-->
      <div
        v-if="afterSalesDetailData.goodsInfo.length > 0"
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-background-color-white box-shadow"
      >
        <div>
          <div
            v-for="(item, index) in afterSalesDetailData.goodsInfo"
            :key="index"
            class="cs-display-flex"
          >
            <div>
              <img
                class="cs-w-100 cs-h-100 cs-border-radius-5"
                :src="item.imageUrl"
                alt=""
              />
            </div>
            <div
              class="cs-m-l-10 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
            >
              <p class="cs-font-size-14 cs-line-height-20 title">
                {{ item.name }}
              </p>
              <p v-if="item.addon" class="cs-font-size-12 cs-color-gray">
                {{ item.addon }}
              </p>
              <p class="cs-font-size-12 cs-color-red">
                {{ $t("售后单号") }}：{{ item.aftersalesId }}
              </p>
              <p class="cs-font-size-12 cs-color-red">
                {{ $t("退货数量") }}：x{{ item.nums }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!--商品状态-->
      <div
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-font-size-16 cs-background-color-white box-shadow"
      >
        <div
          class="cs-display-flex cs-font-size-14 cs-justify-content-space-between cs-m-b-5"
        >
          <p class="label">{{ $t("商品状态") }}</p>
          <p class="cs-m-l-40">{{ afterSalesDetailData.typeName }}</p>
        </div>
        <div
          class="cs-display-flex cs-font-size-14 cs-justify-content-space-between"
        >
          <p class="label">{{ $t("退款金额") }}</p>
          <p class="cs-m-l-40">
            {{ afterSalesDetailData.refund }}{{ $t("元") }}
          </p>
        </div>
      </div>

      <!--图片凭证-->
      <div
        v-if="afterSalesDetailData.images.length > 0"
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-background-color-white cs-font-size-14 box-shadow"
      >
        <div>
          <p class="cs-font-size-16 cs-font-weight-bold cs-m-b-10">
            {{ $t("图片凭证") }}
          </p>
          <Uploader
            v-model="afterSalesDetailData.images"
            :deletable="false"
            :max-count="afterSalesDetailData.images.length"
          ></Uploader>
        </div>
      </div>

      <!--订单信息-->
      <div
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-background-color-white cs-font-size-14 box-shadow"
      >
        <p class="cs-font-size-14 cs-font-weight-bold cs-m-b-10 label">
          {{ $t("问题描述") }}
        </p>
        <div>
          <p v-if="afterSalesDetailData.reason">
            {{ afterSalesDetailData.reason }}
          </p>
          <p v-else>{{ $t("暂无描述") }}</p>
        </div>
      </div>

      <!--请填写回邮商品物流信息-->
      <div
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-background-color-white cs-font-size-16 box-shadow"
        v-if="
          afterSalesDetailData.status == billAftersalesStatus.success &&
          afterSalesDetailData.reshipStatus == billReshipStatus.toBeReturned
        "
      >
        <div class="return-log-info">
          <p class="cs-font-size-14 cs-font-weight-bold cs-m-b-10">
            {{ $t("请填写回邮商品物流信息") }}
          </p>
          <Field
            v-model="afterSalesDetailData.logiCode"
            :placeholder="$t('请填写快递公司名称')"
            :label="$t('快递公司')"
          ></Field>
          <Field
            v-model="afterSalesDetailData.logiNo"
            :placeholder="$t('请填写物流单号')"
            :label="$t('物流单号')"
          ></Field>
        </div>
      </div>

      <!--快递公司-->
      <div
        class="cs-m-b-10 cs-border-solid cs-p-20 cs-border-radius-10 cs-font-size-16 box-shadow"
        v-if="
          afterSalesDetailData.status == billAftersalesStatus.success &&
          afterSalesDetailData.reshipStatus > billReshipStatus.toBeReturned
        "
      >
        <div>
          <p class="cs-font-size-14 cs-font-weight-bold cs-m-b-10">
            {{ $t("快递公司") }}
          </p>
          <div
            class="cs-font-size-14 cs-m-b-10 cs-display-flex cs-align-items-center"
          >
            <p class="cs-w-100 label">{{ $t("快递公司") }}</p>
            <p>{{ afterSalesDetailData.logiCode }}</p>
          </div>
          <div class="cs-font-size-14 cs-display-flex cs-align-items-center">
            <p class="cs-w-100 label">{{ $t("物流单号") }}</p>
            <p>{{ afterSalesDetailData.logiNo }}</p>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="cs-display-flex button">
        <CoreshopButton
          class="submit-logi-info"
          @on-click="handleSubmit"
          :text="$t('提交')"
          bg-color="#f56c6c"
          :size="btnSize.medium"
          round
          v-show="
            afterSalesDetailData.status == billAftersalesStatus.success &&
            afterSalesDetailData.reshipStatus == billReshipStatus.toBeReturned
          "
        />
        <CoreshopButton
          :text="$t('再次申请售后')"
          bg-color="#f56c6c"
          class="continue-apply-aftersale"
          v-show="
            (afterSalesDetailData.orderStatus == 1 &&
              afterSalesDetailData.status == billAftersalesStatus.success &&
              afterSalesDetailData.refundStatus !=
                billRefundStatus.sTATUS_NOREFUND &&
              afterSalesDetailData.refundStatus != 0) ||
            (afterSalesDetailData.orderStatus == 1 &&
              afterSalesDetailData.status == billAftersalesStatus.success &&
              afterSalesDetailData.reshipStatus ==
                billReshipStatus.ReceivedReturn)
          "
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryAftersalesinfo, querySendShip } from "@/composables/afterSales"
import type { Result } from "@/model/result"
import { Aftersalesinfo, AftersalesItems } from "@/model/member"
import { showToast, showSuccessToast, Uploader, Field, closeToast } from "vant"
import {
  btnSize,
  billAftersalesStatus,
  billRefundStatus,
  billReshipStatus,
} from "@/enum"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
interface IAfterSaleImage {
  url: string
  isImage: boolean
}

definePageMeta({
  layout: false,
})

const afterSalesDetailData: UnwrapRef<{
  typeName: string //售后类型显示
  mark: string
  goodsInfo: Array<AftersalesItems>
  images: Array<IAfterSaleImage>
  refund: number
  reason: string
  reshipInfo: any
  orderId: string
  orderStatus: number
  status: number
  statusName: string
  refundStatus: number
  refundName: string
  reshipStatus: number
  reshipName: string
  reshipId: string
  logiNo: string
  logiCode: string
}> = reactive({
  typeName: "", //售后类型显示
  mark: "", // 驳回原因
  goodsInfo: [],
  images: [],
  refund: 0,
  reason: "",
  reshipInfo: null,
  orderId: "",
  orderStatus: 0, //订单状态
  status: billAftersalesStatus.waitAudit, //售后单状态
  statusName: coreShopLang("再次申请售后"), //售后单状态文字描述
  refundStatus: 0, //退款单状态
  refundName: "",
  reshipStatus: 0, //退货单状态
  reshipName: "",
  reshipId: "",
  logiNo: "", //回填物流信息
  logiCode: "", //物流公司
})

// 获取订单详情
const getAfterSalesDetail = async () => {
  const AfterSalesDetail: Result<Aftersalesinfo> = await queryAftersalesinfo({
    id: useRoute().params.id,
  })
  let info = AfterSalesDetail.data.info

  if (info.type == 1) {
    afterSalesDetailData.typeName = coreShopLang("未收货")
  } else {
    afterSalesDetailData.typeName = coreShopLang("已收货")
  }

  afterSalesDetailData.goodsInfo = info.items
  afterSalesDetailData.refund = info.refundAmount
  afterSalesDetailData.images = info.images?.map((x) => ({
    url: x.imageUrl,
    isImage: true,
  }))
  afterSalesDetailData.reason = info.reason
  afterSalesDetailData.reshipInfo = AfterSalesDetail.data.reship
  afterSalesDetailData.orderId = info.orderId
  afterSalesDetailData.orderStatus = info.order.status

  if (info.mark) {
    afterSalesDetailData.mark = info.mark
  }

  if (info.status == billAftersalesStatus.waitAudit) {
    afterSalesDetailData.status = billAftersalesStatus.waitAudit
    afterSalesDetailData.statusName = coreShopLang("再次申请售后")
  } else if (info.status == billAftersalesStatus.success) {
    afterSalesDetailData.status = billAftersalesStatus.success
    afterSalesDetailData.statusName = coreShopLang("申请通过")

    //退款单状态
    if (info.billRefund) {
      if (info.billRefund.status == billRefundStatus.sTATUS_NOREFUND) {
        afterSalesDetailData.refundStatus = billRefundStatus.sTATUS_NOREFUND
        afterSalesDetailData.refundName = coreShopLang("未退款")
      } else if (info.billRefund.status == billRefundStatus.sTATUS_REFUND) {
        afterSalesDetailData.refundStatus = billRefundStatus.sTATUS_REFUND
        afterSalesDetailData.refundName = coreShopLang("退款成功")
      }
    }

    //退货单状态
    if (info.billReship) {
      afterSalesDetailData.reshipId = info.billReship.reshipId
      if (info.billReship.status == billReshipStatus.toBeReturned) {
        afterSalesDetailData.reshipStatus = billReshipStatus.toBeReturned
        afterSalesDetailData.reshipName = coreShopLang("待发退货")
      } else if (info.billReship.status == billReshipStatus.transit) {
        afterSalesDetailData.reshipStatus = billReshipStatus.transit
        afterSalesDetailData.reshipName = coreShopLang("待收退货")
        afterSalesDetailData.logiNo = info.billReship.logiNo
        afterSalesDetailData.logiCode = info.billReship.logiCode
      } else {
        afterSalesDetailData.reshipStatus = billReshipStatus.ReceivedReturn
        afterSalesDetailData.reshipName = coreShopLang("已收退货")
        afterSalesDetailData.logiNo = info.billReship.logiNo
        afterSalesDetailData.logiCode = info.billReship.logiCode
      }
    }
  } else {
    afterSalesDetailData.status = billAftersalesStatus.refuse
    afterSalesDetailData.statusName = coreShopLang("申请驳回")
  }
}
getAfterSalesDetail()

// 提交
const handleSubmit = async () => {
  if (!afterSalesDetailData.logiCode) {
    showToast(coreShopLang("请填写快递公司名称"))
    return
  }

  if (!afterSalesDetailData.logiNo) {
    showToast(coreShopLang("请填写物流单号"))
    return
  }

  try {
    const getSendShip: Result<any> = await querySendShip({
      logiNo: afterSalesDetailData.logiNo,
      logiCode: afterSalesDetailData.logiCode,
      reshipId: afterSalesDetailData.reshipId,
    })
    showSuccessToast(getSendShip.msg)
    setTimeout(() => {
      closeToast()
      return navigateTo("/member/afterSales", { replace: true })
    }, 1000)
  } catch (error: any) {
    showToast(error?.msg)
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: -webkit-box !important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical !important;
}

.after-sale-progress {
  text-align: center;

  .status {
    color: #f56c6c;
    text-align: center;
  }
}

.box-shadow {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;
}

.label {
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #999999;
}

.return-log-info {
  .van-cell {
    padding-left: 0;
  }
}

.button {
  position: fixed;
  bottom: 20px;
  width: 100%;
  margin: 0 10px;

  .continue-apply-aftersale,
  .submit-logi-info {
    width: 95%;
  }
}

.return-success {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
