<template>
  <div
    class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-4"
    v-if="articleCount"
  >
    <div
      class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
    >
      <div class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold">
        {{ props.coreshopData?.parameters?.articleClassifyObj?.name }}
      </div>

      <div
        @click="onRedirectArticleClassify()"
        class="coreshop-flex coreshop-align-center"
      >
        <span>查看更多</span>
        <CoreshopIconArrowDoubleRight
          class="arrow-right-double"
        ></CoreshopIconArrowDoubleRight>
      </div>
    </div>
    <div class="coreshop-divider">
      <div class="complete"></div>
    </div>
    <div class="coreshop-bg-main coreshop-text-black">
      <div
        class="coreshop-index-article coreshop-cell-group coreshop-margin-bottom-10 coreshop-margin-top-10 coreshop-bg-white"
        v-if="articleCount"
      >
        <div
          class="coreshop-cell-item"
          v-for="(item, index) in props.coreshopData?.parameters?.list"
          :key="index"
          @click="onViewArticleDetail(item.id)"
        >
          <div class="coreshop-cell-item-bd">
            <div class="article-title">
              {{ item.title }}
            </div>
            <div class="article-des u-line-2">
              {{ item.brief }}
            </div>
          </div>
          <div class="cell-title-img">
            <NImage :src="item.coverImage" object-fit="cover" :height="80" :width="80" class="coverImage"></NImage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NImage } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";

interface ArticleClassify {
  coreshopData?: {
    parameters?: {
      articleClassifyObj?: {
        name?: string;
        id?:string;
      };
      list?: Array<{
        id: string;
        title: string;
        brief: string;
        coverImage: string;
      }>;
    };
  };
}

const props = withDefaults(defineProps<ArticleClassify>(), {
  coreshopData: () => ({
    parameters: {
      articleClassifyObj: { },
      list: [],
    },
  }),
});

const articleCount = computed(() => props.coreshopData?.parameters?.list?.length);

const onRedirectArticleClassify = () => {
    linkTypeNavigate(NavLinkTypeEnum.articleCategory, props.coreshopData?.parameters?.articleClassifyObj?.id ||'')
};

const onViewArticleDetail = (articleId: string) => {
    linkTypeNavigate(NavLinkTypeEnum.article, articleId)
};
</script>

<style scoped lang="scss">
.arrow-right-double {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}
.coreshop-index-article {
  border-radius: 8px;
  background: #ffffff !important;
  color: #333333 !important;
  overflow: hidden;
  .coreshop-cell-item {
    padding: 8px 0px 8px 0;
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
    justify-content: space-between;
    .coreshop-cell-item-bd {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      .article-title {
        font-size: 14px;
        color: #333;
        width: 100%;
        overflow: hidden;
        margin-bottom: 5px;
      }
      .article-des {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        float: left;
        line-height: 20px;
      }
    }
    .cell-title-img {
      width: 80px;
      height: 80px;
      .coverImage {
        width: 80px;
        height: 80px;
        border-radius: 2px;
      }
    }
  }
}
</style>
