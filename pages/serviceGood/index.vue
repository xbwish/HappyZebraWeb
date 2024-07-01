<template>
  <NuxtLayout name="personal-center">
    <div>
      <CoreshopTitle :title="$t('服务商品')"></CoreshopTitle>
      <div class="block" v-if="goodState.list.length > 0">
        <ul class="service-box">
          <li
            v-for="item in goodState.list"
            :key="item.id"
            class="cs-p-t-20 cs-p-b-20 cs-font-size-16 cs-border-solid-bottom"
          >
            <div
              class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-p-b-10"
            >
              <div
                class="cs-display-flex cs-align-items-center cs-font-size-16"
              >
                <NIcon class="cs-m-r-5" color="#e84f5d" :size="20">
                  <CoreshopIconTimer20Regular></CoreshopIconTimer20Regular>
                </NIcon>
                <n-countdown
                  :render="renderCountdown"
                  :duration="item.timestamp"
                />
              </div>
              <p class="">
                <CoreshopLanguage :text="$t('仅剩')" />:{{ item.amount }}
              </p>
            </div>
            <div class="cs-display-flex cs-justify-content-space-between">
              <div class="cs-percent-w-20">
                <img
                  class="product-image cs-percent-w-100"
                  :src="item.thumbnail"
                />
              </div>
              <div
                class="cs-percent-w-78 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
              >
                <p class="cs-font-size-14 title">{{ item.title }}</p>
                <p class="cs-font-size-12 cs-color-gray desc">
                  {{ item.description }}
                </p>
                <p class="cs-display-flex cs-align-items-center">
                  <span
                    class="cs-font-size-20 cs-color-red cs-line-height-25 cs-text-price"
                    >{{ item.money }}</span
                  >
                  <span class="cs-color-yellow cs-m-l-20 cs-font-size-12">
                    <CoreshopLanguage :text="$t('最大购买限制')" />：{{
                      item.maxBuyNumber == 0 ? $t("不限购") : item.maxBuyNumber
                    }}
                  </span>
                </p>
              </div>
            </div>
            <div class="cs-m-t-10">
              <div
                v-if="
                  item.allowedMemberships && item.allowedMemberships.length > 0
                "
                class="cs-p-t-10 cs-display-flex cs-align-items-center"
              >
                <span class="cs-font-size-14 cs-color-gray cs-percent-w-20">
                  <CoreshopLanguage :text="$t('兑换级别')" />：
                </span>
                <div class="cs-percent-w-80 cs-display-flex level">
                  <Tag
                    type="success"
                    class="cs-m-r-10 cs-font-size-12 level-item"
                    v-for="(items, indexChild) in item.allowedMemberships"
                    :key="indexChild"
                    >{{ items }}
                  </Tag>
                  <Tag
                    type="success"
                    class="cs-m-r-10 cs-font-size-12 level-item"
                    v-for="(items, indexChild) in item.allowedMemberships"
                    :key="indexChild"
                    >{{ items }}
                  </Tag>
                </div>
              </div>
              <div
                v-if="item.consumableStores && item.consumableStores.length > 0"
                class="cs-p-t-10 cs-p-b-10 cs-display-flex cs-align-items-center"
              >
                <span class="cs-font-size-14 cs-color-gray cs-percent-w-20">
                  <CoreshopLanguage :text="$t('兑换门店')" />：
                </span>
                <div class="cs-percent-w-80 cs-display-flex store">
                  <Tag
                    type="primary"
                    class="cs-m-r-10 cs-font-size-12 store-item"
                    v-for="(items, indexChild) in item.consumableStores"
                    :key="indexChild"
                    >{{ items }}</Tag
                  >
                </div>
              </div>
              <div
                class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
              >
                <div class="cs-line-height-35">
                  <span class="cs-font-size-14 cs-color-gray">
                    <CoreshopLanguage :text="$t('购买截止')" />： </span
                  ><span class="cs-font-size-12 cs-color-gray">{{
                    item.endTime
                  }}</span>
                </div>
                <CoreshopButton
                  v-if="item.timestamp != 0"
                  @click="handleGoGoodDetail(item)"
                  size="tiny"
                  class="cs-w-140"
                >
                  <CoreshopLanguage :text="$t('立刻抢购')" />
                </CoreshopButton>
                <CoreshopButton
                  v-else
                  class="cs-w-140"
                  size="tiny"
                  bg-color="#404040"
                >
                  <CoreshopLanguage :text="$t('已结束')" />
                </CoreshopButton>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <CoreshopNoData v-else />
      <p
        class="no-more"
        v-if="goodState.list.length > 0 && !goodState.haveData"
      >
        {{ $t("没有更多了") }}
      </p>
      <CoreshopLoading v-if="goodState.isLoading" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { NCountdown, CountdownProps, NIcon } from "naive-ui"
import { queryServicelist } from "@/composables/serviceGoods"
import type { Result } from "@/model/result"
import { ServiceList } from "@/model/activity"
import { Tag } from "vant"

definePageMeta({
  layout: false,
})

const goodState: UnwrapRef<{
  list: Array<any>
  limit: number
  page: number
  totalPages: number
  haveData: boolean
  isLoading: boolean
}> = reactive({
  list: [],
  limit: 10,
  page: 1,
  totalPages: 0,
  haveData: true,
  isLoading: false,
})

const query = async () => {
  goodState.isLoading = true

  const getServicelis: Result<ServiceList> = await queryServicelist({
    limit: goodState.limit,
    page: goodState.page,
  })

  goodState.totalPages = Math.ceil(getServicelis.data.count / goodState.limit)

  if (getServicelis.data?.list.length > 0) {
    goodState.list = goodState.list.concat(getServicelis.data?.list || [])
  } else {
    goodState.haveData = false
  }
  goodState.isLoading = false
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
      if (scrollH - scrollT - screenH < 60 && goodState.haveData) {
        goodState.page++
        query()
      }
    }, 500)
  )
})

const renderCountdown: CountdownProps["render"] = ({
  hours,
  minutes,
  seconds,
}) => {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`
}

const handleGoGoodDetail = (item: any) => {
  return navigateTo(`/serviceGood/detail?id=${item.id}&goodsId=${item.id}`)
}
</script>

<style lang="scss" scoped>
.service-box {
  li {
    padding: 0.3rem;
    background-color: #fff;
    margin-bottom: 10px;
    background: #ffffff;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin: 10px;
  }
}

.title,
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.product-image {
  border-radius: 4px;
}

.level {
  flex-wrap: wrap;
  .level-item {
    margin-bottom: 10px;
  }
}
.store {
  flex-wrap: wrap;
  .store-item {
    margin-bottom: 10px;
  }
}
</style>
