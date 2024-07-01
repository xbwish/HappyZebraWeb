<template>
  <NuxtLayout name="personal-center">
    <div>
      <coreshop-title :title="$t('服务详情')"></coreshop-title>
      <div class="detail-box">
        <div
          class="cs-m-t-10 cs-m-b-10 cs-p-b-10 cs-display-flex product-info cs-border-solid-bottom"
        >
          <div class="cs-percent-w-20 image">
            <img
              class="cs-percent-w-100 cs-border-radius-10"
              :src="info.thumbnail"
              alt=""
            />
          </div>
          <div
            class="cs-percent-w-78 cs-font-size-14 cs-display-flex cs-flex-direction-column"
          >
            <p class="cs-font-size-14 title">{{ info.title }}</p>
            <p class="cs-font-size-14 cs-color-gray title">
              {{ info.description }}
            </p>
            <!-- <p class="cs-color-gray cs-font-size-12">
                  <CoreshopLanguage text="下单时间" /> {{ timeFormat(info.payTime, "yyyy-mm-dd hh:MM:ss") }}
                </p> -->
          </div>
        </div>
        <div>
          <p>{{ $t("订单编号") }}：{{ route.params.id }}</p>
          <div
            v-if="info.allowedMemberships && info.allowedMemberships.length > 0"
            class="cs-m-t-15"
          >
            <div>{{ $t("兑换级别") }}：</div>
            <div>
              <Tag
                type="success"
                class="cs-m-r-10"
                v-for="(item, index) in info.allowedMemberships"
                :key="index"
                >{{ item }}</Tag
              >
            </div>
          </div>
          <div
            v-if="info.consumableStores && info.consumableStores.length > 0"
            class="cs-m-t-10"
          >
            <div>{{ $t("兑换门店") }}：</div>
            <div>
              <Tag
                type="primary"
                class="cs-m-r-10"
                v-for="(item, index) in info.consumableStores"
                :key="index"
                >{{ item }}</Tag
              >
            </div>
          </div>
        </div>
        <div
          class="cs-display-flex cs-justify-content-space-between cs-align-items-center view-detail"
        >
          <CoreshopButton
            class="cs-percent-w-20"
            @on-click="handleGoToServiceGood"
            :text="$t('详情')"
            :bordered="true"
          />
        </div>
      </div>
      <div class="tabs-box">
        <Tabs
          title-active-color="#f56c6c"
          color="#f56c6c"
          @click-tab="handleChangeTab($event)"
        >
          <Tab
            v-for="(item, index) in tabs"
            :key="item.status"
            :title="item.title"
          ></Tab>
        </Tabs>
      </div>
      <div class="service-order-box">
        <ul v-if="ServiceOrderDetailData.list.length > 0">
          <li
            v-for="item in ServiceOrderDetailData.list"
            :key="item.id"
            :class="{
              'cs-color-gray':
                ServiceOrderDetailData.tab != ServicesTicketsStatus.normal,
            }"
          >
            <div class="cs-percent-w-75">
              <p
                :class="[
                  {
                    'cs-text-decoration-line-through':
                      ServiceOrderDetailData.tab !=
                      ServicesTicketsStatus.normal,
                  },
                  'cs-font-size-14 cs-display-flex cs-align-items-baseline',
                ]"
              >
                {{ $t("核销码") }}：
                <span class="cs-font-size-16">{{ item.redeemCode }}</span>
              </p>
              <p class="cs-font-size-14">
                {{
                  item.validityType == 1 ? $t("长期有效") : $t("限时间段内消费")
                }}
              </p>
              <p
                class="cs-font-size-13"
                v-if="item.validityStartTime && item.validityEndTime"
              >
                {{ item.validityStartTime }} {{ $t("至") }}
                {{ item.validityEndTime }}
              </p>
            </div>

            <div class="cs-percent-w-20 cs-percent-h-100 cs-display-flex">
              <CoreshopButton
                class="cs-margin-auto"
                v-if="
                  ServiceOrderDetailData.tab == ServicesTicketsStatus.normal
                "
                :text="$t('正常')"
                bg-color="#fff"
                :bordered="true"
                text-color="#000"
              />
              <CoreshopButton
                class="cs-margin-auto"
                v-if="
                  ServiceOrderDetailData.tab == ServicesTicketsStatus.overdue
                "
                :text="$t('过期')"
                bg-color="#fff"
                :bordered="true"
                text-color="#aaa"
              />
              <CoreshopButton
                class="cs-margin-auto"
                v-if="
                  ServiceOrderDetailData.tab ==
                  ServicesTicketsStatus.cancellation
                "
                :text="$t('作废')"
                bg-color="#fff"
                :bordered="true"
                text-color="#aaa"
              />
              <CoreshopButton
                class="cs-margin-auto"
                v-if="
                  ServiceOrderDetailData.tab ==
                  ServicesTicketsStatus.verification
                "
                :text="$t('已核销')"
                bg-color="#fff"
                :bordered="true"
                text-color="#aaa"
              />
            </div>
          </li>
        </ul>
        <CoreshopNoData v-else />
        <p
          class="no-more"
          v-if="
            ServiceOrderDetailData.list.length > 0 &&
            !ServiceOrderDetailData.haveData
          "
        >
          {{ $t("没有更多了") }}
        </p>
      </div>
      <CoreshopLoading v-if="ServiceOrderDetailData.isLoading" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryServicesById, queryServicesTickets } from "@/composables/order"
import type { Result } from "@/model/result"
import { ServiceOrderDetail, ServicesTickets } from "@/model/order"
import { ServicesTicketsStatus } from "@/enum/order-type.enum"
import { Tag, Tabs, Tab } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const route = useRoute()

const ServiceOrderDetailData: UnwrapRef<{
  tab: number
  page: number
  limit: number
  list: Array<ServicesTickets>
  haveData: boolean
  isLoading: boolean
}> = reactive({
  tab: 0,
  page: 1,
  limit: 10,
  list: [],
  haveData: true,
  isLoading: false,
})

// 选项卡
const tabs = [
  { title: coreShopLang("正常"), status: ServicesTicketsStatus.normal },
  { title: coreShopLang("过期"), status: ServicesTicketsStatus.overdue },
  { title: coreShopLang("作废"), status: ServicesTicketsStatus.cancellation },
  { title: coreShopLang("已核销"), status: ServicesTicketsStatus.verification },
]

// 查询服务商品
const serviceGoods: Result<ServiceOrderDetail> = await queryServicesById({
  id: route.params.id,
})
const info: ServiceOrderDetail = serviceGoods.data

// 查询单个服务订单下面服务券
const getServicesTickets = async () => {
  ServiceOrderDetailData.isLoading = true

  const serviceGoods: Result<Array<ServicesTickets>> =
    await queryServicesTickets({
      id: route.params.id,
      status: ServiceOrderDetailData.tab,
      page: ServiceOrderDetailData.page,
      limit: ServiceOrderDetailData.limit,
    })

  if (serviceGoods.data.length > 0) {
    ServiceOrderDetailData.list = ServiceOrderDetailData.list.concat(
      serviceGoods.data || []
    )
  } else {
    ServiceOrderDetailData.haveData = false
  }
  ServiceOrderDetailData.isLoading = false
}
getServicesTickets()

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight // 文档的完整高度
      const scrollT =
        document.documentElement.scrollTop || document.body.scrollTop // 当前滚动条的垂直偏移
      const screenH = window.screen.height // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && ServiceOrderDetailData.haveData) {
        ServiceOrderDetailData.page++
        getServicesTickets()
      }
    }, 500)
  )
})

const handleChangeTab = (event: { name: number }) => {
  ServiceOrderDetailData.tab = event.name
  ServiceOrderDetailData.page = 1
  ServiceOrderDetailData.list = []
  ServiceOrderDetailData.haveData = true
  ServiceOrderDetailData.isLoading = false

  getServicesTickets()
}

const handleGoToServiceGood = () => {
  return navigateTo(`/serviceGood/detail?id=${info.id}&goodsId=${info.id}`)
}
</script>

<style lang="scss" scoped>
.detail-box {
  padding: 0.1rem 0.3rem 0.5rem;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  background-color: #fff;
  margin: 10px;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.product-info {
  .image {
    margin-right: 10px;
  }
}
.service-order-box {
  ul {
    margin-top: 10px;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 9rem;
      padding: 0.3rem;
      background-color: rgba(251, 199, 122, 0.5);
      margin: 0 auto 10px;
      border-radius: 10px;
      div:nth-of-type(1) {
        border-right: 1px dashed #aaaaaa;
      }
    }
  }
}

.tabs-box {
  overflow: hidden;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;

  section {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 95%;

    > div {
      width: 25%;
      text-align: center;
      font-size: 14px;
      cursor: pointer;

      span {
        position: relative;
        transition: all 0.3s;
      }
    }

    > div.active {
      span {
        color: #fbbd08;
      }
    }
  }
}
.view-detail {
  margin-top: 10px;
  justify-content: flex-end;
}
</style>
