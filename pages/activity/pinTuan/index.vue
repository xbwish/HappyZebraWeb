<template>
  <NuxtLayout name="personal-center">
    <section>
      <CoreshopTitle :title="$t('拼团列表')"></CoreshopTitle>
      <section id="pinTuanBox">
        <div class="title-box">
          <p>
            <span class="cs-font-size-14">{{ $t("爆款推荐") }}</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M5.83333 10.4767L3.24333 6.32333L5.13333 5.15667L6.55667 7.44333L13.02 3.47667C11.7833 1.4 9.56667 0 7 0C3.12667 0 0 3.12667 0 7C0 10.8733 3.12667 14 7 14C10.8733 14 14 10.8733 14 7C14 6.51 13.9533 6.02 13.8367 5.55333L5.83333 10.4767Z"
                  fill="white"
                />
              </svg>
              <span style="margin-left: 4px">{{ $t("省钱省心限时拼") }}</span>
            </span>
          </p>
        </div>
        <div v-if="pinTuanData.list.length > 0">
          <ul class="pinTuan-box">
            <li
              v-for="(item, index) in pinTuanData.list"
              :key="item.id"
              class="cs-display-flex cs-justify-content-space-between"
            >
              <div class="tag" v-if="index < 3">TOP{{ index + 1 }}</div>
              <div
                class="cs-percent-w-28 cs-display-flex cs-border-radius-10 cs-foverflow-hidden"
              >
                <CoreshopImage
                  class="cs-w-100 cs-h-100"
                  :src="item.goodThumbnail"
                  root="#groupBuyingBox"
                >
                </CoreshopImage>
              </div>
              <div
                class="cs-percent-w-70 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
              >
                <p class="cs-font-size-16 cs-line-height-25 title">
                  {{ item.name }}
                </p>
                <p class="cs-font-size-13 cs-color-orange desc">
                  {{ item.goodName }}
                </p>
                <div class="cs-font-size-12 cs-display-flex cs-p-t-5 cs-p-b-5">
                  <Tag color="#39b54a">
                    <CoreshopLanguage :text="$t('已拼')" />
                    {{ item.buyPinTuanCount }}
                    <CoreshopLanguage :text="$t('单')" />
                  </Tag>
                  <Tag color="#f37b1d" class="cs-m-l-10 cs-m-r-10">
                    <CoreshopLanguage :text="$t('已售')" />
                    {{ item.pinTuanRecordNums }}{{ item.goodUnit }}
                  </Tag>
                  <Tag color="#16971C" class="peopleNumber"
                    >{{ item.peopleNumber || 0 }}
                    <CoreshopLanguage :text="$t('人团')" />
                  </Tag>
                </div>
                <div
                  class="cs-display-flex cs-justify-content-space-between cs-align-items-end"
                >
                  <p class="cs-line-height-no-px-1">
                    <span class="cs-font-size-16 cs-color-red"
                      >NT${{
                        item.pinTuanPrice > 0 ? item.pinTuanPrice : 0
                      }}</span
                    >
                    <span
                      class="cs-font-size-12 cs-m-l-10 cs-color-gray cs-text-decoration-line-through"
                      >NT${{ item.mktPrice }}</span
                    >
                  </p>
                  <CoreshopButton
                    @click="handleGoGoodDetail(item)"
                    class="cs-w-80 cs-align-self-flex-end"
                    :size="btnSize.tiny"
                  >
                    <CoreshopLanguage :text="$t('马上拼')" />
                  </CoreshopButton>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <CoreshopNoData v-else></CoreshopNoData>
      </section>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { queryPinTuanList } from "@/composables/member"
import type { Result } from "@/model/result"
import { IpinTuan } from "@/model/activity"
import { Tag } from "vant"
import { btnSize } from "@/enum"

definePageMeta({
  layout: false,
})

const pinTuanData: UnwrapRef<{
  list: Array<IpinTuan>
}> = reactive({
  list: [],
})

const queryPinTuan = async () => {
  const pinTuan: Result<Array<IpinTuan>> = await queryPinTuanList({})
  pinTuanData.list = pinTuan.data || []
}
queryPinTuan()

const handleGoGoodDetail = (item: any) => {
  return navigateTo(
    `/activity/pinTuan/detail?id=${item.id}&goodsId=${item.goodsId}`
  )
}
</script>

<style lang="scss" scoped>
.title-box {
  padding: 1rem 0.55rem;
  color: #fff;
  height: 2rem;
  background: linear-gradient(243deg, #f88518 2.65%, #ee0a89 41.02%);
  background-size: cover;
  background-position: center;
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.title,
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: #292b2e;
  font-weight: 500;
}
.desc {
  color: #aaaaaa;
}

.pinTuan-box {
  width: 9.5rem;
  margin: -1.8rem auto 0;
  border-radius: 5px;
  overflow: hidden;

  li {
    position: relative;
    padding: 0.3rem;
    background: #ffffff;
    margin-bottom: 0.25rem;
    // box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    .tag {
      z-index: 999;
      position: absolute;
      left: 0;
      top: 0;
      // z-index: 2;
      // line-height: 17.5px;
      // background: linear-gradient(132deg, #ff995d, #ff6361);
      // border-radius: 0px 9px 9px 0px;
      padding: 0 5px;
      font-size: 12px;
      font-weight: bold;
      color: rgba(255, 255, 255);
      border-radius: 0.2rem 0 0.35rem 0;
      text-align: center;
      width: 1.25rem;
      height: 0.55rem;
      line-height: 0.55rem;
      background: linear-gradient(270deg, #070707 6.45%, #4f4f4f 95.16%);
    }
  }

  li:last-child {
    border: 0;
  }
}
.cs-line-height-no-px-1 {
  span:first-child {
    font-weight: 600;
    color: #d33123;
  }
}
.n-button {
  box-sizing: border-box;
  width: 1.9;
  height: 0.7rem;
  border-radius: 0.85rem;
  background: linear-gradient(270deg, #d33123 -5.82%, #f27063 100%);
}
</style>
