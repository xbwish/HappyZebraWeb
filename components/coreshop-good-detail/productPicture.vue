<template>
    <div class="product__gallery">
        <div class="product-gallery">
            <div class="cs-position-relative ">
                <NCarousel dot-placement="right" :show-arrow="false" >
                    <div :class="[{ detailLunBoActive: productDetailState.video == props.goodDetail.video }, 'img-box',]"
                        v-if="props.goodDetail?.video">
                        <video :src="props.goodDetail.video" class="carousel-img cs-cursor-pointer "
                            :controls="true" @click="handleClickVideo((props.goodDetail.video) as string)"> </video>
                    </div>
                    <div :class="[{ detailLunBoActive: item == productDetailState.chooseProductImage }, 'img-box',]"
                        v-for="item in productDetailState.imageArr" :key="item">
                        <img class="carousel-img cs-object-fit-contain" :src="item" @click="handleClickImg(item)" />
                    </div>
                    <template #dots="{ total, currentIndex, to }">
                        <ul class="custom-dots">
                            <li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }"
                                @click="to(index - 1)" />
                        </ul>
                    </template>
                </NCarousel>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { UnwrapRef } from "vue";
import { NCarousel } from "naive-ui";
import { Product } from '@/model/product';

const props = withDefaults(defineProps<{
    goodDetail: Product;
}>(), {
    goodDetail: () => ({}),
});

const productDetailState: UnwrapRef<{
    chooseProductImage: string;
    video: string;
    imageArr: Array<string>;
}> = reactive({
    chooseProductImage: '',
    imageArr: [],
    video: "",
});

watch(() => props.goodDetail, (newVal, oldVal) => {
    if (newVal != null && newVal['image'] && newVal['images']) {
        productDetailState.imageArr = newVal.images.split(',');
        if (newVal.video) {
            productDetailState.video = newVal.video;
        } else {
            productDetailState.chooseProductImage = newVal.image;
        }
    }
}, {
    immediate: true,
})

const handleClickImg = (img: string) => {
    productDetailState.video = '';
    productDetailState.chooseProductImage = img;
};

const handleClickVideo = (video: string) => {
    productDetailState.chooseProductImage = '';
    productDetailState.video = video;
}

</script>

<style lang='scss' scoped>
.product__gallery{
    width: 10rem;
    margin: 0 auto;
}
.carousel-img {
    width: 100%;
    max-height: 370px;
    object-fit: cover;
}

.custom-arrow {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 10px;
}

.custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
}

.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
}

.custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-dots li.is-active {
    width: 40px;
    background: #fff;
}
</style>