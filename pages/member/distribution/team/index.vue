<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('我的团队')"></CoreshopTitle>
        <div>
            <div class="distribution-box">
                <!-- 推荐人 -->
                <p v-if="teamData.referrerInfo && teamData.referrerInfo.avatarImage"
                    class="cs-display-flex cs-font-size-14 cs-align-items-center cs-color-white">{{
                        $t('推荐人')
                    }}：
                    <img calss="cs-w-20 cs-m-r-5" :src="teamData.referrerInfo.avatarImage" alt="">
                    {{ teamData.referrerInfo.nickName }}
                </p>
                <p v-else class="cs-font-size-14 cs-color-white">{{ $t('推荐人') }}：{{ $t('无') }}</p>

                <!-- 团队数据总览 -->
                <div class="cs-m-t-10">
                    <div class="detail-panner cs-p-10" style="color: #fff;">
                        <div>
                            <p class="cs-font-size-16 cs-m-b-6" >{{ teamData.userInfo.count || 0 }}</p>
                            <p class="cs-font-size-12">{{ $t('团队总人数') }} ({{ $t('人') }})</p>
                        </div>
                        <div>
                            <p class="cs-font-size-16 cs-m-b-6">{{ teamData.userInfo.first || 0 }}</p>
                            <p class="cs-font-size-12">{{ $t('一级成员') }}</p>
                        </div>
                           
                        <div>
                            <p class="cs-font-size-16 cs-m-b-6">{{ teamData.userInfo.second || 0 }}</p>
                            <p class="cs-font-size-12">{{ $t('二级成员') }}</p>
                        </div>
                    </div>
                    <div class="detail-panner cs-p-10 cs-background-color-white">
                        <div>
                            <p class="cs-font-size-16 cs-m-b-6">{{ teamData.userInfo.monthCount || 0 }}</p>
                            <p class="cs-font-size-12 cs-color-gray">{{ $t('本月推广人数') }} ({{
                                $t('人')
                            }})</p>
                        </div>
                        <div>
                            <p class="cs-font-size-16 cs-m-b-6">{{ teamData.userInfo.monthFirst || 0 }}</p>
                            <p class="cs-font-size-12 cs-color-gray">{{ $t('一级成员') }}</p>
                        </div>
                        <div>
                            <p class="cs-font-size-16 cs-m-b-6">{{ teamData.userInfo.monthSecond || 0 }}</p>
                            <p class="cs-font-size-12 cs-color-gray">{{ $t('二级成员') }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 团队列表 -->
            <div class="team-box">
                <p class="cs-font-size-16 cs-p-b-10">{{ $t('团队列表') }}</p>
                <ul class="cs-border-radius-10" v-if="teamData.list.length > 0">
                    <li v-for="item in teamData.list" :key="item.nickName"
                        class="cs-display-flex cs-p-t-10 cs-p-b-10 cs-align-items-center cs-justify-content-space-between"
                        style="height: 50px;">
                        <div class="cs-display-flex cs-align-items-center">
                            <div>
                                <img class="cs-w-35 cs-h-35 cs-percent-border-radius-50" :src="item.avatarImage" alt="">
                            </div>
                            <div class="cs-m-l-10">
                                <p class="cs-font-size-14 cs-m-b-6">{{ item.nickName }}</p>
                                <p class="cs-font-size-12 cs-color-gray cs-m-b-0">{{
                                    timeFormat(item.createTime,
                                    'yyyy年mm月dd日')
                                }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p class="cs-font-size-14 cs-m-b-0">{{ item.mobile }}</p>
                            <p class="cs-font-size-12 cs-m-b-0 cs-color-gray">{{ $t('下级成员') }}：{{ item.childNum || 0 }} {{
                                $t('人')
                            }}</p>
                        </div>
                    </li>
                </ul>
                <CoreshopNoData v-else :text="$t('暂无邀请列表')" />
                <p class="no-more" v-if="teamData.list.length > 0 && !teamData.haveData">{{$t('没有更多了')}}</p>

            </div>
        </div>
        <CoreshopLoading v-if="teamData.isLoading" />

    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { queryMyInvite, queryDistributionTeamSum, queryRecommendUserList } from '@/composables/distribution';
import { Result } from "@/model/result";
import { IteamSum } from '@/model/member';
import { RecommendUser } from '@/model/member';

definePageMeta({
    layout: false,
})

const teamData: UnwrapRef<{
    referrerInfo: any;
    userInfo: any;
    list: Array<any>;
    page: number;
    limit: number;
    totalPages: number;
    haveData: boolean;
    isLoading: boolean;
}> = reactive({
    referrerInfo: {},
    userInfo: {},
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    haveData: true,
    isLoading: false,
})

// 获取推荐人
const getMyInvite: Result<any> = await queryMyInvite();
if (getMyInvite.data) {
    teamData.referrerInfo = getMyInvite.data;
}

// 获取团队业绩信息
const getDistributionTeamSum: Result<IteamSum> = await queryDistributionTeamSum();
teamData.userInfo = getDistributionTeamSum.data;

// 获取用户推荐列表
const query = async () => {
    teamData.isLoading = true;

    const getRecommendUserList: Result<Array<RecommendUser>> = await queryRecommendUserList({
        page: teamData.page,
        limit: teamData.limit,
    });
    teamData.totalPages = getRecommendUserList.otherData.totalPages;

    if (getRecommendUserList.data.length > 0) {
        teamData.list = teamData.list.concat(getRecommendUserList.data || []);
    } else {
        teamData.haveData = false;
    }
    teamData.isLoading = false;

}
query();

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && teamData.haveData) {
            teamData.page++;
            query();
        }
    }, 500))
})
</script>

<style lang='scss' scoped>
.team-box {
    padding: 0.5rem 0.3rem;
    background: #FFFFFF;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin: 10px;
    >p:nth-of-type(1){
        font-weight: 600;
        color: #292B2E;
    }
}

.distribution-box {
    position: relative;
    width: 9.4rem;
    padding: 0.5rem 0.3rem;
    background-color: #E74436;
}

.detail-panner{
    height: 67px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    >div{
        flex: 1;
        text-align: center;
    }
}
</style>