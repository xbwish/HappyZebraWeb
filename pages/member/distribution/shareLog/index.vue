<template>
    <NuxtLayout name="personal-center">
        <div>
            <CoreshopTitle :title="$t('分享记录')"></CoreshopTitle>
            <ul class="tab-box">
                <li v-for="item in shareLogData.tabsList" :key="item.value" @click="handleTabChange(item.value)"
                    :class="[{'active':shareLogData.tabCurrent == item.value},'cs-font-size-14 ']">
                    {{item.name}}
                </li>
            </ul>
        </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    layout: false,
})
const shareLogData: UnwrapRef<{
    tabsList: Array<{
        name: string;
        value: string;
    }>;
    tabCurrent: string;
}> = reactive({
    tabCurrent: 'all', //默认
    tabsList: [
        {
            name: coreShopLang('全部'),
            value: 'all'
        },
        {
            name: coreShopLang('名片'),
            value: 'index'
        },
        {
            name: coreShopLang('商品'),
            value: 'goods'
        },
        {
            name: coreShopLang('拼团'),
            value: 'groupon'
        }
    ],
});



const handleTabChange = (val: string) => {
    shareLogData.tabCurrent = val;
}
</script>

<style lang='scss' scoped>
.tab-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 0 15px #dcdcdc;
    li{
        width: 25%;
        padding: 0.3rem 0;
        text-align: center;
        border-bottom: 1px solid #fff;
    }
    .active {
        border-bottom: 1px solid #e84f5d;
    }
}
</style>