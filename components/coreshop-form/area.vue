<template>
    <div class="cs-background-color-white cs-p-10">
        <div class="title">
            <div>{{ props.data.name }}：</div>
            <div v-if="props.data.required">
                <Tag type="primary">{{$t('必选')}}</Tag>
            </div>
        </div>
        <div class="goods-box">
            <CoreshopCascaderAddress :areaId="textState.value" :areaName="textState.areaName" @handleChangeValue="handleChangeValue" class="cs-m-t-20"
            style="    --van-cell-vertical-padding: 4px;--van-cell-horizontal-padding: 12px;"  />
        </div>
    </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from 'vue';
import { Tag } from 'vant';

const props = withDefaults(defineProps<{
    data: any;
}>(), {
    data: () => { }
});
let emits = defineEmits(['handleConfirm']);

const textState: UnwrapRef<{
    value: any;
    areaName?:string;
}> = reactive({
    value: props.data.defaultValue || null,
    areaName:undefined
});

const handleChangeValue = (val: number,  address: string) => {
    textState.value = val;
    textState.value=val;
    textState.areaName= address;
    emits('handleConfirm', {
        key: props.data.id,
        value: address,
    }) 
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