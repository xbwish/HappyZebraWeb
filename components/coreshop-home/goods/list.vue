<template>
    <div class="body">
        <!-- 列表平铺单列 -->
        <div class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18">
            <div class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
                v-if="props.coreshopData?.parameters?.lookTitle">
                <div class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold">
                    {{ props.coreshopData?.parameters.title }}
                </div>
                <div  v-if="props.coreshopData?.parameters?.lookMore == 'true'" @click="onGoGoodsList({
                    catId: props.coreshopData?.parameters?.classifyId,
                    brandId: props.coreshopData?.parameters?.brandId,
                })
                    " class="coreshop-flex coreshop-align-center">
                    <span>查看更多</span>
                    <CoreshopIconArrowDoubleRight class="arrow-right-double"></CoreshopIconArrowDoubleRight>
                </div>
            </div>
            <div class="coreshop-text-black coreshop-margin-top-10"
                v-for="(item, index) in props.coreshopData?.parameters!.list" :key="index" v-if="countRef"
                @click="onGoGoodsDetail(item.id)">
                <div class="coreshop-flex coreshop-justify-start coreshop-padding-top-10 coreshop-padding-bottom-10">
                    <NImage :src="item.image" :height="130" :width="130" :preview-disabled="true" object-fit="cover">
                    </NImage>
                    <div class="coreshop-flex coreshop-flex-direction coreshop-padding-left-10 coreshop-percent-100">
                        <div class="coreshop-font-14 u-line-2 coreshop-text-black">
                            {{ item.name }}
                        </div>
                        <div
                            class="coreshop-font-11 coreshop-padding-top-5 coreshop-padding-bottom-3 u-line-2 coreshop-text-brown">
                            {{ item.brief }}
                        </div>
                        <div class="coreshop-flex coreshop-align-center coreshop-padding-top-10 coreshop-padding-bottom-10">
                            <div
                                class="coreshop-font-11 coreshop-bg-orange coreshop-padding-2 coreshop-border-radius-4 coreshop-margin-right-10">
                                已售{{ item.buyCount + item.initialSales }}{{ item.unit }}
                            </div>
                            <div class="coreshop-font-11 coreshop-bg-olive coreshop-padding-2 coreshop-border-radius-4">
                                {{ item.divCount }}人访问
                            </div>
                        </div>
                        <div
                            class="coreshop-flex coreshop-justify-between coreshop-flex-direction-row coreshop-align-center">
                            <div class="coreshop-flex coreshop-align-center">
                                <div class="coreshop-font-14 coreshop-text-red">NT${{ item.price }}</div>
                                <div class="coreshop-font-12 coreshop-text-gray coreshop-text-through">
                                    NT${{ item.mktprice }}
                                </div>
                            </div>
                            <div class="coreshop-buy-btn">马上抢</div>
                        </div>
                    </div>
                    <div class=" coreshop-flex-direction-row coreshop-font-11 coreshop-margin-top-5" v-if="state.pointSwitch == 1 &&
                        state.pointExchangeModel == 2 &&
                        state.pointShowExchangePrice == 1 &&
                        item.pointsDeduction > 0
                        ">
                        <div>{{ state.pointShowName }}兑换价:</div>
                        <div class="coreshop-text-red">
                            {{ state.pointDiscountedProportion! * item.pointsDeduction
                            }}{{ state.pointShowName }}+{{
    (item.price - item.pointsDeduction).toFixed(2)
}}
                            元
                        </div>
                    </div>
                    <div class="coreshop-flex coreshop-flex-direction-row coreshop-font-11 coreshop-margin-top-5"
                        v-if="state.pointSwitch == 1 && state.pointGetModel == 2 && state.pointShowPoint == 1 && item.points > 0">
                        <div>购买赠送:</div>
                        <div class="coreshop-text-red">
                            {{ item.points }}{{ state.pointShowName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NImage } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";
import { GoodConfig } from '@/model/home-config';
import { useConfigStore } from "@/store";

const state = useConfigStore().getConfig;

const props = withDefaults(defineProps<{ coreshopData?: GoodConfig }>(), {});

const countRef = computed(() => props.coreshopData?.parameters?.list?.length);

const onGoGoodsList = (params: { catId?: string; brandId?: string }) => {
    if (!params.catId) {
        return;
    }
    return navigateTo(`/category?id=${params.catId}`);
};
const onGoGoodsDetail = (id: string) => {
    linkTypeNavigate(NavLinkTypeEnum.shop, id)
};
</script>

<style scoped lang="scss">
@import "@/assets/css/core-theme.scss";

.arrow-right-double {
    width: 12px;
    height: 12px;
    margin-left: 4px;
}

.good_box {
    border-radius: 8px;
    background-color: #ffffff;
    padding: 5px;
    position: relative;
    width: 100%;

    .good_title {
        font-size: 14px;
        margin-top: 5px;
        color: $u-main-color;
    }

    .good-tag-hot {
        display: flex;
        margin-top: 5px;
        position: absolute;
        top: 7.5px;
        left: 7.5px;
        background-color: $u-type-error;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 2px 7px;
        border-radius: 25px;
        font-size: 10px;
        line-height: 1;
    }

    .good-tag-recommend {
        display: flex;
        margin-top: 5px;
        position: absolute;
        top: 7.5px;
        right: 7.5px;
        background-color: $u-type-primary;
        color: #ffffff;
        margin-left: 10px;
        border-radius: 25px;
        line-height: 1;
        padding: 2px 7px;
        display: flex;
        align-items: center;
        border-radius: 25px;
        font-size: 10px;
    }

    .good-tag-recommend2 {
        display: flex;
        margin-top: 5px;
        position: absolute;
        bottom: 7.5px;
        left: 7.5px;
        background-color: $u-type-primary;
        color: #ffffff;
        border-radius: 25px;
        line-height: 1;
        padding: 2px 7px;
        display: flex;
        align-items: center;
        border-radius: 25px;
        font-size: 10px;
    }

    .good-price {
        font-size: 15px;
        color: $u-type-error;
        margin-top: 5px;
    }
}

.indicator-dots {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    .indicator-dots-item {
        background-color: $u-tips-color;
        height: 6px;
        width: 6px;
        border-radius: 10px;
        margin: 0 3px;
    }

    .indicator-dots-active {
        background-color: $u-type-primary;
    }
}

.swiper3 {
    height: 200px;
}

.swiper2 {
    height: 270px;
}

.image2 {
    height: 150px;
}

.image3 {
    height: 150px;
}
</style>
