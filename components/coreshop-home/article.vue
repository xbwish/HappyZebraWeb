<template>
  <div
    class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18"
    v-if="articleCount"
  >
    <div
      class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
    >
      <div class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold">
        {{ getArticle().title }}
      </div>
      <div
        @click="onRedirectArticleDetail()"
        class="coreshop-flex coreshop-align-center"
      >
        <text>查看更多</text>
        <CoreshopIconArrowDoubleRight
          class="arrow-right-double"
        ></CoreshopIconArrowDoubleRight>
      </div>
    </div>
    <div class="coreshop-divider">
      <div class="complete"></div>
    </div>
    <div class="coreshop-margin-bottom-10 coreshop-bg-main coreshop-text-black coreshop-index-article"   @click="onRedirectArticleDetail()">
      <div class="coreshop-cell-item" >
        <div class="coreshop-cell-item-bd">
          <div class="article-des u-line-5">
            {{ getArticle().brief }}
          </div>
        </div>
        <div class="cell-title-img">
          <NImage :src="getArticle().coverImage" mode="cover" class="coverImage"></NImage>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NImage } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";

interface Article {
  coreshopData?: {
    parameters: {
      list: Array<ArticleItem>;
    };
  };
}

interface ArticleItem {
  id?: string;
  title?: string;
  brief?: string;
  coverImage?: string;
}

const props = withDefaults(defineProps<Article>(), {
  coreshopData: () => ({
    parameters: {
      list: [],
    },
  }),
});

const articleCount = computed(() => props.coreshopData?.parameters?.list?.length);

const getArticle = (): ArticleItem => {
  return articleCount.value > 0 ? props.coreshopData.parameters.list[0] : {};
};
const onRedirectArticleDetail = () => {
    linkTypeNavigate(NavLinkTypeEnum.article, props.coreshopData.parameters?.list?.[0]?.id ||'')
};
</script>

<style lang="scss" scoped>
.arrow-right-double {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}
.coreshop-index-article {
  background: #ffffff !important;
  color: #333333 !important;
  overflow: hidden;
  .coreshop-cell-item {
    padding: 5px 0px 5px 0;
    float: left;
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
    .coreshop-cell-item-bd {
      float: left;
      width: calc(100% - 100px);
      .article-des {
        font-size: 14px;
        color: #999;
        overflow: hidden;
        float: left;
        line-height: 20px;
      }
    }
    .cell-title-img {
      width: 80px;
      height: 80px;
      float: right;
      .coverImage {
        width: 80px;
        height: 80px;
        border-radius: 2px;
      }
    }
  }
}
</style>
