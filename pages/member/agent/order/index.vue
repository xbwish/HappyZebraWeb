<template>
  <NuxtLayout name="personal-center">
    <div>
      <CoreshopTitle :title="$t('代理订单')"></CoreshopTitle>
      <div class="agent-box">
        <div
          class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
        >
          <div
            class="cs-percent-w-43 cs-background-color-white cs-border-radius-10 cs-p-10"
          >
            <div>
              <p class="cs-font-size-12 cs-color-gray">
                {{ $t("总订单数量") }}（{{ $t("单") }}）
              </p>
              <p class="cs-font-size-14">
                {{ agentOrderSumData.orderInfo?.allOrder || 0 }}
              </p>
            </div>
            <div
              class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
            >
              <div>
                <p class="cs-font-size-12 cs-color-gray">
                  {{ $t("代购订单") }}
                </p>
                <p class="cs-font-size-14">
                  {{
                    agentOrderSumData.orderInfo?.procurementServiceOrder || 0
                  }}
                </p>
              </div>
              <div>
                <p class="cs-font-size-12 cs-color-gray">
                  {{ $t("客户订单") }}
                </p>
                <p class="cs-font-size-14">
                  {{ agentOrderSumData.orderInfo?.customerOrder || 0 }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="cs-percent-w-43 cs-background-color-white cs-border-radius-10 cs-p-10"
          >
            <div>
              <p class="cs-font-size-12 cs-color-gray">
                {{ $t("总订单金额") }}（NT$）
              </p>
              <p class="cs-font-size-14">
                {{ agentOrderSumData.orderInfo?.allOrderMoney || "0.00" }}
              </p>
            </div>
            <div
              class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
            >
              <div>
                <p class="cs-font-size-12 cs-color-gray">
                  {{ $t("代购订单") }}
                </p>
                <p class="cs-font-size-14">
                  {{
                    agentOrderSumData.orderInfo?.procurementServiceOrderMoney ||
                    "0.00"
                  }}
                </p>
              </div>
              <div>
                <p class="cs-font-size-12 cs-color-gray">
                  {{ $t("客户订单") }}
                </p>
                <p class="cs-font-size-14">
                  {{
                    agentOrderSumData.orderInfo?.customerOrderMoney || "0.00"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="cs-m-t-10 cs-display-flex cs-align-items-center cs-justify-content-space-between"
        >
          <div
            class="cs-percent-w-43 cs-background-color-white cs-border-radius-10 cs-p-10"
          >
            <div>
              <p class="cs-font-size-12 cs-color-gray">
                {{ $t("本月订单总数") }} （{{ $t("单") }}）
              </p>
              <p class="cs-font-size-14">
                {{ agentOrderSumData.orderInfo?.monthOrder || 0 }}
              </p>
            </div>
          </div>
          <div
            class="cs-percent-w-43 cs-background-color-white cs-border-radius-10 cs-p-10"
          >
            <div>
              <p class="cs-font-size-12 cs-color-gray">
                {{ $t("本月订单金额") }}（NT$）
              </p>
              <p class="cs-font-size-14">
                {{ agentOrderSumData.orderInfo?.monthOrderMoney || "0.00" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-box">
        <Tabs
          title-active-color="#f56c6c"
          color="#f56c6c"
          @click-tab="handleTabChange($event)"
        >
          <Tab
            v-for="item in agentOrderSumData.statusList"
            :key="item.value"
            :title="item.name"
          />
        </Tabs>

        <div class="list-box">
          <ul
            v-if="agentOrderSumData.orderList.length > 0"
            class="cs-m-t-10 cs-font-size-12"
          >
            <li
              v-for="item in agentOrderSumData.orderList"
              :key="item.id"
              class="cs-border-solid-bottom"
            >
              <div
                class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-12"
              >
                <p>{{ $t("订单编号") }}：{{ item.orderId }}</p>
                <p class="cs-color-green">
                  {{
                    item.userId == item.buyUserId
                      ? $t("代购订单")
                      : $t("推广订单")
                  }}
                </p>
              </div>
              <div
                class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
              >
                <p>
                  <span class="cs-font-size-12">{{ $t("下单人") }}：</span>
                  <img
                    class="cs-w-20 cs-h-20 cs-m-r-5 cs-percent-border-radius-50"
                    :src="item.buyUserAvatar"
                    alt=""
                  />
                  <span class="cs-font-size-12">{{
                    item.buyUserNickName
                  }}</span>
                </p>
                <p class="cs-color-gray cs-font-size-12">
                  {{ timeFormat(item.createTime, " yyyy.mm.dd hh:MM ") }}
                </p>
              </div>
              <div
                class="list-item-box"
                v-for="(itemChild, idx) in item.agentOrderDetails"
                :key="idx"
              >
                <div>
                  <img :src="itemChild.imageUrl" alt="" />
                </div>
                <div>
                  <p class="name">{{ itemChild.name }}</p>
                  <p class="addon cs-color-gray">
                    <span>{{ $t("数量") }}：{{ itemChild.productNums }}；</span>
                    {{ itemChild.addon }}
                  </p>
                  <p class="price">
                    <span class="cs-font-size-14"
                      >NT${{ itemChild.productPrice }}
                    </span>
                    <span
                      >{{ $t("佣金") }}：<span
                        class="cs-font-size-14 cs-color-red"
                        >NT${{ itemChild.amount }}</span
                      ></span
                    >
                  </p>
                </div>
              </div>
              <div class="cs-display-flex cs-align-items-center cs-color-gray">
                <p>{{ $t("商品总价") }}：NT${{ item.goodsAmount }},</p>
                <p class="cs-m-l-10">
                  {{ $t("实付款") }}：NT${{ item.payedAmount }},
                </p>
                <p class="cs-m-l-10">
                  {{ $t("优惠金额") }}：NT${{
                    (Number(item.goodsAmount) * 1000 -
                      Number(item.payedAmount) * 1000) /
                    1000
                  }}
                </p>
              </div>
              <div
                class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
              >
                <p class="cs-font-size-12">
                  {{ $t("提成") }}：<span class="cs-color-red"
                    >NT${{ item.amount || "0" }}</span
                  >
                </p>
                <p class="cs-font-weight-bold cs-font-size-14">
                  {{
                    item.isSettlement == 1
                      ? $t("已结算")
                      : item.isSettlement == 2
                      ? $t("未结算")
                      : $t("已退款")
                  }}
                </p>
              </div>
            </li>
          </ul>
          <CoreshopNoData v-else />
          <p
            class="no-more"
            v-if="
              agentOrderSumData.orderList.length > 0 &&
              !agentOrderSumData.haveData
            "
          >
            {{ $t("没有更多了") }}
          </p>
        </div>
      </div>
      <CoreshopLoading v-if="agentOrderSumData.isLoading" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryAgentOrderSum, queryAgentOrder } from "@/composables/agent"
import { Result } from "~~/model/result"
import { AgentOrder, AgentOrderList } from "@/model/member"
import { Tab, Tabs } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const agentOrderSumData: UnwrapRef<{
  orderInfo: AgentOrder | null
  statusList: Array<{
    name: string
    value: string
  }>
  stateCurrent: string
  page: number
  limit: number
  orderList: Array<AgentOrderList>
  haveData: boolean
  isLoading: boolean
}> = reactive({
  orderInfo: null,
  statusList: [
    {
      name: coreShopLang("全部"),
      value: "0",
    },
    {
      name: coreShopLang("已结算"),
      value: "1",
    },
    {
      name: coreShopLang("未结算"),
      value: "2",
    },
    {
      name: coreShopLang("已退款"),
      value: "3",
    },
  ],
  stateCurrent: "0",
  page: 1,
  limit: 20,
  orderList: [],
  haveData: true,
  isLoading: false,
})

const getAgentOrderSum: Result<AgentOrder> = await queryAgentOrderSum()
agentOrderSumData.orderInfo = getAgentOrderSum.data

const query = async () => {
  agentOrderSumData.isLoading = true

  const getAgentOrder: Result<Array<AgentOrderList>> = await queryAgentOrder({
    page: agentOrderSumData.page,
    limit: agentOrderSumData.limit,
    id: agentOrderSumData.stateCurrent,
  })

  if (getAgentOrder.data.length > 0) {
    agentOrderSumData.orderList = agentOrderSumData.orderList.concat(
      getAgentOrder.data || []
    )
  } else {
    agentOrderSumData.haveData = false
  }

  agentOrderSumData.isLoading = false
}
query()

const handleTabChange = (event: { name: string }) => {
  agentOrderSumData.page = 1
  agentOrderSumData.orderList = []
  agentOrderSumData.haveData = true
  agentOrderSumData.isLoading = true
  agentOrderSumData.stateCurrent = event.name
  query()
}

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight // 文档的完整高度
      const scrollT =
        document.documentElement.scrollTop || document.body.scrollTop // 当前滚动条的垂直偏移
      const screenH = window.screen.height // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && agentOrderSumData.haveData) {
        agentOrderSumData.page++
        query()
      }
    }, 500)
  )
})
</script>

<style lang="scss" scoped>
.agent-box {
  position: relative;
  width: 9.4rem;
  padding: 0.3rem 0.3rem;
  background-color: #f56c6c;
}

.tab-box {
  .active {
    border-bottom: 1px solid #0081ff;
  }
}
.list-box {
  li {
    padding: 0.3rem;
    background-color: #fff;
    margin-bottom: 0.2rem;
    > div {
      padding: 5px 0;
    }
  }
  .list-item-box {
    display: flex;
    justify-content: space-between;
    div:nth-of-type(1) {
      width: 20%;
      img {
        display: block;
        width: 100%;
        border-radius: 5px;
      }
    }
    div:nth-of-type(2) {
      width: 78%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        font-size: 0.35rem;
      }
      .addon {
        font-size: 0.3rem;
      }
      .price {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
