<template>
    <div class="coreshop-margin-top-20 coreshop-border-radius-trbl-18 layout">
        <div
            class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
            v-if="props.coreshopData?.parameters?.lookTitle">
            <div class="coreshop-font-16 coreshop-span-black coreshop-font-weight-bold" style="color: #333;">
                {{props.coreshopData.parameters.title}}
            </div>
            <div  v-if="props.coreshopData?.parameters?.lookMore == 'true'" @click=" onGoGoodsList(props.coreshopData?.parameters?.classifyId)"
                class="coreshop-flex coreshop-align-center coreshop-font-10" style="color: #777;">
                <span>查看更多</span>
                <CoreshopIconArrowDoubleRight class="arrow-right-double"></CoreshopIconArrowDoubleRight>
            </div>
        </div>
        <div class="coreshop-span-black coreshop-margin-top-10">
            <NGrid :cols="props.coreshopData?.parameters?.column" x-gap="10">
                <NGi v-for="(item, index) in props.coreshopData?.parameters?.list" :key="item.id"
                    @click="onGoGoodsDetail(item.id)">
                    <div class="goods coreshop-padding-4 coreshop-bg-main display-block good-item">
                        <NImage :src="item.image" object-fit="cover" :preview-disabled="true" class="good-cover"></NImage>

                        <div
                            class="coreshop-padding-bottom-3 coreshop-padding-left-8 coreshop-padding-right-8 coreshop-bg-main coreshop-border-radius-bl-18 display-block">
                            <div class="coreshop-multiple-line-clamp">
                                <span class="coreshop-font-14">{{ item.name }}</span>
                            </div>
                            <div class="coreshop-flex coreshop-justify-between coreshop-align-center coreshop-margin-top-5">
                                <div class="coreshop-text-red coreshop-font-weight-bold">
                                    <span class="coreshop-font-16">NT$</span>
                                    <span class="coreshop-font-16">{{ item.price }}</span>
                                    <span
                                        class="coreshop-font-xs coreshop-text-through coreshop-margin-left-6 coreshop-text-gray"
                                        v-if="props.coreshopData?.parameters?.column == 2">{{ item.mktprice }}元</span>
                                </div>
                                <div>
                                    <span class="coreshop-font-10 coreshop-text-gray">已售{{ item.buyCount + item.initialSales
                                    }}{{ item.unit }}</span>
                                </div>
                            </div>
                            <div class="coreshop-divider" v-if="state.pointSwitch == 1 &&
                                state.pointExchangeModel == 2 &&
                                state.pointShowExchangePrice == 1 &&
                                item.pointsDeduction > 0
                                ">
                            </div>
                            <div class=" coreshop-font-11 coreshop-margin-top-10 coreshop-margin-bottom-5" :class="(props.coreshopData?.parameters?.column || 0) > 2
                                    ? 'coreshop-flex-direction-column'
                                    : 'coreshop-flex-direction-row'
                                " v-if="state.pointSwitch == 1 &&
        state.pointExchangeModel == 2 &&
        state.pointShowExchangePrice == 1 &&
        item.pointsDeduction > 0
        ">
                                <div> {{ state.pointShowName }}兑换价: </div>
                                <div class="coreshop-text-red">
                                    {{ state.pointDiscountedProportion! * item.pointsDeduction
                                    }}{{ state.pointShowName }}+{{
    (item.price - item.pointsDeduction).toFixed(2)
}}元
                                </div>
                            </div>
                            <div class="coreshop-flex coreshop-flex-direction-row coreshop-font-11 coreshop-margin-top-5 coreshop-margin-bottom-5"
                                v-if="state.pointSwitch == 1 &&
                                        state.pointGetModel == 2 &&
                                        state.pointShowPoint == 1 &&
                                        item.points > 0
                                        ">
                                <div> 购买赠送: </div>
                                <div class="coreshop-text-red">
                                    {{ item.points }}{{ state.pointShowName }}
                                </div>
                            </div>
                        </div>
                    </div>
                </NGi>
            </NGrid>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NImage, NGrid, NGi } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";
import { useConfigStore } from "@/store";
import { GoodConfig } from "@/model";

const props = withDefaults(defineProps<{ coreshopData?: GoodConfig }>(), {});
const state = useConfigStore().getConfig;
const onGoGoodsList = (classifyId?: string) => {
    if (!classifyId) {
        return;
    }
    return navigateTo(`/category?id=${classifyId}`);
};
const onGoGoodsDetail = (id: string) => {
    linkTypeNavigate(NavLinkTypeEnum.shop, id)
};
</script>

<style scoped lang="scss">
@import "@/assets/css/core-theme.scss";

.layout {
    display: block;
}

.arrow-right-double {
    width: 12px;
    height: 12px;
    margin-left: 4px;
    margin-bottom: 4px;
}

.display-block {
    display: block;
    line-height: 1.4;
}

.good-item {
    border-radius: 8px;
    margin-bottom: 10px;
}

:deep(.good-cover) {
    border-radius: 5px;

    img {
        width: 100%;
        object-fit: cover;
    }
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
        color: #FFFFFF;
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
        color: #FFFFFF;
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
        color: #FFFFFF;
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
}</style>
