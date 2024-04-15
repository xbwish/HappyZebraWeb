<template>
    <div class="product product--layout--standard" data-layout="standard">
        <div class="product__content">
            <CoreshopGoodDetailProductPicture :goodDetail="props.goodDetail" />
            <CoreshopGoodDetailProductTitle :goodDetail="props.goodDetail" :sharePageType="props.sharePageType"
                :shareType="props.shareType" :teamId="props.teamId">
                <!-- 运费之类的 -->
                <template #meta>
                    <slot name="meta" />
                </template>
            </CoreshopGoodDetailProductTitle>

            <CoreshopGoodDetailProductPrice :goodDetail="props.goodDetail" :chooseSku="props.chooseSku"
                @handleShowSku="handleShowSku" :delivery="props.serviceDescription?.delivery" :promotionList="props.promotionList"
                :service="props.serviceDescription?.service">
                <!-- 倒计时 -->
                <template #countdown>
                    <slot name="countdown" />
                </template>
                <template #point>
                    <slot name="point"></slot>
                </template>
                <!-- 购买按钮 -->
                <template #button>
                    <slot name="button" />
                </template>
            </CoreshopGoodDetailProductPrice>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { UrlSharePageType, ShareType } from "@/enum";
import { addGoodsBrowsing } from "@/composables/productService";
import { useAccountStore } from '@/store';
import { PromotionList } from '@/model/product'; 

const props = withDefaults(defineProps<{
    goodDetail: any;
    chooseSku: any;
    serviceDescription: any;
    sharePageType?: number;
    shareType?: number;
    teamId?: number;
    promotionList?:Array<PromotionList>
}>(), {
    goodDetail: {},
    chooseSku: {},
    serviceDescription: {},
    sharePageType: UrlSharePageType.goods,
    shareType: ShareType.url,
    teamId: 1,
    promotionList:()=>([]),
});

watch(() => props.goodDetail, async (newVal, oldVal) => {
    if (useAccountStore().getToken) {
        //#region 添加商品浏览足迹
        await addGoodsBrowsing({
            id: newVal.id,
        })
        //#endregion
    }
})

let emits = defineEmits<{
    (e: 'handleShowSku'): void
}>();

const handleShowSku = () => {
    emits('handleShowSku');
}

</script>