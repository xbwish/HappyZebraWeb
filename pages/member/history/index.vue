<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('我的足迹')"></CoreshopTitle>
            <div class="history-goods-box" id="goods-box">
                <ul v-if= "historyData.list.length > 0 ">
                    <li v-for="item in historyData.list" :key="item.id">
                        <nuxt-link :to="`/goods/detail/${item.goodsId}`">
                            <div>
                                <img :src="item.goodImage" alt="">
                            </div>
                            <div>
                                <p class="title">{{ item.goodsName }}</p>
                                <p class="time">
                                    <Icon name="underway-o" size="15" />
                                    <span>{{ item.createTime }}</span>
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
                <CoreshopNoData v-else :text="$t('暂无浏览记录')" />
                <p class="no-more" v-if="historyData.list.length > 0 && !historyData.haveData">{{$t('没有更多了')}}</p>
            </div>
            <CoreshopLoading v-if="historyData.isLoading" />
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef, onMounted } from 'vue';
import { Result } from "@/model";
import { queryGoodsBrowsing } from '@/composables/member';
import { GoodsBrowsing, GoodsBrowsingDetail } from '@/model/member';
import { Icon } from 'vant';

definePageMeta({
    layout: false,
})

const historyData: UnwrapRef<{
    list: Array<GoodsBrowsingDetail>;
    limit: number;  // 一页数据的个数
    page: number;  // 页数
    pageCount: number;
    haveData:boolean;
    isLoading: boolean;
}> = reactive({
    list: [],
    limit: 20,
    page: 1,
    pageCount: 0,
    haveData:true,
    isLoading:false,
})

const query = async () => {
    historyData.isLoading = true;

    const goodsBrowsing: Result<GoodsBrowsing> = await queryGoodsBrowsing({
        "limit": historyData.limit,
        "page": historyData.page,
    });
    historyData.pageCount = Math.ceil(goodsBrowsing.data.count / historyData.limit);

    if (goodsBrowsing.data?.list.length > 0) {
        historyData.list = historyData.list.concat(goodsBrowsing.data?.list || []);
    } else {
        historyData.haveData = false;
    }

    historyData.isLoading = false;
}
query();

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && historyData.haveData) {
            historyData.page++;
            query();
        }
    }, 500))
})

</script>
<style scoped lang="scss"> 
@import "./index.scss";
</style>