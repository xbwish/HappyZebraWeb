<template>
    <Popup v-model:show="props.showModal" :round="true" :safe-area-inset-bottom="true" position="bottom"
        @click-overlay="handleMask" :z-index="1000" 
        :style="{ height: '8.5rem' }" class="pop-up">
        <div class="cs-p-20 cs-p-b-50">
            <p class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-16 cs-m-b-10">
                <span>{{ props.title }}</span>
                <Icon :size="20" name="close"  class="close-icon" @click="handleMask" />
            </p>
             <CellGroup>
                <Field  label="發票類型">
                  <template #input>
                    <RadioGroup v-model="invoiceState.type" direction="horizontal">
                        <Radio :name="item.value"  v-for="(item, index) in invoiceTypeItems" :key="index" checked-color="#f56c6c">{{item.name }}</Radio>
                    </RadioGroup>
                  </template>
                </Field>
                <Field v-model="invoiceState.name" label="抬頭及統編" placeholder="請輸入抬頭及統編" />

                <template v-if="invoiceState.type == invoiceType.company">
                   <Field v-model="invoiceState.code" label="稅務編號" placeholder="請輸入稅務編號" />
                   <Field  label="發票內容" placeholder="明細"  disabled />
                </template>
             </CellGroup>
            <CoreshopButton class="cs-percent-w-100 btn-box" :bordered="true" :size="btnSize.medium" text="确定" @onClick="handleModalOk" />
        </div>
    </Popup>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { InvoiceDetail } from '@/model/member';
import { invoiceType } from '@/enum';
import { Popup , showToast,Icon ,Field, CellGroup, RadioGroup, Radio } from "vant";
import { btnSize } from '@/enum';

const invoiceTypeItems = [{
    name: '個人發票',
    value: invoiceType.personal
},
{
    name: '公司發票',
    value: invoiceType.company
}];

let props = withDefaults(defineProps<{
    showModal: boolean;
    title?: string;
}>(), {
    showModal: false,
    title: '添加發票',
});

const invoiceState: UnwrapRef<{
    type: number;
    invoiceList: Array<InvoiceDetail>;
    name?: string;
    code?: string;
}> = reactive({
    type: invoiceType.personal,
    invoiceList: [],
    name: undefined,
    code: undefined,
});

const emits = defineEmits(['handleModalOk', 'handleModalCancel']);

const handleModalOk = () => {
    if (!invoiceState.name) {
        showToast('发票抬头不能为空');
        return;
    }
    if (invoiceState.type === invoiceType.company && !invoiceState.code) {
        showToast('税务编号不能为空');
        return;
    }

    if(invoiceState.type===invoiceType.personal){
        invoiceState.code = undefined;
    }

    emits('handleModalOk', invoiceState)
}

const handleMask = () => {
    emits('handleModalCancel')

}
</script>

<style lang='scss' scoped>
.pop-up{
    position: relative;
    .btn-box{
        position: absolute;
        bottom: 15px;
        width: 90% !important;
    }
}
</style>