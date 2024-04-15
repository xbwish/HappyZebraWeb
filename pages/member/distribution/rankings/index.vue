<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('分销排行')"></CoreshopTitle>
        <div class="distribution-box">
            <ul>
                <li class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-p-t-10 cs-p-b-10 cs-p-r-10"
                    v-for="item, index in distributionRankingData.list" :key="item.id">
                    <div class="cs-display-flex cs-align-items-center">
                        <div class="cs-w-45">
                            <img class="cs-w-30 cs-h-30 cs-display-block cs-margin-auto cs-object-fit-contain" v-if="item.ranking < 4" :src="'/images/distribution/0' + (item.ranking) + '.png'" alt="">
                            <p v-else class="cs-font-size-14 cs-text-align-center cs-color-gray">{{ item.ranking < 10 ?
                                    `0${item.ranking}` : item.ranking
                            }}</p>
                        </div>
                        <div class="cs-m-l-10">
                            <p class="cs-m-b-5 cs-font-weight-bold cs-font-size-16" style="color:#292B2E">{{ item.nickname }}</p>
                            <p class="cs-color-gray">{{ timeFormat(item.createtime, 'yyyy年mm月dd日') }}</p>
                        </div>
                    </div>
                    <div>
                        <p class="cs-m-b-5 cs-text-align-right cs-color-red cs-font-size-16">{{ item.totalInCome }}</p>
                        <p class="cs-color-gray cs-text-align-right">{{ $t('累计收益') }}</p>
                    </div>
                </li>
            </ul>
            <p class="no-more" v-if="distributionRankingData.list.length > 0 && !distributionRankingData.haveData">{{$t('没有更多了')}}</p>
            <CoreshopLoading v-if="distributionRankingData.isLoading" />
        </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { queryDistributionRanking } from '@/composables/distribution';
import { Result } from "~~/model/result";
import { AgentRanking, AgentRankingDataList } from '@/model/member'; 

definePageMeta({
    layout: false,
})

const distributionRankingData: UnwrapRef<{
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
    distributionRankingData.isLoading = true;

    const getDistributionRanking: Result<AgentRanking> = await queryDistributionRanking({
        page: distributionRankingData.page,
        limit: distributionRankingData.limit,
    });
    distributionRankingData.totalPages = getDistributionRanking.data.totalPages;
    if (getDistributionRanking.data?.data.length > 0) {
        distributionRankingData.list = distributionRankingData.list.concat(getDistributionRanking.data.data.map((item: any, index: number) => {
            item.ranking = index + (distributionRankingData.page * distributionRankingData.limit) - 9;
            return item;
        }));
    } else {
        distributionRankingData.haveData = false;
    }
    distributionRankingData.isLoading = false;

}
query();

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && distributionRankingData.haveData) {
            distributionRankingData.page++;
            query();
        }
    }, 500))
})
</script>

<style lang='scss' scoped>
.distribution-box {
    li{
        background: #FFFFFF;
        box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
        border-radius: 8px;
        margin: 10px;
        height: 70px;
        box-sizing: border-box;
    }
}
</style>