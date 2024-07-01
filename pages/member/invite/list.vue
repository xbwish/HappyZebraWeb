<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('邀请列表')"></CoreshopTitle>
    <div>
      <!-- 推广列表 -->
      <div class="team-box">
        <ul class="cs-border-radius-10" v-if="recommendState.list.length > 0">
          <li
            v-for="item in recommendState.list"
            :key="item.nickName"
            class="cs-display-flex cs-border-solid-bottom cs-p-t-10 cs-p-b-10 cs-align-items-center cs-justify-content-space-between"
          >
            <div class="cs-display-flex cs-align-items-center">
              <div>
                <img
                  class="cs-w-35 cs-h-35 cs-percent-border-radius-50"
                  :src="item.avatarImage"
                  alt=""
                />
              </div>
              <div class="cs-m-l-10">
                <p class="cs-font-size-16 cs-m-b-0">{{ item.nickName }}</p>
                <p class="cs-font-size-12 cs-color-gray cs-m-b-0">
                  {{ timeFormat(item.createTime, "yyyy年mm月dd日") }}
                </p>
              </div>
            </div>
            <div>
              <p class="cs-font-size-14 cs-m-b-0">{{ item.mobile }}</p>
              <p class="cs-font-size-12 cs-m-b-0">
                {{ $t("下级成员") }}：{{ item.childNum || 0 }} {{ $t("人") }}
              </p>
            </div>
          </li>
        </ul>
        <CoreshopNoData v-else :text="$t('暂无')" />
        <p
          class="no-more"
          v-if="recommendState.list.length > 0 && !recommendState.haveData"
        >
          {{ $t("没有更多了") }}
        </p>
      </div>
      <CoreshopLoading v-if="recommendState.isLoading" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Result } from "@/model/result"
import type { UnwrapRef } from "vue"
import { queryRecommendUserList } from "@/composables/agent"
import { RecommendUser } from "@/model/member"

definePageMeta({
  layout: false,
})

const recommendState: UnwrapRef<{
  list: Array<any>
  page: number
  limit: number
  totalPages: number
  haveData: boolean
  isLoading: boolean
}> = reactive({
  list: [],
  page: 1,
  limit: 10,
  totalPages: 0,
  haveData: true,
  isLoading: false,
})

const query = async () => {
  recommendState.isLoading = true

  const getRecommendUserList: Result<Array<RecommendUser>> =
    await queryRecommendUserList({
      page: recommendState.page,
      limit: recommendState.limit,
    })
  recommendState.totalPages = getRecommendUserList.otherData.totalPages
  if (getRecommendUserList.data.length > 0) {
    recommendState.list = recommendState.list.concat(
      getRecommendUserList.data || []
    )
  } else {
    recommendState.haveData = false
  }
  recommendState.isLoading = false
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
      if (scrollH - scrollT - screenH < 60 && recommendState.haveData) {
        recommendState.page++
        query()
      }
    }, 500)
  )
})
</script>

<style scoped>
.team-box {
  width: 9.4rem;
  padding: 0 0.3rem;
  background-color: #fff;
  border-radius: 5px;
}
</style>
