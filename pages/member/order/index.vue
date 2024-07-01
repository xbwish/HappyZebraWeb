<template>
  <section>
    <CoreshopTitle :title="$t('我的订单')"></CoreshopTitle>
    <Tabs
      class="tab-list"
      @click-tab="onChangeTab($event)"
      title-active-color="#D33123"
      color="#D33123"
    >
      <Tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="$t(item.title)"
      ></Tab>
    </Tabs>

    <section class="personal-order" id="order">
      <ul v-if="orderData.orderList.length > 0">
        <li v-for="item in orderData.orderList" :key="item.id">
          <div
            class="cs-display-flex cs-align-items-center cs-align-content-center cs-justify-content-space-between"
          >
            <div
              class="cs-display-flex cs-align-items-center"
              @click="handleViewDetail(item.orderId)"
            >
              <!-- <NIcon :size="20" class="cs-m-r-5 cs-align-self-start">
                <CoreshopIconHome />
              </NIcon> -->
              <p
                class="cs-font-size-14 cs-m-t-4 cs-display-flex cs-align-items-center"
              >
                <CoreshopLanguage :text="$t('订单号')" /> :
                <span>{{ item.orderId }}</span>
              </p>
              <NIcon
                :size="17"
                class="cs-m-r-5 cs-align-self-start right-arrow-icon"
              >
                <CoreshopIconChevronRight28Regular />
              </NIcon>
            </div>
            <p class="cs-font-size-14 order-status">
              {{ $t(handleStatusText(item)) }}
            </p>
          </div>
          <div
            v-for="(res, index) in item.items"
            :key="res.id"
            class="cs-display-flex cs-justify-content-space-between order-product-item-bottom"
            :class="{ 'order-product-item-bottom-none': index === 0 }"
          >
            <section>
              <CoreshopImage
                class="cs-w-90 cs-h-90"
                radius="5px"
                root="#order"
                :src="res.imageUrl"
              />
            </section>
            <section
              class="cs-percent-w-70 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
            >
              <p class="cs-font-size-14 cs-line-height-20 title">
                {{ res.name }}
              </p>
              <p class="cs-color-gray cs-font-size-12 desc">{{ res.addon }}</p>
              <p>
                <span class="cs-font-size-16">NT${{ res.price }}</span>
                <span class="cs-m-l-10 cs-color-gray">x{{ res.nums }}</span>
              </p>
            </section>
          </div>
          <div class="cs-display-flex cs-justify-content-space-between">
            <Tag round size="medium" type="success">
              {{ $t(item.typeText) }}</Tag
            >
            <div>
              <span class="cs-font-size-14">
                <CoreshopLanguage :text="$t('共计')" />{{ item.items.length }}
                <CoreshopLanguage :text="$t('件商品')" />
              </span>
              <span class="cs-font-size-14 cs-m-l-20">
                <CoreshopLanguage :text="$t('合计')" />：<span
                  class="cs-font-size-16 cs-color-red cs-line-height-no-px-1"
                  >NT${{ item.orderAmount }}</span
                >
              </span>
            </div>
          </div>
          <div
            class="cs-display-flex cs-align-items-center cs-align-content-center cs-justify-content-end action-container"
          >
            <div class="action cs-m-l-5">
              <CoreshopButton
                round
                ghost
                bordered
                class="action cs-m-l-5"
                bg-color="#666666"
                :size="btnSize.tiny"
                @onClick="handleViewDetail(item.orderId)"
              >
                <CoreshopLanguage :text="$t('查看详情')" />
              </CoreshopButton>
              <CoreshopButton
                round
                bordered
                :size="btnSize.tiny"
                @onClick="handlegoToPay(item.orderId)"
                class="cs-m-l-5"
                bg-color="#D33123"
                v-if="item.status === 1 && item.payStatus === 1"
              >
                <CoreshopLanguage :text="$t('立即支付')" />
              </CoreshopButton>
              <CoreshopButton
                round
                ghost
                bordered
                :size="btnSize.tiny"
                @onClick="handletackDelivery(item.orderId)"
                class="cs-m-l-5"
                bg-color="#8dc63f"
                v-if="
                  item.status === 1 &&
                  item.payStatus >= 2 &&
                  item.shipStatus >= 3 &&
                  item.confirmStatus === 1
                "
              >
                <CoreshopLanguage :text="$t('确认收货')" />
              </CoreshopButton>
              <CoreshopButton
                round
                ghost
                bordered
                :size="btnSize.tiny"
                @onClick="handletoEvaluate(item.orderId)"
                class="cs-m-l-5"
                bg-color="#f0a020"
                v-if="
                  item.status === 1 &&
                  item.payStatus >= 2 &&
                  item.shipStatus >= 3 &&
                  item.confirmStatus >= 2 &&
                  item.isComment === false
                "
              >
                <CoreshopLanguage :text="$t('立即评价')" />
              </CoreshopButton>
            </div>
          </div>
        </li>
      </ul>
      <CoreshopNoData
        v-if="orderData.orderList.length === 0"
        :text="$t('暂无订单')"
      ></CoreshopNoData>
      <p
        class="no-more"
        v-if="orderData.orderList.length > 0 && !orderData.haveData"
      >
        {{ $t("没有更多了") }}
      </p>
    </section>
    <CoreshopLoading v-if="orderData.isLoading" />
  </section>
</template>

<script setup lang="ts">
import { UnwrapRef, onMounted } from "vue"
import { NTag, NIcon } from "naive-ui"
import { useRoute } from "vue-router"
import type { Result } from "@/model/result"
import { IOrderList } from "@/model/order"
import {
  queryOrderList,
  handleStatusText,
  queryConfirmOrder,
} from "@/composables/order"
import { btnSize } from "@/enum"
import { usePageConfig } from "@/store"
import { Tab, Tabs, showConfirmDialog, showToast, Tag } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({ title: coreShopLang("订单列表") })
usePageConfig().set_back_style({ top: "55px" })

const tabList = [
  {
    title: coreShopLang("全部"),
    key: 0,
  },
  {
    title: coreShopLang("待付款"),
    key: 1,
  },
  {
    title: coreShopLang("待发货"),
    key: 2,
  },
  {
    title: coreShopLang("待收货"),
    key: 3,
  },
  {
    title: coreShopLang("待评价"),
    key: 4,
  },
]

const route = useRoute()

let orderData: UnwrapRef<{
  orderList: Array<any>
  status: any // 订单类型
  limit: number // 一页数据的个数
  page: number // 页数
  pageCount: number // 总页数
  orderId: string // 订单id
  haveData: boolean
  isLoading: boolean
}> = reactive({
  orderList: [],
  status: 0,
  limit: 10,
  page: 1,
  pageCount: 0,
  orderId: "",
  haveData: true,
  isLoading: false,
})

orderData.status = route.query.status || 0

const query = async () => {
  orderData.isLoading = true

  const getOrderList: Result<IOrderList> = await queryOrderList({
    limit: orderData.limit,
    page: orderData.page,
    status: orderData.status,
  })
  orderData.pageCount = Math.ceil(
    getOrderList.data?.count! / getOrderList.data?.limit!
  )
  if (getOrderList.data?.list.length > 0) {
    orderData.orderList = orderData.orderList.concat(
      getOrderList.data?.list || []
    )
  } else {
    orderData.haveData = false
  }
  orderData.isLoading = false
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
      if (scrollH - scrollT - screenH < 60 && orderData.haveData) {
        orderData.page++
        query()
      }
    }, 500)
  )
})

const queryOrders = (value: number) => {
  orderData.page = 1
  orderData.orderList = []
  orderData.status = value
  orderData.haveData = true
  orderData.isLoading = false
  query()
}

const onChangeTab = (event: { name: number }) => {
  queryOrders(event.name)
}

// 跳转去支付
const handlegoToPay = (orderId: string) => {
  return navigateTo(`/order/payment?orderId=${orderId}&type=1`)
}

// 确认收货
const handletackDelivery = (orderId: string) => {
  showConfirmDialog({
    title: coreShopLang("确认收获"),
    message: coreShopLang("确认执行收货操作"),
    confirmButtonColor: "#f56c6c",
    confirmButtonText: coreShopLang("确认"),
    cancelButtonText: coreShopLang("取消"),
  })
    .then(async () => {
      const confirmOrderRes: Result = await queryConfirmOrder({ id: orderId })
      if (!confirmOrderRes.status) {
        showToast(confirmOrderRes.msg)
        return
      }
      queryOrders(orderData.status)
    })
    .catch(() => {
      // on cancel
    })
}

// 跳转去评价
const handletoEvaluate = (orderId: string) => {
  return navigateTo(`/member/order/evaluate/${orderId}`)
}

const handleViewDetail = (orderId: string) => {
  console.log("11111")
  return navigateTo(`/member/order/detail/${orderId}`)
}
</script>

<style scoped lang="scss">
@import "@/assets/css/color.scss";
.tab-list {
  position: fixed;
  top: 0;
  width: 10rem;
  z-index: 999;
  box-shadow: 0 0 15px #dcdcdc;
}

.right-arrow-icon {
  line-height: 27px !important;
}

.personal-order {
  padding-top: 1.5rem;
  ul {
    li {
      padding: 0 0.3rem;
      background: #fff;
      box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
      border-radius: 8px;
      margin: 0 10px 0.35rem 10px;
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
      > div {
        padding: 10px 0;
      }
    }

    li:last-child {
      border-bottom: 0;
    }
  }
}

.pagination-box {
  display: flex;
  flex-direction: row-reverse;
  padding: 10px 0;
  margin-bottom: 20px;
}

.action-container {
  // border-top: 1px solid #dddddd;
}
.order-status {
  color: #999999;
}

.order-product-item-bottom {
  // border-top: 1px solid #dddddd;
}

.order-product-item-bottom-none {
  border-top: none;
}
</style>
