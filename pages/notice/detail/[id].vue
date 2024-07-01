<template>
  <NuxtLayout name="personal-center">
    <div class="cs-p-10 cs-background-color-white">
      <CoreshopTitle :title="data.title"></CoreshopTitle>
      <section class="cs-m-t-10">
        <p class="cs-font-size-16 cs-text-align-center">{{ data.title }}</p>
        <p
          class="cs-font-size-14 cs-p-b-10 cs-m-t-10 cs-color-gray cs-text-align-center cs-border-solid-bottom"
        >
          {{ data.createTime }}
        </p>
        <div class="cs-m-t-10 cs-font-size-14" v-html="data.contentBody"></div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import type { Result } from "@/model/result"
import { queryNoticeInfo } from "@/composables/notice"
import { Notice } from "@/model/member"

definePageMeta({
  layout: false,
})

const route = useRoute()

const data: UnwrapRef<{
  title: string
  createTime: string
  contentBody: string
}> = reactive({
  title: "",
  createTime: "",
  contentBody: "",
})

// 获取订单详情
const getDetail = async () => {
  const detailRes: Result<Notice> = await queryNoticeInfo({
    id: route?.params.id,
  })
  data.title = detailRes.data.title
  data.createTime = detailRes.data.createTime
  data.contentBody = detailRes.data.contentBody
}
getDetail()
</script>

<style lang="scss" scoped>
.uhihn {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 10px;
  display: inline-block;
  border: 1px dashed #e1e1e1;
  text-align: center;
  line-height: 100px;
  color: #d1d1d1;
  font-size: 40px;
  box-sizing: border-box;
}

.user-head-img-tip {
  position: absolute;
  top: -3px;
  left: -5px;
  display: inline-block;
  background-color: #ff7159;
  color: #fff;
  font-size: 11px;
  z-index: 99;
  padding: 5px 15px;
  border-radius: 5px;
  transform: scale(0.8);
}
</style>
