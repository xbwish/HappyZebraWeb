<template>
    <div :class="[props.className, 'product-card product-card--hidden-actions']">
        <div class="product-card__image product-image">
            <div  class="product-image__body cs-cursor-pointer " @click="handleProductClick">
                <CoreshopImage class="product-image__img" :root="props.root" :radius="props.radius" :src="props.src"
                    :lazy="props.lazy">
                </CoreshopImage>
            </div>
        </div>
        <div class="product-card__info cs-cursor-pointer " @click="handleProductClick">
            <div class="product-card__name">
                {{ props.title }}
            </div>
            <div class="product-card__brief">
                {{ props.brief }}
            </div>
            <slot name="time"></slot>
        </div>
        <div class="product-card__actions">
            <div class="product-card__prices">
                {{ props.isPrice ? 'NT$' : $t('积分') }}
                {{ props.price }}
                <span class="cs-font-size-12 cs-color-gray cs-text-decoration-line-through"
                    v-if="props.activityPrice > props.price">NT${{ props.activityPrice }}</span>
            </div>
            <div class="product-card__buttons">
                <button class="btn btn-primary product-card__addtocart" type="button" @click="handleProductClick">
                    {{ $t('查看详情') }}
                </button>
                <button class="btn btn-secondary product-card__addtocart product-card__addtocart--list"
                    @click="handleProductClick" type="button">{{ $t('查看详情') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Product } from '@/model/product';

const props = withDefaults(defineProps<{
    root: string;   // 图片懒加载的父级id
    src: string;    // 商品图片地址
    title?: string;  // 商品名字
    brief?: string;
    titleSize?: number; // 商品名字大小
    titleWidth?: number; //商品名字宽度
    price?: number;  // 商品价格
    activityPrice?: number;  // 商品划线价格
    isHover?: boolean;   // 是否有hover效果
    isPrice?: boolean;  // price是否是价格,还有一种可能是显示积分
    line?: number; // 商品名字默认显示行数
    radius?: string;
    lazy?: boolean; // 图片是否懒加载
    isFav?: boolean;  // 是否收藏
    className?: string;
    detail?: Product;
}>(), {
    root: '',
    src: '',
    title: '',
    brief: '',
    titleSize: 14,
    titleWidth: 0,
    price: 199,
    activityPrice: 0,
    isHover: true,
    isPrice: true,
    line: 2,
    radius: '0px',
    lazy: true,
    isFav: false,
    className: "",
    detail: () => ({}),
});

let emit = defineEmits<{ (e: 'handleClick'): void }>();

const handleProductClick = () => {
    emit('handleClick')
}

</script>
<style lang="scss" scoped>

</style>
