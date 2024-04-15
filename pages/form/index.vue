<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('万能表单')"></CoreshopTitle>

    <div v-if="formState.list.length > 0">
      <div class="cs-p-10 cs-background-color-white cs-m-b-10 form-item" v-for="item in formState.list" :key="item.id">
        <NuxtLink
          :to="`/form/detail/${item.id}`"
          class="cs-display-flex cs-align-items-center cs-align-content-center cs-justify-content-space-between"
        >
          <img class="cs-percent-w-10" :src="item.images" alt="" />
          <div class="cs-percent-w-80 title cs-color-black">
            {{ item.name }}
          </div>
          <div class="cs-percent-w-5">
            <Icon name="arrow"  :size="16"/>
          </div>
        </NuxtLink>
      </div>
    </div>
    <CoreshopNoData v-else :text="$t('暂无数据')" />
    <p class="no-more" v-if="formState.list.length > 0 && !formState.haveData">{{$t('没有更多了')}}</p>
    <CoreshopLoading v-if="formState.isLoading" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { queryFormList } from "@/composables/form";
import { Result } from "@/model/result";
import {Icon}  from 'vant';

definePageMeta({
  layout: false,
});

const formState: UnwrapRef<{
  isLoading: boolean;
  limit: number;
  page: number;
  list: Array<any>;
  haveData: boolean;
}> = reactive({
  isLoading: false,
  haveData: true,
  page: 1,
  limit: 20,
  list: [],
});

const query = async () => {
  formState.isLoading = true;

  const getCouponList: Result<Array<any>> = await queryFormList({
    limit: formState.limit,
    page: formState.page,
  });

  if (getCouponList.data.length > 0) {
    formState.list = formState.list.concat(
      getCouponList.data?.map((item: any) => {
        item.images = item.images.split(",")[0];
        return item;
      }) || []
    );
  } else {
    formState.haveData = false;
  }

  formState.isLoading = false;
};
query();

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && formState.haveData) {
        formState.page++;
        query();
      }
    }, 500)
  );
});
</script>

<style scoped lang="scss">
.form-item {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  margin: 10px;
}
</style>
