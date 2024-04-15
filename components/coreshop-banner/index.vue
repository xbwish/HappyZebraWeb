<template>
    <NCarousel draggable :show-dots="props.showDots" :autoplay="props.autoplay" :interval="props.interval">
        <img v-for="item in props.list" :key="item" :src="item" alt="">
        <template #dots="{ total, currentIndex, to }">
            <ul class="custom-dots">
                <li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }"
                    @click="to(index - 1)" />
            </ul>
        </template>
    </NCarousel>
</template>

<script setup lang='ts'>
import { NCarousel } from 'naive-ui';

const props = withDefaults(defineProps<{
    list: Array<any>;
    showDots?:boolean;
    autoplay?:boolean;
    interval?:number;
}>(), {
    list: () => [],
    showDots:true,
    autoplay: true,
    interval:5000
});

</script>

<style lang='scss' scoped>
</style>