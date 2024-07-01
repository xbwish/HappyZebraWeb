<template>
    <div class="coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18"
        v-if="props.coreshopData?.parameters?.display == 'slide'">
        <div class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
            v-if="props.coreshopData?.parameters?.lookTitle">
            <div class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold">
                {{ props.coreshopData?.parameters?.title }}
            </div>
            <div v-if="props.coreshopData?.parameters?.lookMore == 'true'" @click="
                onGoGoodsList({
                    catId: props.coreshopData?.parameters?.classifyId,
                    brandId: props.coreshopData?.parameters?.brandId,
                })
                " class="coreshop-flex coreshop-align-center">
                <span>查看更多</span>
                <CoreshopIconArrowDoubleRight class="arrow-right-double"></CoreshopIconArrowDoubleRight>
            </div>
        </div>
        <div v-if="pageCountCMP">
            <NCarousel class="good-carousel coreshop-padding-bottom-10">
                <NCarouselItem v-for="(good, index) in renderGoods" :key="index">
                    <NGrid :cols="props.coreshopData.parameters.column">
                        <NGi v-for="item in good || []" :key="item.id" @click="onGoGoodsDetail(item.id)">
                            <div class="good_box">
                                <NImage :src="item.image" :preview-disabled="true" object-fit="cover" :height="props.coreshopData.parameters.column == 3
                                        ? 104
                                        : props.coreshopData.parameters.column == 2
                                            ? 164
                                            : 104
                                    " class="good-cover"></NImage>
                                <div class="good_title u-line-2">
                                    {{ item.name }}
                                </div>
                                <div class="good-price coreshop-display-block">
                                    NT${{ item.price }}
                                    <span
                                        class="coreshop-font-xs coreshop-text-through coreshop-margin-left-5 coreshop-text-gray">NT${{
                                            item.mktprice }}</span>
                                </div>
                                <div class="good-tag-recommend" v-if="item.isRecommend">推荐</div>
                                <div class="good-tag-hot" v-if="item.isHot">热门</div>
                                <div class="coreshop-flex coreshop-flex-direction-row coreshop-font-11 coreshop-margin-top-5"
                                    v-if="state.pointSwitch == 1 &&
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
                                    v-if="state.pointSwitch == 1 &&
                                            state.pointGetModel == 2 &&
                                            state.pointShowPoint == 1 &&
                                            item.points > 0
                                            ">
                                    <div>购买赠送:</div>
                                    <div class="coreshop-text-red">
                                        {{ item.points }}{{ state.pointShowName }}
                                    </div>
                                </div>
                            </div>
                        </NGi>
                    </NGrid>
                </NCarouselItem>
            </NCarousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue";
import { NCarousel, NCarouselItem, NGrid, NGi, NImage } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";
import { useConfigStore } from "@/store";
import type { GoodConfig, GoodItem } from "@/model";

const props = withDefaults(defineProps<{ coreshopData?: GoodConfig }>(), {});
const state = useConfigStore().getConfig;

const pageCountCMP = computed(() =>
    Math.ceil((props.coreshopData?.parameters?.list?.length || 0) /
        props.coreshopData?.parameters?.column!
    )
);

const renderGoods = computed(() => {
    let goods: Array<Array<GoodItem>> = [];
    const count: number = pageCountCMP.value;

    if (count <= 0) {
        return [];
    }
    const goodItems: Array<GoodItem> = props.coreshopData?.parameters?.list || [];
    const column: number = props.coreshopData?.parameters?.column || 0;
    for (let index = 0; index < count; index++) {
        goods.push(goodItems.filter((item, idx) => idx >= index * column && idx < (index + 1) * column))
    }
    return goods;
})

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

:deep(.good-cover) {
    border-radius: 5px;

    img {
        width: 100%;
        object-fit: cover;
    }
}

:deep(.good-carousel) {
    .n-carousel__dots {
        .n-carousel__dot {
            background-color: $u-tips-color !important;
        }

        .n-carousel__dot--active {
            background-color: $u-type-primary !important;
        }
    }
}

:deep(.n-carousel.n-carousel--bottom .n-carousel__dots) {
    bottom: 0 !important;
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
        line-height: 20px;
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
