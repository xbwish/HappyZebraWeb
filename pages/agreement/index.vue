<template>
    <NuxtLayout name="personal-center">
        <div>
            <CoreshopTitle :title="$t('用户协议')"></CoreshopTitle>
            <section v-if="getAgentInfo.data" class="cs-p-10 cs-p-b-20 cs-background-color-white">
                <p class="cs-font-size-16 cs-text-align-center cs-p-20">{{getAgentInfo.data?.title}}</p>
                <p class="cs-font-size-14 cs-text-align-center cs-m-20 cs-color-gray">{{getAgentInfo.data?.createTime}}</p>
                <div class="cs-font-size-14 cs-line-height-25" v-html="getAgentInfo.data?.contentBody"></div>
            </section>
            <CoreshopNoData v-else :text="$t('暂无数据')"></CoreshopNoData>
        </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { queryArticleInfo } from '@/composables/notice';
import { useConfigStore } from '@/store';
import { Result } from "@/model/result";
import { Article } from '@/model//article';
import { Config } from '@/model/config';

definePageMeta({
    layout: false,
})

const config: Config = useConfigStore().getConfig;

const getAgentInfo: Result<Article> = await queryArticleInfo({
    id: config.userAgreementId
});
</script>

<style lang='scss' scoped>
.van-empty{
    background: #fff;
    margin: 10px;
    border-radius: 8px;
}
</style>