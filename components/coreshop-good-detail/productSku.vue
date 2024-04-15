<template>  
    <Popup  v-model:show="props.show" :round="true" :safe-area-inset-bottom="true"
        position="bottom" @click-overlay="handleMask"  :z-index="9999"
        :style="{ height: 'auto' }">
        <div class="sku-box">
            <NIcon :size="25" class="close-icon" @click="handleMask">
                <CoreshopIconClose />
            </NIcon>
            <div class="img-box">
                <div>
                    <img :src="productDetailState.chooseSku?.image" alt="">
                </div>
                <div>
                    <p class="price">NT$<span>{{ productDetailState.chooseSku?.price }}</span></p>
                    <p class="cs-font-size-12 cs-color-gray">庫存：{{ props.goodDetail?.stock }}</p>
                    <p class="cs-font-size-14">已選：{{ productDetailState.chooseSku?.sku_name_arr?.[0] }}</p>
                </div>
            </div>
            <div v-if="props.goodDetail?.skuList && props.goodDetail?.skuList?.sku_list">
                <p class="cs-font-size-14 cs-m-b-5 cs-word-break-keep-all">規格</p>
                <p class="size">
                    <span v-for="item in props.goodDetail?.skuList?.sku_list" :key="item._id"
                        :class="[{ active: productDetailState.chooseSku?._id === item._id }]" @click="handleChooseSku(item)">
                        {{ item.sku_name_arr?.[0] }}
                    </span>
                </p>
            </div>
            <div class="cs-m-t-10 cs-display-flex cs-text-align-center cs-justify-content-space-between">
                <p class="cs-font-size-14 cs-word-break-keep-all">數量</p>
                <!-- <CoreshopAddSubtract :value="productDetailState.nums" @add="handleAddNum" @subtract="handleSubtract">
                </CoreshopAddSubtract> -->
                <Stepper v-model="productDetailState.nums" theme="round" button-size="22" @change="handleChangeNums" integer />
            </div>
            <slot name="button"></slot>
        </div>
    </Popup> 
</template>

<script setup lang='ts'>
import { NIcon } from "naive-ui";
import { SkuItem } from "@/model/product";
import { Popup,Stepper } from "vant";


const props = withDefaults(defineProps<{
    goodDetail: any;
    chooseSku: SkuItem | null;
    show: boolean; 
}>(), {
    goodDetail: {},
    chooseSku: null,
    show: false, 
});

const productDetailState = reactive({
    chooseSku: props.chooseSku,
    nums: 1,
})


let emits = defineEmits<{
    // 把数量提供出去
    (e: 'handleChangeGoodNum', num: number): void
    // 把选择的sku供出去
    (e: 'handleChangeGoodSku', sku: SkuItem): void
    // 关闭sku弹框
    (e: 'handleShowSku'): void
}>();


watch(() => props.chooseSku, (newVal, oldVal) => {
    productDetailState.chooseSku = newVal
}, {
    deep: true
})

const handleMask = ()=>{
    emits('handleShowSku');
}

const handleChooseSku = (sku: SkuItem) => {
    productDetailState.chooseSku = sku;
    emits('handleChangeGoodSku', sku);
};

// const handleAddNum = () => {
//     productDetailState.nums = productDetailState.nums + 1;
//     emits('handleChangeGoodNum', productDetailState.nums);
// };

// const handleSubtract = () => {
//     productDetailState.nums = Math.max(0, productDetailState.nums - 1);
//     emits('handleChangeGoodNum', productDetailState.nums);
// };

const handleChangeNums = ()=>{
    emits('handleChangeGoodNum', productDetailState.nums);
}
</script>

<style lang='scss' scoped>
.sku-box{
    position: relative;
    padding: 20px;
    .close-icon{
        position: absolute;
        right: 10px;
        top: 10px;
    }
}
.img-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;

    div:nth-of-type(1) {
        width: 25%;

        img {
            display: block;
            width: 100%;
            border-radius: 5px;
        }
    }

    div:nth-of-type(2) {
        width: 73%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .price {

            color: #e84f5d;

            span {
                font-size: 0.6rem;
            }
        }
    }
}

.size {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;

    span {
        font-size: 0.3rem;
        padding: 0.15rem;
        border-radius: 5px;
        text-align: center;
        margin-right: 0.1rem;
        margin-bottom: 0.2rem;
        cursor: pointer;
        line-height: 0.4rem;
        border: 1px solid #dcdcdc;
    }

    span:nth-of-type(2n) {
        margin-right: 0;
        margin-left: 0.1rem;
    }

    span.active {
        border: 1px solid #f56c6c;
    }
}

:deep(.van-stepper--round) {
    .van-stepper__plus {
        background-color: #f56c6c !important;
    }

    .van-stepper__minus {
        background-color: #ffffff !important;
        border: 1px solid #DEDEDE;
        color: #333333;
    }
}
</style>