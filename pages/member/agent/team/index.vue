<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('我的推广')"></CoreshopTitle>
        <div>
            <div class="agent-box">
                <!-- 推荐人 -->
                <p v-if="teamData.referrerInfo && teamData.referrerInfo.avatarImage"
                    class="cs-display-flex cs-font-size-14 cs-align-items-center cs-color-white">{{ $t('推荐人')}}：
                    <img calss="cs-w-20 cs-m-r-5" :src="teamData.referrerInfo.avatarImage" alt="">
                    {{ teamData.referrerInfo.nickName }}
                </p>
                <p v-else class="cs-font-size-14 cs-color-white">{{ $t('推荐人')}}{{ $t('无')}}</p>

                <!-- 团队数据总览 -->
                <div class="cs-m-t-10 cs-display-flex cs-align-items-center cs-justify-content-space-between">
                    <div class="cs-percent-w-43 cs-border-solid cs-border-radius-10 cs-p-10 cs-background-color-white">
                        <div >
                            <p class="cs-font-size-12 cs-color-gray">{{ $t('团队总人数')}} ({{ $t('人')}})</p>
                            <p class="cs-font-size-16">{{teamData.userInfo.count || 0}}</p>
                        </div>
                        <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between">
                            <div>
                                <p class="cs-font-size-12 cs-color-gray">{{ $t('总人数')}}</p>
                                <p class="cs-font-size-16">{{ teamData.userInfo.first || 0 }}</p>
                            </div>
                            <div>
                                <p class="cs-font-size-12 cs-color-gray">{{ $t('总订单')}}</p>
                                <p class="cs-font-size-16">{{ teamData.userInfo.second || 0 }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="cs-percent-w-43 cs-border-solid cs-border-radius-10 cs-p-10 cs-background-color-white">
                        <div >
                            <p class="cs-font-size-12 cs-color-gray">{{ $t('本月推广人数')}} ({{ $t('人')}})</p>
                            <p class="cs-font-size-16">{{teamData.userInfo.monthCount || 0}}</p>
                        </div>
                        <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between">
                            <div>
                                <p class="cs-font-size-12 cs-color-gray">{{ $t('人数')}}</p>
                                <p class="cs-font-size-16">{{ teamData.userInfo.monthFirst || 0 }}</p>
                            </div>
                            <div>
                                <p class="cs-font-size-12 cs-color-gray">{{ $t('订单')}}</p>
                                <p class="cs-font-size-16">{{ teamData.userInfo.monthSecond || 0 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 推广列表 -->
            <div class="team-box">
                <p class="cs-font-size-14 cs-p-b-10">{{ $t('推广列表')}}</p>
                <ul class="cs-border-radius-10"  v-if="teamData.list.length > 0">
                    <li v-for="item in teamData.list" :key="item.nickName"
                        class="cs-display-flex cs-border-solid-bottom  cs-p-t-10 cs-align-items-center cs-justify-content-space-between">
                        <div class="cs-display-flex cs-align-items-center">
                            <div>
                                <img class="cs-w-35 cs-h-35 cs-percent-border-radius-50" :src="item.avatarImage" alt="">
                            </div>
                            <div class="cs-m-l-10">
                                <p class="cs-font-size-16 cs-m-b-0">{{item.nickName}}</p>
                                <p class="cs-font-size-12 cs-color-gray cs-m-b-0">{{timeFormat(item.createTime, 'yyyy年mm月dd日') }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p class="cs-font-size-14 cs-m-b-0">{{item.mobile}}</p>
                            <p class="cs-font-size-12 cs-m-b-0">{{ $t('下级成员')}}：{{ item.childNum || 0 }} {{ $t('人')}}</p>
                        </div>
                    </li>
                </ul>
                <CoreshopNoData v-else :text="$t('暂无推广记录')" />
                <p class="no-more" v-if="teamData.list.length > 0 && !teamData.haveData">{{$t('没有更多了')}}</p>

            </div>
            <CoreshopLoading v-if="teamData.isLoading" />

        </div>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { queryMyInvite, queryAgentTeamSum, queryRecommendUserList } from '@/composables/agent';
import { Result } from "@/model/result";
import { RecommendUser,AgentTeamSum } from '@/model/member';

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
const getAgentTeamSum: Result<AgentTeamSum> = await queryAgentTeamSum();
teamData.userInfo = getAgentTeamSum.data;

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
}

.agent-box {
    position: relative;
    width: 9.4rem;
    padding: 0.5rem 0.3rem;
    background-color: #f56c6c;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAABS39xVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEQ0EzRDkzRTFDNDExRThBMjQ1OEZFQ0NGQ0U5NkUyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEQ0EzRDk0RTFDNDExRThBMjQ1OEZFQ0NGQ0U5NkUyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NURDQTNEOTFFMUM0MTFFOEEyNDU4RkVDQ0ZDRTk2RTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NURDQTNEOTJFMUM0MTFFOEEyNDU4RkVDQ0ZDRTk2RTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ahpMuAAAaTklEQVR42uyd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);
    background-size: cover;
    background-position: center;
}
</style>