<template>
  <NuxtLayout name="personal-center">
    <div style="padding-bottom: 1.5rem">
      <CoreshopTitle :title="$t('提交售后')"></CoreshopTitle>
      <div class="cs-font-size-14 product-contain">
        <p class="cs-font-size-16 cs-font-weight-bold cs-m-b-10">
          {{ $t("请选择退货商品和数量") }}
        </p>
        <div>
          <ul>
            <li
              v-for="(item, key) in submitState.items"
              :key="key"
              class="cs-p-t-15 cs-p-b-15 cs-cursor-pointer cs-display-flex cs-align-items-center cs-justify-content-space-between cs-border-solid-bottom product-item"
            >
              <div
                class="cs-percent-w-30 cs-display-flex cs-align-items-center cs-justify-content-space-between cs-percent-w-18"
                @click="handleChangeGood(item, key)"
              >
                <div class="check-product" @click="handleChangeGood(item, key)">
                  <Checkbox
                    v-model="item.checked"
                    :disabled="item.disabled"
                    checked-color="#f56c6c"
                  />
                </div>
                <div class="cs-percent-w-80">
                  <img
                    class="cs-percent-w-100 cs-border-radius-5"
                    :src="item.imageUrl"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="cs-percent-w-68 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
              >
                <div
                  class="cs-percent-h-100 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
                >
                  <p class="cs-font-size-14 name">{{ item.name }}</p>
                  <p class="cs-font-size-14 cs-color-gray">{{ item.addon }}</p>
                  <p class="cs-font-size-12 cs-color-gray">
                    <span class="cs-m-r-20"
                      >{{ $t("购买数") }}：{{ item.nums }}</span
                    >
                    <span class="cs-m-r-20"
                      >{{ $t("货数量") }}：{{ item.sendNums }}</span
                    >
                    <span>{{ $t("已退数量") }}：{{ item.reshipNums }}</span>
                  </p>
                </div>
                <div
                  class="cs-display-flex cs-align-items-center return-number"
                  v-if="!item.disabled"
                >
                  <span class="cs-font-size-12 cs-color-gray"
                    >{{ $t("您要退货数量") }}：</span
                  >
                  <Field
                    class="num"
                    size="normal"
                    v-model="item.returnNums"
                    type="digit"
                    :placeholder="$t('请输入申请退货数量')"
                  ></Field>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="cs-m-b-20 cs-background-color-white cs-p-10 cs-font-size-14 return-money"
      >
        <div
          class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-m-b-10"
        >
          <div>{{ $t("是否发货") }}</div>
          <div class="cs-display-flex cs-align-items-center">
            <RadioGroup
              v-model="submitState.deliveryState"
              direction="horizontal"
            >
              <Radio
                v-for="(item, index) in submitState.typeList"
                :name="item.value"
                :key="index"
                :disabled="item.disabled"
              >
                {{ item.name }}</Radio
              >
            </RadioGroup>
          </div>
        </div>
        <div
          class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-m-b-10"
        >
          <div>{{ $t("退款金额") }}</div>
          <div>
            <Field
              size="normal"
              v-model="submitState.refund"
              type="digit"
              placeholder=""
            ></Field>
          </div>
        </div>
        <div class="cs-font-size-12 cs-text-align-right">
          {{ $t("可修改最多") }}NT${{ submitState.maxRefund }}，{{
            $t("含发货邮费")
          }}NT${{ submitState.costFreight }}
        </div>
      </div>

      <div
        class="cs-m-b-20 cs-background-color-white cs-p-10 cs-font-size-14 box-show"
      >
        <p class="cs-font-size-16 cs-font-weight-bold cs-m-b-10">
          {{ $t("上传凭证") }}
        </p>

        <Uploader
          v-model="submitState.tempUploadImages"
          :max-count="5"
          :after-read="(files) => handlerUploadVoucher(files)"
          :before-delete="(file, detail) => onDeleteImage(file, detail)"
        />
      </div>

      <div
        class="cs-m-b-20 cs-background-color-white cs-p-10 cs-font-size-14 box-show"
      >
        <p class="cs-font-size-16 cs-font-weight-bold cs-m-b-10">
          {{ $t("问题描述") }}
        </p>
        <Field
          class="desc-pro"
          v-model="submitState.reason"
          rows="2"
          autosize
          type="textarea"
          :maxlength="200"
          :placeholder="$t('请您在此描述问题')"
        />
      </div>

      <div class="btn-box">
        <CoreshopButton
          class="cs-percent-w-100"
          size="small"
          @on-click="handleSubmit"
          :text="$t('提交')"
          bg-color="#e84f5d"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryOrderDetail, queryAddAfterSales } from "@/composables/afterSales"
import type { Result } from "@/model/result"
import { UploadFileResult } from "@/model/file"
import * as fileService from "@/composables/file"
import { AfterSalesDetail } from "@/model/member"
import {
  showToast,
  Checkbox,
  Field,
  Uploader,
  RadioGroup,
  Radio,
  UploaderFileListItem,
  showSuccessToast,
} from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
export interface Itype {
  value: string
  name: string
  checked: boolean
  disabled: boolean
}

definePageMeta({
  title: "提交售后",
  layout: false,
})

const submitState: UnwrapRef<{
  orderId: string | string[]
  typeList: Array<Itype>
  typeListByAli: Array<Itype>
  items: Array<any>
  refund: any
  maxRefund: any
  refundShow: number
  costFreight: number
  reason: string
  images: Array<any>
  deliveryState?: string
  tempUploadImages?: Array<UploaderFileListItem>
}> = reactive({
  orderId: useRoute()?.params?.id,
  typeList: [
    {
      value: "1",
      name: coreShopLang("未发货"),
      checked: true,
      disabled: false,
    },
    {
      value: "2",
      name: coreShopLang("已发货"),
      checked: false,
      disabled: false,
    },
  ],
  typeListByAli: [
    {
      value: "1",
      name: coreShopLang("仅退款"),
      checked: true,
      disabled: false,
    },
    {
      value: "2",
      name: coreShopLang("退货退款"),
      checked: false,
      disabled: false,
    },
  ],
  items: [],
  refund: undefined, //退款金额，等于已支付的金额减去已退款的金额
  maxRefund: 0, //最大可退款金额
  refundShow: 0,
  costFreight: 0, //运费
  reason: "",
  images: [], //图片
  deliveryState: undefined, // 发货状态 1： 未发货， 2：已发货
  tempUploadImages: [],
})

const queryOrder = async () => {
  const orderDetail: Result<any> = await queryOrderDetail({
    id: useRoute().params.id,
  })
  //如果不是未支付的，已取消的，已完成的状态，就都可以售后
  if (
    orderDetail.data.globalStatus != 1 &&
    orderDetail.data.globalStatus != 6 &&
    orderDetail.data.globalStatus != 7
  ) {
    //判断是已付款未发货，如果是，就禁用退货
    let typeList = submitState.typeList
    if (orderDetail.data.globalStatus == 2) {
      typeList[1].disabled = true
    }

    //设置已选中的商品
    let nums = 0
    let returnNums: number = 0
    let returnStatus
    for (var i = 0; i < orderDetail.data.items.length; i++) {
      if (
        orderDetail.data.items[i].nums >= orderDetail.data.items[i].reshipNums
      ) {
        returnNums =
          orderDetail.data.items[i].nums - orderDetail.data.items[i].reshipNums
      }
      if (returnNums > 0) {
        returnStatus = true
      }
      orderDetail.data.items[i].id = orderDetail.data.items[i].id.toString()
      orderDetail.data.items[i].returnNums = returnNums
      orderDetail.data.items[i].returnStatus = returnStatus
      orderDetail.data.items[i].checked = false

      if (orderDetail.data.items[i].returnNums > 0) {
        orderDetail.data.items[i].disabled = false
      } else {
        orderDetail.data.items[i].disabled = true
      }
    }
    submitState.items = orderDetail.data.items

    submitState.refund = formatMoney(
      orderDetail.data.orderAmount - orderDetail.data.refunded,
      2,
      ""
    )
    submitState.maxRefund = formatMoney(
      orderDetail.data.orderAmount - orderDetail.data.refunded,
      2,
      ""
    )
    submitState.costFreight = orderDetail.data.costFreight //运费
    submitState.refundShow =
      orderDetail.data.payedAmount - orderDetail.data.refunded
    submitState.typeList = typeList
  }
}
queryOrder()

const handleChangeSend = (index: number) => {
  submitState.typeList.forEach((k, v) => {
    if (v === index) {
      k.checked = true
    } else {
      k.checked = false
    }
  })
}

/** 上传凭证 */
const handlerUploadVoucher = async (uploadFileInfo: UploaderFileListItem) => {
  if (!uploadFileInfo?.file) {
    return
  }

  let uploadResult: Result<UploadFileResult> = await fileService.uploadImage(
    uploadFileInfo.file
  )

  if (!uploadResult.status) {
    showToast(coreShopLang("网络异常请重试"))
    return
  }
  const fileUrl: string = uploadResult.data.fileUrl

  submitState.images.push({
    id: fileUrl,
    name: fileUrl,
    status: "finished",
    url: fileUrl,
  })
}

const onDeleteImage = (event: { file: File }, detail: { index: number }) => {
  submitState.tempUploadImages = submitState.tempUploadImages?.filter(
    (item, index) => index !== detail.index
  )
  submitState.images = submitState.images.filter(
    (_: any, index: number) => index !== detail.index
  )
}

const handleChangeGood = (item: any, key: number) => {
  submitState.items[key].checked = !submitState.items[key].checked
}

// 提交
const handleSubmit = async () => {
  let items = submitState.items
    .filter((item) => item.checked)
    .map((item) => ({ id: item.id, nums: item.returnNums }))

  if (items.length === 0) {
    showToast(coreShopLang("请选择退货商品"))
    return
  }

  if (!submitState.deliveryState) {
    showToast(coreShopLang("请选择发货状态"))
    return
  }

  //组装数据，提交数据
  let data = {
    orderId: submitState.orderId,
    type: submitState.deliveryState,
    items: items,
    images: submitState.images.map((item) => item.id),
    refund: submitState.refund,
    reason: submitState.reason,
  }

  const addAfterSales: Result<AfterSalesDetail> = await queryAddAfterSales(data)
  if (addAfterSales.status) {
    showSuccessToast({ message: addAfterSales.msg, duration: 2000 })
    setTimeout(() => {
      return navigateTo(`/member/order/detail/${addAfterSales.data.orderId}`)
    }, 1000)
  } else {
    showToast(addAfterSales.msg)
  }
}
</script>

<style lang="scss" scoped>
.btn-box {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 9.6rem;
  padding: 0.3rem 0.2rem;
  background-color: #fff;
  box-shadow: 0 0 15px #eee;
}
.product-contain {
  padding: 10px 10px 0 10px;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product-item {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 0 10px;
  .check-product {
    margin-right: 10px;
  }
  .return-number {
    display: flex;
    align-items: center;
    .num {
      flex: 1;
      padding: 0;
    }
  }
}
.return-money {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
}
.desc-pro {
  padding: 0;
}
.box-show {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;
}
</style>
