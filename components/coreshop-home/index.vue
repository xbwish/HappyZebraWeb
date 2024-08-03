<template>
  <div class="coreshop-page">
    <div class="bg-color"></div>
    <template
      v-for="(item, index) in props.homePageLayoutConfig || []"
      :key="index"
    >
      <!--视频-->
      <LazyCoreshopHomeVideo
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.video"
      >
      </LazyCoreshopHomeVideo>
      <!--文章分类-->
      <LazyCoreshopHomeArticleClassify
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.articleClassify"
      ></LazyCoreshopHomeArticleClassify>
      <!--文章-->
      <LazyCoreshopHomeArticle
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.article"
      >
      </LazyCoreshopHomeArticle>
      <!--图片轮播-->
      <LazyCoreshopHomeImgSlide
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.imgSlide"
      >
      </LazyCoreshopHomeImgSlide>
      <!--空格-->
      <LazyCoreshopHomeBlank
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.blank"
      >
      </LazyCoreshopHomeBlank>
      <!--文本内容-->
      <LazyCoreshopHomeContent
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.content"
      >
      </LazyCoreshopHomeContent>
      <!--搜索-->
      <LazyCoreshopHomeSearch
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.search"
      >
      </LazyCoreshopHomeSearch>
      <!--宫格自定义导航-->
      <LazyCoreshopHomeNavBar
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.navBar"
      >
      </LazyCoreshopHomeNavBar>
      <!--图片-->
      <LazyCoreshopHomeImgSingle
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.imgSingle"
      >
      </LazyCoreshopHomeImgSingle>
      <!--图片集-->
      <LazyCoreshopHomeImgWindow
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.imgWindow"
      >
      </LazyCoreshopHomeImgWindow>
      <!--服务商品-->
      <LazyCoreshopHomeServiceGood
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.service"
      >
      </LazyCoreshopHomeServiceGood>
      <!--商品-->
      <LazyCoreshopHomeGoods
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.goods"
      >
      </LazyCoreshopHomeGoods>
      <!--商品选项卡-->
      <LazyCoreshopHomeGoodTabBar
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.goodTabBar"
      >
      </LazyCoreshopHomeGoodTabBar>
      <!--团购-->
      <LazyCoreshopHomeGroupPurchase
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.groupPurchase"
      ></LazyCoreshopHomeGroupPurchase>
      <!--秒杀-->
      <LazyCoreshopHomeSeckill
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.seckill"
      >
      </LazyCoreshopHomeSeckill>
      <!--公告-->
      <LazyCoreshopHomeNotice
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.notice"
      >
      </LazyCoreshopHomeNotice>
      <!--多行文本输入区-->
      <LazyCoreshopHomeTextarea
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.textarea"
      >
      </LazyCoreshopHomeTextarea>
      <!--拼团-->
      <LazyCoreshopHomePinTuan
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.pinTuan"
      >
      </LazyCoreshopHomePinTuan>
      <!--优惠券-->
      <LazyCoreshopHomeCoupon
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.coupon"
      >
      </LazyCoreshopHomeCoupon>
      <!--弹窗广告-->
      <LazyCoreshopHomeAdpop
        :coreshopData="item"
        v-if="item.widgetCode === CustomComponentEnum.adpop"
      >
      </LazyCoreshopHomeAdpop>
    </template>
  </div>
  <PrivacyPolicy />
</template>

<script setup lang="ts">
import {} from "vue"
import { CustomComponentEnum } from "@/enum"
import PrivacyPolicy from "./privacy-policy.vue"

const props = withDefaults(
  defineProps<{
    homePageLayoutConfig: { [key: string]: any }
  }>(),
  { homePageLayoutConfig: () => ({}) }
)
</script>

<style scoped lang="scss">
.bg-color {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64%;
  z-index: -1;
  background: linear-gradient(
    180deg,
    #e74435 0%,
    #e74435 15.13%,
    #eef2f6 18.58%
  );
}
</style>
