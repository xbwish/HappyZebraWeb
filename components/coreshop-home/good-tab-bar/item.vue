<template>
  <div class="coreshop-span-black">
            <div class="flex-box clear-fix"  v-if="props.config?.column==2">
                <div class="coreshop-padding-bottom-10 coreshop-bg-main column-value2" v-for="(item,index) in props.config?.list" :key="index">
                    <div class="coreshop-padding-top-6 coreshop-padding-bottom-3 coreshop-padding-left-8 coreshop-padding-right-8 coreshop-bg-main coreshop-border-radius-bl-18" @click="onGoGoodsDetail(item.id)">  
                        <NImage :src="item.image" class="good-image" :preview-disabled="true" object-fit="cover"></NImage>
                      
                        <div class="coreshop-multiple-line-clamp">
                            <span class="coreshop-font-14">{{item.name}}</span>
                        </div>
                        <div class="coreshop-margin-top-8 coreshop-flex coreshop-justify-between coreshop-align-center coreshop-margin-bottom-5">
                            <div class="coreshop-text-red coreshop-font-weight-bold">
                                <span class="coreshop-font-12">NT$</span>
                                <span class="coreshop-font-16">{{item.price}}</span>
                                <span class="coreshop-font-xs  coreshop-text-through coreshop-margin-left-6 coreshop-text-gray">{{item.mktprice}}元</span>
                            </div>
                            <div>
                                <span class="coreshop-font-10 coreshop-text-gray">已售{{item.buyCount+item.initialSales}}{{item.unit}}</span>
                            </div>
                        </div>
                        <div class="coreshop-divider" v-if="state.pointSwitch==1 && state.pointExchangeModel==2 && state.pointShowExchangePrice==1 && item.pointsDeduction > 0">
                            <div class="complete"></div>
                        </div>
                        <div class="coreshop-flex coreshop-font-11 coreshop-margin-top-5 coreshop-margin-bottom-5" :class="props.config?.column>2?'coreshop-flex-direction-column':'coreshop-flex-direction-row'" v-if="state.pointSwitch==1 && state.pointExchangeModel==2 && state.pointShowExchangePrice==1 && item.pointsDeduction > 0">
                            <div>
                                {{ state.pointShowName}}兑换价:
                            </div>
                            <div class="coreshop-text-red">
                                {{state.pointDiscountedProportion! * item.pointsDeduction }}{{ state.pointShowName}}+{{ (item.price-item.pointsDeduction).toFixed(2)}} 元
                            </div>
                        </div>
                        <div class="coreshop-flex coreshop-flex-direction-row coreshop-font-11 coreshop-margin-top-5 coreshop-margin-bottom-5" v-if="state.pointSwitch==1 && state.pointGetModel==2 && state.pointShowPoint==1 && item.points > 0">
                            <div>
                                购买赠送:
                            </div>
                            <div class="coreshop-text-red">
                                {{item.points}}{{ state.pointShowName}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       <div class="flex-box3 clear-fix" v-if="props.config?.column==3">
                <div class="coreshop-padding-bottom-10 coreshop-bg-main column-value3" v-for="(item,index) in props.config?.list" :key="index" >
                    <div class="coreshop-padding-top-6 coreshop-padding-bottom-3 coreshop-padding-left-4 coreshop-padding-right-4 coreshop-bg-main coreshop-border-radius-bl-18" @click="onGoGoodsDetail(item.id)">
                        <NImage :src="item.image" class="good-image" :preview-disabled="true" object-fit="cover"></NImage>
                        <div class="coreshop-multiple-line-clamp">
                            <span class="coreshop-font-14">{{item.name}}</span>
                        </div>
                        <div class="coreshop-margin-top-8 coreshop-flex coreshop-justify-between coreshop-align-center coreshop-margin-bottom-5">
                            <div class="coreshop-text-red coreshop-font-weight-bold">
                                <span class="coreshop-font-12">¥</span>
                                <span class="coreshop-font-16">{{item.price}}</span>
                                <!-- <span class="coreshop-font-xs  coreshop-text-through coreshop-margin-left-6 coreshop-text-gray">{{item.mktprice}}元</span> -->
                            </div>
                            <div>
                                <span class="coreshop-font-10 coreshop-span-text">已售{{item.buyCount+item.initialSales}}{{item.unit}}</span>
                            </div>
                        </div>
                        <div class="coreshop-divider" v-if="state.pointSwitch==1 && state.pointExchangeModel==2 && state.pointShowExchangePrice==1 && item.pointsDeduction > 0">
                            <div class="complete"></div>
                        </div>
                        <div class="coreshop-flex coreshop-font-11 coreshop-margin-top-5 coreshop-margin-bottom-5" :class="props.config?.column>2?'coreshop-flex-direction-column':'coreshop-flex-direction-row'" v-if="state.pointSwitch==1 && state.pointExchangeModel==2 && state.pointShowExchangePrice==1 && item.pointsDeduction > 0">
                            <div>
                                {{ state.pointShowName}}兑换价:
                            </div>
                            <div class="coreshop-text-red">
                                {{state.pointDiscountedProportion! * item.pointsDeduction }}{{ state.pointShowName}}+{{ (item.price-item.pointsDeduction).toFixed(2)}} 元
                            </div>
                        </div>
                        <div class="coreshop-flex coreshop-flex-direction-row coreshop-font-11 coreshop-margin-top-5 coreshop-margin-bottom-5" v-if="state.pointSwitch==1 && state.pointGetModel==2 && state.pointShowPoint==1 && item.points > 0">
                            <div>
                                购买赠送:
                            </div>
                            <div class="coreshop-text-red">
                                {{item.points}}{{ state.pointShowName}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="coreshop-span-black" v-for="(item, index) in props.config?.list" :key="index" v-if="props.config?.column==1">
                <div class="coreshop-flex coreshop-justify-start coreshop-padding-top-10 coreshop-padding-bottom-10" v-if="props.config?.list.length" @click="onGoGoodsDetail(item.id)">
                    <div>
                        <NImage :src="item.image" :width="96" :height="96" :preview-disabled="true" object-fit="cover"></NImage>
                    </div>
                    <div class="coreshop-flex coreshop-flex-direction  coreshop-padding-left-10">
                        <div class="coreshop-font-14 u-line-2 coreshop-span-black">{{ item.name }}</div>
                        <div class="coreshop-font-11 coreshop-padding-top-5 coreshop-padding-bottom-3 u-line-2 coreshop-span-brown">{{ item.brief }}</div>
                        <div class="coreshop-flex coreshop-align-center coreshop-padding-top-10  coreshop-padding-bottom-10">
                            <div class="coreshop-font-11 coreshop-bg-orange coreshop-padding-2 coreshop-border-radius-4 coreshop-margin-right-10">已售{{item.buyCount}}{{item.unit}}</div>
                            <div class="coreshop-font-11 coreshop-bg-olive coreshop-padding-2 coreshop-border-radius-4">{{item.divCount}}人访问</div>
                        </div>
                        <div class="coreshop-flex coreshop-flex-direction-row coreshop-font-11 coreshop-margin-bottom-5" v-if="state.pointSwitch==1 && state.pointExchangeModel==2 && state.pointShowExchangePrice==1 && item.pointsDeduction > 0">
                            <div>
                                {{ state.pointShowName}}兑换价:
                            </div>
                            <div class="coreshop-text-red">
                                {{state.pointDiscountedProportion! * item.pointsDeduction }}{{ state.pointShowName}}+{{ (item.price-item.pointsDeduction).toFixed(2)}} 元
                            </div>
                        </div>
                        <div class="coreshop-flex coreshop-flex-direction-row coreshop-font-11 coreshop-margin-top-5" v-if="state.pointSwitch==1 && state.pointGetModel==2 && state.pointShowPoint==1 && item.points > 0">
                            <div>
                                购买赠送:
                            </div>
                            <div class="coreshop-text-red">
                                {{item.points}}{{ state.pointShowName}}
                            </div>
                        </div>
                        <div class="coreshop-flex coreshop-justify-between  coreshop-flex-direction-row coreshop-align-center">
                            <div class="coreshop-flex coreshop-align-center">
                                <div class="coreshop-font-14 coreshop-text-red">NT${{ item.price  }}</div>
                                <div class="coreshop-font-12 coreshop-text-gray coreshop-text-through">NT${{ item.mktprice }}</div>
                            </div>
                            <div class="coreshop-buy-btn">立即购</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui';
import { NavLinkTypeEnum } from "@/enum";
import { useConfigStore } from "@/store";
import { GoodTabBarItemConfig } from '@/model';
const props = withDefaults(defineProps<{ config?: GoodTabBarItemConfig }>(), {});
const state = useConfigStore().getConfig ;
const onGoGoodsDetail=(id:number)=>{
    linkTypeNavigate(NavLinkTypeEnum.shop,`${id}`)
}

</script>

<style scoped lang="scss">

:deep(.good-image){
    img{
    width: 100%;
    object-fit: cover;
    }
}
 .flex-box { column-count: 2; column-gap: 8px;
        .column-value2 { width: 100%; break-inside: avoid; color: #333333 !important; margin-bottom: 8px; }
    }
    .flex-box3 { column-count: 3; column-gap: 8px;
        .column-value3 { width: 100%; break-inside: avoid; color: #333333 !important; margin-bottom: 5px; }
    }
    .img { width: 100%; }
    .clear-fix::after { content: ''; display: block; height: 0; clear: both; }
    .clear-fix { zoom: 1; }
</style>
