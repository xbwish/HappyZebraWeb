<template>
    <div
        class="activity-wrap coreshop-padding-8 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18"
        v-if="props.coreshopData?.parameters?.list?.length"
    >
        <div class="groupon-title coreshop-margin-bottom-12">
            <div class="title-box coreshop-flex coreshop-justify-between coreshop-text-white">
                <div class="coreshop-font-16">每日拼團</div>
                <div @click="onGoPinTuanList()" class="coreshop-flex coreshop-align-center">
                    <span>查看更多</span>
                    <CoreshopIconArrowDoubleRight  class="arrow-right-double"></CoreshopIconArrowDoubleRight>
                </div>
            </div>
        </div>
        <div class="scroll-box">
            <div class="goods-box coreshop-flex coreshop-justify-between coreshop-text-black" style='display: grid;column-gap: 10px;grid-template-columns: repeat(3, minmax(0, 1fr));'>
                <div class="min-goods coreshop-bg-white coreshop-border-radius-5 coreshop-padding-right-6 coreshop-padding-left-6 coreshop-padding-top-6 coreshop-padding-bottom-6" style="grid-column: span 1 / span 1;box-sizing: border-box;" v-for="(item, index) in coreshopData.parameters.list" :key="index" @click="onGoPinTuanDetail(item.id)">
                    <NImage class="good-thumbnail coreshop-border-radius-5" width="100%" :src="item.goodThumbnail" object-fit="cover" :preview-disabled="true"></NImage>
                    <div class="item-card-bottom">
                        <div class="goods-title u-line-1">{{ item.name }}</div>
                        <div v-if="item.maxNums > 0" class="coreshop-display-inline-block coreshop-padding-top-2 coreshop-padding-bottom-2 coreshop-padding-left-4 coreshop-padding-right-4 coreshop-font-8 tag coreshop-bg-black coreshop-border-radius-4">{{$t("限购")}}{{ item.maxNums }}{{$t("份")}}</div>
                        <div v-else class="coreshop-display-inline-block coreshop-padding-top-2 coreshop-padding-bottom-2 coreshop-padding-left-4 coreshop-padding-right-4 coreshop-font-8 tag coreshop-bg-black coreshop-border-radius-4">不限購</div>
                        <div class="coreshop-flex coreshop-justify-between coreshop-align-center coreshop-margin-bottom-8">
                            <div class="price">{{item.pinTuanPrice}}</div>
                            <div class="original-price">NT${{ item.pinTuanPrice + item.discountAmount }}</div>
                        </div>
                        <div class="coreshop-groupPurchase-btn" style="width: 100%;">{{$t("立即下单")}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Tag } from 'vant';
import {NImage } from "naive-ui";
import { NavLinkTypeEnum } from '@/enum';

const props = withDefaults(defineProps<{
    coreshopData:{
        parameters:{
            list:Array<{
                id:number;
                goodThumbnail:string;
                name:string;
                pinTuanPrice:number;
                discountAmount:number;
                maxNums:number;
            }>
        }
    }
}>(),{});

const onGoPinTuanList=()=>{
    linkTypeNavigate(NavLinkTypeEnum.urlLink,'/pages/activity/pinTuan/list/list')
};

const onGoPinTuanDetail=(id:number)=>{
    linkTypeNavigate(NavLinkTypeEnum.urlLink,`/pages/activity/pinTuan/pinTuanDetails/pinTuanDetails?id=${id}`)
}

</script>

<style scoped lang="scss">
.arrow-right-double {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

.activity-wrap {
    min-height: 150px;
    background: #fff url(http://admin.happyzebra.com.tw/upload/20240302/c1a8ac43fd22abb1573dbaa616b44e5.png) no-repeat top left / 100% 100%;
        .groupon-title { background-position: center top; background-size: 100% auto; }
        .title-box {
            .title-text { font-size: 16px; font-weight: bold; color: #333333; }
            .more-box {
                .more-text { font-size: 11px; font-weight: 500; color: #333333; }
                .more-icon { font-size: 12px; color: #333333; }
            }
        }

        .scroll-box,
        .goods-box { min-height: 190px; width: 100%;  overflow: auto;}
    }

    // 商品卡片
    .min-goods {
        .goods-title { font-size: 11px; font-weight: 500; color: #000; line-height: 13px; }
        .price {
            font-size: 15px; font-weight: 500; color: #ff0000;
            &::before {
                content: 'NT$'; font-size: 12px;
            }
        }
        .original-price { font-size: 10px; font-weight: 500; text-decoration: line-through; color: #c4c4c4; }
        .groupon-num-box {
            .avatar-box { direction: rtl; unicode-bidi: bidi-override; height: 30rpx;
                .avatar-img { width: 30rpx; height: 30rpx; border-radius: 50%; background-color: #f5f5f5; }
            }
            .groupon-num-text { font-size: 18rpx; font-weight: 500; color: #e9b461; }
        }
    }

</style>
