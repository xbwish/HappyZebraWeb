<template>
    <n-modal
        :show="props.showModal"
        :mask-closable="false"
        :preset="props.preset"
        :show-icon="false"
        :title="props.title"
        :content="props.content"
        :positive-text="props.positiveText"
        :negative-text="props.negativeText"
        @close="handleCancelClick"
        @positive-click="handleConfirmClick"
        @negative-click="handleCancelClick"
        :style="props.style"
         >
        <template #header>
            <slot name="header"></slot>
        </template>
        <slot></slot>
        <template #action>
            <slot name="action"></slot>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { NModal } from "naive-ui";

const props = withDefaults(defineProps<{
    showModal:boolean;
    title?: string;
    content?:string;
    positiveText?:string;
    negativeText?: string;
    style?:Object,
    preset?: any;  // 模态框使用何种预设 'dialog' | 'card'  具体参考网站 https://www.naiveui.com/zh-CN/light/components/modal#preset-card.vue
}>(), {
    showModal:false,
    title: '提示',
    content: '提示内容',
    positiveText:"确定",
    negativeText:"取消",
    preset:"dialog",
    style:()=>({})
});

const emits = defineEmits(['handleModalCancel', 'handleModalOk']);

const handleCancelClick =()=> {
    emits('handleModalCancel')
}
const handleConfirmClick = () => {
    emits('handleModalOk')

}

</script>
<style lang="scss" scoped> 
</style>
