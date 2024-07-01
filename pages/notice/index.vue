<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('消息通知')"></CoreshopTitle>
    <div class="cs-p-20 note-contain">
      <div v-if="noticeData.list.length > 0">
        <n-collapse
          default-expanded-names="1"
          accordion
          arrow-placement="right"
        >
          <n-collapse-item
            :title="item.title"
            v-for="(item, index) in noticeData.list"
            :name="index"
            :key="index"
          >
            <template #header>
              <div class="notice-box">
                <div
                  class="cs-font-size-14 cs-m-b-4"
                  v-html="item.contentBody"
                ></div>
                <div class="cs-font-size-12 cs-color-gray">
                  {{ item.createTime }}
                </div>
              </div>
            </template>
            <template #arrow>
              <NIcon color="#000" :size="16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="7"
                  viewBox="0 0 14 7"
                  fill="none"
                >
                  <path
                    d="M1.58334 1L6.99758 6L12.4167 1"
                    stroke="#292B2E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </NIcon>
            </template>
            <div class="notice-box">
              <div class="cs-font-size-14" v-html="item.contentBody"></div>
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
      <CoreshopNoData v-else :text="$t('暂无通知公告')"></CoreshopNoData>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { NCollapse, NCollapseItem } from "naive-ui"
import { queryNoticeList } from "@/composables/notice"
import type { Result } from "@/model/result"
import { Notice } from "@/model/member"
import { NIcon } from "naive-ui"
definePageMeta({
  layout: false,
})

const noticeData: UnwrapRef<{
  page: number
  limit: number
  list: Array<Notice>
}> = reactive({
  page: 1,
  limit: 100,
  list: [],
})

const query = async () => {
  const noticeRes: Result<Array<Notice>> = await queryNoticeList({
    limit: noticeData.limit,
    page: noticeData.page,
  })
  noticeData.list = noticeRes.data
  console.log("tag", noticeRes)
}
query()
</script>

<style lang="scss" scoped>
.note-contain {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 0.2rem;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem !important;
}
.notice-box {
  padding: 0.1rem;
  border-radius: 0.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

:deep(.n-collapse-item--active .n-collapse-item-arrow) {
  transform: rotate(180deg) !important;
}
</style>
