<template>
  <NuxtLayout name="coreshop-shop-header-back">
    <div>
      <CoreshopTitle :title="$t('帮助中心')"></CoreshopTitle>
      <ul class="tab-list">
        <li
          v-for="(item, index) in articleDataState.classifyList"
          :key="index"
          :class="{ on: index == articleDataState.index }"
          @click="hanldeTab(index, item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div v-if="articleDataState.list.length > 0">
        <div class="cs-p-10 article-item" v-for="item in articleDataState.list" :key="item.id">
          <NuxtLink
            :to="`/article/detail/${item.id}`"
            class="cs-display-flex cs-align-items-center cs-align-content-center cs-justify-content-space-between"
          >
            <img class="cs-percent-w-10" :src="item.coverImage" alt="" />
            <div class="cs-percent-w-80 title">
              {{ item.title }}
            </div>
            <div class="cs-percent-w-5">
              <NIcon color="#8799a3" :size="20">
                <CoreshopIconChevronRight28Regular />
              </NIcon>
            </div>
          </NuxtLink>
        </div>
      </div>
      <CoreshopNoData v-else :text="$t('暂无')" />
      <p class="no-more" v-if="articleDataState.list.length > 0 && !articleDataState.haveData">{{$t('没有更多了')}}</p>
      <CoreshopLoading v-if="articleDataState.isLoading" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { NIcon } from "naive-ui";
import { queryArticleList } from "@/composables/notice";
import { Result } from "@/model/result";
import { ArticleList, ArticleArticleType } from "@/model/article";
import { ArticleClassify } from "@/model/article";
import { queryArticleClassify } from "@/composables/articleService";
import { usePageConfig } from "@/store";

definePageMeta({ layout: false });

const articleDataState: UnwrapRef<{
  page: number;
  limit: number;
  list: Array<any>;
  articleType: Array<ArticleArticleType>;
  showModal: boolean;
  id: number;
  totalPages: number;
  haveData: boolean;
  isLoading: boolean;
  classifyList: Array<any>;
  index: number;
}> = reactive({
  page: 1,
  limit: 30,
  list: [],
  articleType: [],
  showModal: false,
  id: 0,
  totalPages: 0,
  haveData: true,
  isLoading: false,
  classifyList: [],
  index: 0,
});

usePageConfig().set_back_style({ "align-items": "flex-end" });

// 分类
const articleResult: Result<Array<ArticleClassify>> = await queryArticleClassify();
articleDataState.classifyList = articleResult.data;
articleDataState.id = articleResult.data[0].id;

const handleQuery = async () => {
  articleDataState.isLoading = true;

  const articleRes: Result<ArticleList> = await queryArticleList({
    limit: articleDataState.limit,
    page: articleDataState.page,
    id: articleDataState.id,
  });

  articleDataState.totalPages = articleRes.data.totalPages;

  if (articleRes.data?.list.length > 0) {
    articleDataState.list = articleDataState.list.concat(articleRes.data?.list || []);
  } else {
    articleDataState.haveData = false;
  }

  if (articleDataState.articleType.length === 0) {
    articleDataState.id = articleRes.data.articleType[0].id;
    articleDataState.articleType = articleRes.data.articleType;
  }
  articleDataState.isLoading = false;
};
handleQuery();

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && articleDataState.haveData) {
        articleDataState.page++;
        handleQuery();
      }
    }, 500)
  );
});

const hanldeTab = (index: number, id: number) => {
  if (index != articleDataState.index) {
    articleDataState.index = index;
    articleDataState.id = id;
    articleDataState.list = [];
    articleDataState.haveData = true;
    articleDataState.isLoading = false;
    articleDataState.page = 1;
    handleQuery();
  }
};
const handleViewDetail = (id: number) => {
  window.location.href = `/article/detail/${id}`;
};
</script>
<style scoped lang="scss">
.tab-list {
  width: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 0 15px #dcdcdc;
  margin-bottom: 0.2rem;
  li {
    font-size: 0.37rem;
    flex: 1;
    text-align: center;
    padding: 0.3rem 0;
    border-bottom: 1px solid #fff;
    font-weight: 600;
  }

  li.on {
    position: relative;
    // border-bottom: 1px solid #D33123;
    color: #D33123;
  }
  li.on:after {
    content: "";
    display: inline-block;
    width: 0.9rem;
    height:0.075rem;
    background: #D33123;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 0.05rem;
  }
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.article-item {
  background: #ffffff;
  margin: 10px;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
}
</style>
