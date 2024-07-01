<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('订单评价')"></CoreshopTitle>
    <div style="padding-bottom: 1.5rem">
      <div>
        <ul class="evaluate-box">
          <li
            v-for="(item, index) in orderDetailData.list"
            :key="index"
            class="cs-background-color-white cs-p-10"
          >
            <div class="cs-m-b-10">
              <section class="cs-display-flex">
                <div>
                  <img
                    class="cs-w-80 cs-border-radius-5"
                    :src="item.imageUrl"
                    alt=""
                  />
                </div>
                <div class="cs-m-l-10">
                  <p class="cs-font-size-14 name">{{ item.name }}</p>
                  <p class="cs-font-size-14 cs-color-gray addon">
                    {{ item.addon }}
                  </p>
                  <p>
                    <span class="cs-font-size-16">NT${{ item.price }}</span>
                    <span class="cs-m-l-10 cs-color-gray"
                      >x{{ item.nums }}</span
                    >
                  </p>
                </div>
              </section>
            </div>
            <div class="cs-m-b-10">
              <p class="title">{{ $t("商品评分") }}</p>
              <Rate v-model="item.score" icon="like" void-icon="like-o" />
            </div>
            <div class="cs-m-b-10">
              <p class="title">{{ $t("评价内容") }}</p>
              <Field
                class="evaluate"
                v-model="item.textarea"
                rows="2"
                autosize
                type="textarea"
                :placeholder="$t('请输入评价内容')"
              />
            </div>
            <div>
              <p class="title">{{ $t("上传图片(可上传5张)") }}</p>
              <Uploader
                v-model="item.tempUploadImages"
                :max-count="5"
                :after-read="(files) => handlerUploadVoucher(files, index)"
                :before-delete="
                  (file, detail) => onDeleteImage(file, detail, index)
                "
              />
            </div>
          </li>
        </ul>
        <div
          class="btn-box cs-display-flex cs-flex-direction-row-reverse cs-background-color-white"
        >
          <CoreshopButton
            class="cs-percent-w-100"
            size="medium"
            @on-click="handleSubmit"
            :text="$t('提交评价')"
            round
            bg-color="#e84f5d"
          />
        </div>
      </div>
    </div>
    <CoreshopLoading v-if="orderDetailData.isLoading" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryOrderDetail } from "@/composables/order"
import type { Result } from "@/model/result"
import { OrderDetail } from "@/model/order"
import { createOrderEvaluate } from "@/composables/afterSales"
import { RouteLocationNormalizedLoaded } from "vue-router"
import * as fileService from "@/composables/file"
import { UploadFileResult } from "@/model/file"
import { showToast, Field, Uploader, UploaderFileListItem, Rate } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
interface OrderDetailExt extends OrderDetail {
  tempUploadImages?: Array<UploaderFileListItem>
}

definePageMeta({
  layout: false,
})

const route: RouteLocationNormalizedLoaded = useRoute()

const orderDetailData: UnwrapRef<{
  orderId: string | string[]
  list: Array<OrderDetailExt>
  isLoading: boolean
}> = reactive({
  orderId: useRoute()?.params?.id,
  list: [],
  isLoading: false,
})

const getOrderDetail = async () => {
  try {
    orderDetailData.isLoading = true
    const orderDetailReuslt: Result<OrderDetailExt> = await queryOrderDetail({
      id: route.params.id,
    })
    orderDetailData.isLoading = false
    if (
      orderDetailReuslt.status &&
      orderDetailReuslt.data.payStatus >= 2 &&
      orderDetailReuslt.data.shipStatus >= 3 &&
      orderDetailReuslt.data.confirmStatus >= 2 &&
      orderDetailReuslt.data.isComment === false
    ) {
      const _info = orderDetailReuslt.data
      _info.items.forEach((item: any) => {
        item["images"] = []
        item["textarea"] = ""
        item["upload"] = true
        item["score"] = 5
      })
      orderDetailData.list = _info.items
    } else {
      showToast(coreShopLang("订单不存在或状态不可评价"))
    }
  } catch (error: any) {
    showToast(error.msg)
    orderDetailData.isLoading = false
  }
}

getOrderDetail()

/** 上传凭证 */
const handlerUploadVoucher = async (
  uploadFileInfo: UploaderFileListItem,
  index: number
) => {
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
  orderDetailData.list[index].images.push({
    id: fileUrl,
    name: fileUrl,
    status: "finished",
    url: fileUrl,
  })
}

const onDeleteImage = (
  event: { file: File },
  detail: { index: number },
  index: number
) => {
  orderDetailData.list[index].tempUploadImages = orderDetailData.list[
    index
  ]?.tempUploadImages?.filter((item, index) => index !== detail.index)
  orderDetailData.list[index].images = orderDetailData.list[
    index
  ].images.filter((_: any, index: number) => index !== detail.index)
}

// 提交评论
const handleSubmit = async () => {
  const { message } = useCoreShopMessage()
  const items = orderDetailData.list?.map((item) => ({
    images: item.images?.map((x: any) => x.id),
    orderItemId: item.id,
    score: item.score,
    textarea: item.textarea,
  }))
  const orderEvaluat: Result<OrderDetail> = await createOrderEvaluate({
    orderId: route.params.id,
    items,
  })
  message.success(orderEvaluat.msg, {
    duration: 2000,
    onAfterLeave: () => {
      return navigateTo(`/member/order?status=4`, { replace: true })
    },
  })
}
</script>

<style lang="scss" scoped>
.evaluate-box {
  li {
    background: #ffffff;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin: 10px;
    div {
      .title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 5px;
      }
      .evaluate {
        padding: 0;
      }
    }
  }
}
.btn-box {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 9.4rem;
  padding: 0.3rem;
  box-shadow: 0 0 15px #dcdcdc;
}
.name {
  display: -webkit-box !important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical !important;
}
.addon {
  display: -webkit-box !important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical !important;
}
</style>
