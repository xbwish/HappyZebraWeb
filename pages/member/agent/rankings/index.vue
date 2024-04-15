<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('代理商排行')"></CoreshopTitle>
        <div class="agent-box">
            <ul>
                <li class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-p-t-10 cs-p-b-10 cs-p-r-10 cs-border-solid-bottom"
                    v-for="item in agentRankingData.list" :key="item.id">
                    <div class="cs-display-flex cs-align-items-center">
                        <div class="cs-w-45">
                            <img class="cs-w-30 cs-h-30 cs-display-block cs-margin-auto cs-object-fit-contain"
                                v-if="item.ranking < 4" :src="'/images/0'+(item.ranking)+'.png'" alt="">
                            <p v-else class="cs-font-size-20 cs-text-align-center cs-color-gray">{{item.ranking < 10 ?
                                    `0${item.ranking}`: item.ranking}}</p>
                        </div>
                        <div class="cs-m-l-20">
                            <p class="cs-font-weight-bold cs-font-size-14">{{item.nickname}}</p>
                            <p class="cs-color-gray">{{ timeFormat(item.createtime, 'yyyy年mm月dd日') }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="cs-color-red cs-font-size-16 cs-text-align-right">{{ item.totalInCome }}</p>
                        <p class="cs-text-align-right">{{ $t('累计收益') }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <p class="no-more" v-if="agentRankingData.list.length > 0 && !agentRankingData.haveData">{{$t('没有更多了')}}</p>
        <CoreshopLoading v-if="agentRankingData.isLoading" />
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { queryAgentRanking } from '@/composables/agent';
import { Result } from "~~/model/result";
import { AgentRanking,AgentRankingDataList } from '@/model/member';
definePageMeta({
    layout: false,
})
const agentRankingData: UnwrapRef<{
    page: number;
    limit: number;
    list: Array<AgentRankingDataList>;
    totalPages: number;
    haveData: boolean;
    isLoading: boolean;

}> = reactive({
    page: 1,
    limit: 10,
    list: [],
    totalPages: 0,
    haveData: true,
    isLoading: false,

})

const query = async () => {
    agentRankingData.isLoading = true;

    const getAgentRanking: Result<AgentRanking> = await queryAgentRanking({
        page: agentRankingData.page,
        limit: agentRankingData.limit,
    });
    agentRankingData.totalPages = getAgentRanking.data.totalPages;

    if (getAgentRanking.data?.data.length > 0) {
        agentRankingData.list = agentRankingData.list.concat(getAgentRanking.data.data.map((item: AgentRankingDataList, index: number) => {
            item.ranking = index + (agentRankingData.page * agentRankingData.limit) - 9;
            return item;
        }));
    } else {
        agentRankingData.haveData = false;
    }
    agentRankingData.isLoading = false;

}
query();

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && agentRankingData.haveData) {
            agentRankingData.page++;
            query();
        }
    }, 500))
})
</script>

<style lang='scss' scoped>
.agent-box {
    li{
        background: #FFFFFF;
        box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
        border-radius: 8px;
        margin: 10px;
    }
}
</style>