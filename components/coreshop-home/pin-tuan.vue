<template>
    <div class="activity-wrap coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18" v-if="props.coreshopData?.parameters?.list?.length">
        <div class="groupon-title">
            <div class="title-box coreshop-flex coreshop-justify-between">
                <div class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold">每日拼團</div>
                <div @click="onGoPinTuanList()" class="coreshop-flex coreshop-align-center">
                    <span>查看更多</span>
                    <CoreshopIconArrowDoubleRight  class="arrow-right-double"></CoreshopIconArrowDoubleRight>
                </div>
            </div>
        </div>
        <div class="coreshop-divider">
            <div class="complete"></div>
        </div>
        <div class="scroll-box">
            <div class="goods-box coreshop-flex  coreshop-justify-between coreshop-text-black">
                <div class="min-goods" v-for="(item, index) in coreshopData.parameters.list" :key="index" @click="onGoPinTuanDetail(item.id)">
                    <div class="img-box">
                        <NImage class="good-thumbnail" :width="140" :height="140" :src="item.goodThumbnail" object-fit="cover" :preview-disabled="true"></NImage>
                    </div>
                    <div class="item-card-bottom coreshop-padding-10">
                        <div class="goods-title u-line-1">{{ item.name }}</div>
                        <div class="price coreshop-margin-bottom-5">{{item.pinTuanPrice}}</div>

                        <div class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between">
                            <div class="original-price">NT${{ item.pinTuanPrice + item.discountAmount }}</div>
                            <div class="coreshop-font-10">
                                <Tag v-if="item.maxNums>0" plain round type="warning" size="medium"> 限購{{item.maxNums}} </Tag>
                                <Tag v-if="item.maxNums==0" plain round type="success" size="medium">不限購</Tag>
                            </div>
                        </div>
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

.activity-wrap { background-color: #fff; min-height: 150px; background: linear-gradient(#faecca 20%, #ffffff 30%, #ffffff 100%);
        .groupon-title { background: url('/images/groupon_title_bg.png') no-repeat; background-position: center top; background-size: 100% auto; }
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
    .min-goods { background: #fffaef; box-shadow: 0px 3.5px 4px 0.5px rgba(162, 117, 27, 0.24); border-radius: 5px; margin-right: 15px !important;
        .img-box { width: 140px; height: 140px; overflow: hidden; position: relative; border-radius: 5px 5px 0 0;
            .img { width: 140px; height: 140px; background-color: #ccc; }
        }
        .item-card-bottom { min-height: 75px; background: url('/images/groupon_goods_bg.png') no-repeat; background-position: bottom center; background-size: 100% 100%; }
        .goods-title { font-size: 13px; font-weight: 500; color: #000000; line-height: 13px; margin-bottom: 5px; }
        .price { font-size: 15px; font-weight: 500; color: #ff0000;
            &::before { content: 'NT$'; font-size: 12px; }
        }
        .original-price { font-size: 20rpx; font-weight: 500; text-decoration: line-through; color: #c4c4c4; }
        .groupon-num-box {
            .avatar-box { direction: rtl; unicode-bidi: bidi-override; height: 30rpx;
                .avatar-img { width: 30rpx; height: 30rpx; border-radius: 50%; background-color: #f5f5f5; }
            }
            .groupon-num-text { font-size: 18rpx; font-weight: 500; color: #e9b461; }
        }
    }

</style>
