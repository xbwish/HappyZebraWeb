<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('售后列表')"></CoreshopTitle>

    <div>
      <ul v-if="afterSalesState.list.length > 0">
        <li
          v-for="(item, index) in afterSalesState.list"
          :key="index"
          class="cs-font-size-14 cs-m-b-10 cs-p-b-20 cs-p-t-20 cs-border-solid-bottom cs-p-l-10 cs-p-r-10 cs-background-color-white product-item"
        >
          <div
            class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
          >
            <p class="">{{ $t("售后单号") }}：{{ item.aftersalesId }}</p>
            <Tag v-if="item.status == 1" plain round type="warning">{{
              $t("待审核")
            }}</Tag>
            <Tag v-if="item.status == 2" plain round type="success">{{
              $t("审核通过")
            }}</Tag>
            <Tag v-if="item.status == 3" plain round type="danger">{{
              $t("审核拒绝")
            }}</Tag>
          </div>
          <div>
            <ul class="afterSales-list">
              <li
                v-for="(res, idx) in item.items"
                :key="idx"
                class="cs-p-t-10 cs-p-b-10 cs-border-solid-bottom cs-display-flex cs-align-items-center cs-justify-content-space-between"
              >
                <div class="cs-w-75">
                  <img
                    class="cs-percent-w-100 cs-border-radius-5"
                    :src="res.imageUrl"
                    alt=""
                  />
                </div>
                <div
                  class="cs-percent-w-75 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
                >
                  <p class="cs-font-size-14 title">{{ res.name }}</p>
                  <p class="cs-font-size-14 cs-color-gray desc">
                    {{ res.addon }}
                  </p>
                  <p>x{{ res.nums }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div
            class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
          >
            <p>
              {{ $t("退款金额") }}：<span class="cs-font-size-16 cs-color-red"
                >NT${{ item.refundAmount }}</span
              >
            </p>
            <CoreshopButton
              :bordered="true"
              ghost
              :size="btnSize.small"
              @on-click="handleViewDetail(item.aftersalesId)"
            >
              <CoreshopLanguage :text="$t('查看详情')" />
            </CoreshopButton>
          </div>
        </li>
      </ul>
      <CoreshopNoData v-else text="暂无售后记录" />
      <p
        class="no-more"
        v-if="afterSalesState.list.length > 0 && !afterSalesState.haveData"
      >
        {{ $t("没有更多了") }}
      </p>
      <CoreshopLoading v-if="afterSalesState.isLoading" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryAfterSalesList } from "@/composables/afterSales"
import type { Result } from "@/model/result"
import { AfterSalesList, AfterSalesDetail } from "@/model/member"
import { btnSize } from "@/enum"
import { Tag } from "vant"

definePageMeta({
  layout: false,
})

const afterSalesState: UnwrapRef<{
  page: number
  limit: number
  totalPage: number
  list: Array<AfterSalesDetail>
  haveData: boolean
  isLoading: boolean
}> = reactive({
  page: 1,
  limit: 10,
  totalPage: 0,
  list: [],
  haveData: true,
  isLoading: false,
})
const query = async () => {
  afterSalesState.isLoading = true

  const getAfterSalesList: Result<AfterSalesList> = await queryAfterSalesList({
    page: afterSalesState.page,
    limit: afterSalesState.limit,
  })
  afterSalesState.totalPage = getAfterSalesList.data.totalPage

  if (getAfterSalesList.data?.list.length > 0) {
    afterSalesState.list = afterSalesState.list.concat(
      getAfterSalesList.data?.list || []
    )
  } else {
    afterSalesState.haveData = false
  }
  afterSalesState.isLoading = false
}
query()

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight // 文档的完整高度
      const scrollT =
        document.documentElement.scrollTop || document.body.scrollTop // 当前滚动条的垂直偏移
      const screenH = window.screen.height // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && afterSalesState.haveData) {
        afterSalesState.page++
        query()
      }
    }, 500)
  )
})

const handleViewDetail = (aftersalesId: string) => {
  return navigateTo(`/member/afterSales/detail/${aftersalesId}`)
}
</script>

<style lang="scss" scoped>
.product-item {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;
}

.afterSales-list {
  li:last-child {
    &:after {
      border-bottom: 0;
    }
  }

  .title {
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical !important;
  }

  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.no-more {
  color: #999999;
}
</style>
