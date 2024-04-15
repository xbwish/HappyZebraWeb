<template>
  <!-- 代理价格 -->
  <div class="agent-price" v-if="props.agentData?.userAgentGrade?.name">
    <div class="title">
      <p class="cs-font-weight-bold">代理價格</p>
      <p class="cs-font-size-14">您的等級：{{ props.agentData?.userAgentGrade.name }}</p>
    </div>
    <table v-if="props.agentData?.agentProducts.length > 0" :border="1" style="border-collapse: collapse">
      <tr align="center">
        <td>貨品名稱</td>
        <td>銷售價</td>
        <td>代理價</td>
        <td>利潤</td>
      </tr>
      <tr v-for="(item, index) in detailData.agentList" :key="index" align="center">
        <td>{{ item.name }}</td>
        <td>NT${{ item.price }}</td>
        <td>NT${{ item.agentPrice }}</td>
        <td>NT${{ item.profit }}</td>
      </tr>
    </table>
    <p v-else class="cs-font-size-12 cs-color-gray">該商品暫未錄入商品池價格</p>
  </div>
  <!-- 评价 -->
  <div class="reviews-list" v-if="detailData.comments?.length">
    <div class="title">
      <p class="cs-font-weight-bold">評價({{ detailData.comments.length }})</p>
      <p
        class="cs-font-size-12 cs-display-flex cs-align-items-center"
        v-if="detailData.comments.length > 0"
        @click="handleGoevaluate"
      >
        查看更多
        <NIcon :size="15">
          <CoreshopIconChevronRight28Regular />
        </NIcon>
      </p>
    </div>
    <ol class="reviews-list__content" v-if="detailData.comments.length > 0">
      <li class="reviews-list__item" v-for="item in detailData.comments" :key="item.id">
        <div class="review__avatar"><img :src="item.avatarImage" alt="" /></div>
        <div class="review__content">
          <div class="cs-font-size-12 cs-p-b-5 cs-display-flex cs-text-align-center">
            <span class="cs-m-r-5">{{ item.nickName }}</span>
            <NRate readonly :default-value="item.score" size="small" />
          </div>
          <div class="cs-font-size-14">
            {{ item.contentBody }}
          </div>
          <div class="cs-font-size-12 cs-color-gray">
            {{ item.createTime }} <br />
            {{ item.addon || "" }}
          </div>
          <div v-if="item.sellerContent">商家回復：{{ item.sellerContent }}</div>
        </div>
      </li>
    </ol>
    <div v-else class="cs-font-size-20">暫無評估</div>
  </div>
  <!-- 参数 -->
  <div class="spec__section" v-if="props.goodParams && props.goodParams.length > 0">
    <div class="title">
      <p class="cs-font-weight-bold">參數</p>
    </div>
    <div class="cs-border-solid cs-border-radius-5 cs-foverflow-hidden">
      <div class="spec__row" v-for="(item, index) in props.goodParams" :key="index">
        <div class="spec__name">{{ item.name }}</div>
        <div class="spec__value cs-border-solid-bottom">{{ item.value }}</div>
      </div>
    </div>
  </div>
  <!-- 商品详情 -->
  <div class="typography">
    <div class="title">
      <p class="cs-font-weight-bold">{{$t("商品详情")}}</p>
    </div>
    <div class="cs-text-align-center" v-html="props.intro"></div>
  </div>
  <!-- 常见问题 -->
  <div class="spec-problem">
    <div class="title">
      <p class="cs-font-weight-bold">{{$t("常见问题")}}</p>
    </div>
    <div class=" cs-border-radius-5 cs-foverflow-hidden">
      <div class="spec__row" v-for="(item, index) in props.commonQuestion" :key="index">
        <div class="spec__name cs-font-size-12">{{ item.title }}</div>
        <div class="spec__value cs-line-height-30 cs-font-size-12">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { queryGoodComment } from "@/composables/productService";
import { Result } from "@/model/result";
import { NIcon, NRate } from "naive-ui";
import { CommentData, Comment } from "@/model/product";
import { GoodParams } from "@/model/goods";
import { Product } from "@/model/product";

interface agentList {
  name: string;
  price: number;
  agentPrice: number;
  profit: number;
}

const props = withDefaults(
  defineProps<{
    intro: string;
    commonQuestion: any;
    id: any;
    goodParams?: Array<GoodParams>;
    agentData?: any;
    goodDetail?: Product;
  }>(),
  {
    intro: "",
    commonQuestion: null,
    id: null,
    goodParams: () => [],
    agentData: null,
    goodDetail: () => ({}),
  }
);

const detailData: UnwrapRef<{
  comments: Array<Comment>;
  agentList: Array<agentList>;
}> = reactive({
  comments: [],
  agentList: [],
});

if (props.agentData?.agentProducts?.length > 0) {
  props.agentData?.agentProducts.forEach((item: any) => {
    props.goodDetail?.skuList?.sku_list.forEach((skuItem: any) => {
      if (item.productId == skuItem._id) {
        detailData.agentList.push({
          name: skuItem.sku_name_arr[0],
          price: item.productPrice,
          agentPrice: item.agentGradePrice,
          profit: Number((Number(item.productPrice) * 1000 - Number(item.agentGradePrice) * 1000) / 1000),
        });
      }
    });
  });
}
//#region 查询商品评论
const getGoodComment = async () => {
  const goodCommentResult: Result<CommentData> = await queryGoodComment({
    id: (props.id as unknown) as number,
    page: 1,
    limit: 1,
  });
  console.log(goodCommentResult)
  detailData.comments = goodCommentResult.data?.list || [];
};
getGoodComment();
//#endregion

// 热销
const handlerProductHot = (id: number) => {
  navigateTo(`/goods/detail/${id}`);
};

// 看评价
const handleGoevaluate = () => {
  navigateTo(`/goods/comment/${props.id}`);
};
</script>
<style scoped lang="scss">
.agent-price {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.2rem;
    font-size: 0.35rem;
  }
  table {
    width: 100%;
    border-color: #dcdcdc;
    tr {
      td {
        padding: 0.15rem 0;
      }
      td:first-child {
        width: 50%;
        background-color: #eee;
      }
    }
  }
}

.reviews-list {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.3rem;
    font-size: 0.35rem;
  }

  li {
    display: flex;
    justify-content: space-between;

    .review__avatar {
      width: 10%;

      img {
        display: block;
        width: 100%;
        border-radius: 50%;
      }
    }

    .review__content {
      width: 88%;
    }
  }
}

.spec__section {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.3rem;
    font-size: 0.35rem;
  }

  .spec__row {
    display: flex;
    font-size: 0.35rem;

    .spec__name {
      width: 30%;
      padding: 0.2rem 0;
      background-color: #eee;
      text-align: center;
    }

    .spec__value {
      width: 70%;
      padding: 0.2rem 0;
      text-indent: 1em;
    }
  }

  .spec__row:last-child {
    .spec__value {
      &:after {
        content: none;
      }
    }
  }
}

.typography {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.3rem;
    font-size: 0.35rem;
  }

  :deep(.image) {
    padding: 0;
    margin: 0;
  }

  :deep(img) {
    width: 100% !important;
    height: 100% !important;
  }
}

.spec-problem {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.3rem;
    font-size: 0.35rem;
  }

  .spec__row {
    display: flex;
    font-size: 0.35rem;

    .spec__name {
      width: 20%;
      padding: 0.3rem 0;
      text-align: center;
    }

    .spec__value {
      width: 76%;
      padding: 0.3rem 2%;
    }
  }

  .spec__row:last-child {
    &:after {
      content: none;
    }
  }
}
.agent-price,.reviews-list,.spec__section,.typography,.spec-problem {
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
}
</style>
