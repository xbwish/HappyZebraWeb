<template>
    <div class="cs-background-color-white cs-p-10">
        <div class="title">
            <div>{{ props.data.name }}：</div>
            <div v-if="props.data.required">
                <n-tag type="error">{{$t('必选')}}</n-tag>
            </div>
        </div>
        <div class="goods-box">
            <n-input v-model:value="textState.value" :disabled="true" @click="handleGetCoordinate" type="text" :placeholder="$t('点击获取位置信息')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from 'vue';
import { NTag, NInput } from 'naive-ui';

const props = withDefaults(defineProps<{
    data: any;
}>(), {
    data: () => { }
});

const textState: UnwrapRef<{
    value: string;
}> = reactive({
    value: props.data.defaultValue,
});

const handleGetCoordinate = ()=>{

}

</script>

<style scoped lang="scss">
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.35rem;
}

.goods-box {
    margin: 0.2rem 0;
    font-size: 0.4rem;
}
</style>