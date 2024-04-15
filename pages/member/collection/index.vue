<template>
  <NuxtLayout name="personal-center">
    <section>
      <CoreshopTitle :title="$t('我的收藏')"></CoreshopTitle>
      <ul id="collection-box" v-if="collectionData.list.length > 0">
        <li v-for="item in collectionData.list" :key="item.id">
          <nuxt-link :to="`/goods/detail/${item.goodsId}`">
            <div>
              <img :src="item.goods.image" alt="" />
            </div>
            <div>
              <p class="title">{{ item.goods.name }}</p>
              <p class="time">
                <Icon name="underway-o" size="15" />
                <span>{{ item.createTime }}</span>
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <CoreshopNoData v-else></CoreshopNoData>
      <p class="no-more" v-if="collectionData.list.length > 0 && !collectionData.haveData">{{$t('没有更多了')}}</p>
      <CoreshopLoading v-if="collectionData.isLoading" />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef, onMounted } from "vue";
import { queryGoodsCollectionList } from "~~/composables/categoryService";
import { Result } from "~~/model/result";
import { CollectionList, CollectionDetail } from "@/model/goods";
import { Icon } from "vant";
import { usePageConfig } from "@/store";

definePageMeta({
  layout: false,
});

usePageConfig().set_show_back(true);

const collectionData: UnwrapRef<{
  list: Array<CollectionDetail>;
  haveData: boolean;
  page: number;
  isLoading: boolean;
}> = reactive({
  list: [],
  page: 1,
  haveData: true,
  isLoading: false,
});

const query = async () => {
  collectionData.isLoading = true;

  const getGoodsCollectionList: Result<CollectionList> = await queryGoodsCollectionList({
    limit: 20,
    page: collectionData.page,
    status: 0,
  });
  if (getGoodsCollectionList.data?.list.length > 0) {
    collectionData.list = collectionData.list.concat(getGoodsCollectionList.data?.list || []);
  } else {
    collectionData.haveData = false;
  }
  collectionData.isLoading = false;
};
query();

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && collectionData.haveData) {
        collectionData.page++;
        query();
      }
    }, 500)
  );
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
