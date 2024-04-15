<template>
    <n-image class="cs-display-block cs-text-align-center cs-position-relative" :style="'border-radius:' + props.radius" v-if="props.src"
        :lazy="props.lazy" :preview-disabled="disabled" :src="props.src" :preview-src="props.previewSrc || props.src"
        :intersection-observer-options="{
            root: props.root
        }" :object-fit="props.objectFit">
        <template #placeholder>
            <div class="loading-img">
                Loading
            </div>
        </template>
    </n-image>
</template>

<script setup lang="ts">
import { NImage } from "naive-ui";
const props = withDefaults(defineProps<{
    src: string;
    root: string;  // 进入元素视口之后开始加载(元素的id)
    disabled?: boolean;
    radius?: string;
    previewSrc?: string;
    lazy?: boolean,
    width?: number;
    height?: number;
    objectFit?: any;  // 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}>(), {
    src: '',
    root: '',
    disabled: true,
    radius: '4px',
    objectFit: 'fill',
    previewSrc: '',
    lazy: true,
});

</script>
<style lang="scss" scoped>
:deep(img) {
    width: 100%;
    height: 100%;
}

.loading-img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0001;
}
</style>
