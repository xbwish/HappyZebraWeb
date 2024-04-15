<template>
    <NuxtLayout name="coreshop-shop-header-back">
        <section>
            <CoreshopTitle :title="$t('限时秒杀')"></CoreshopTitle>
            <ul class="tab-list">
                <li v-for="item in seckillData.tabList" :class="{ 'on': seckillData.status == item.status }" :key="item.id"
                    @click="handleLink(item.status)">{{ $t(item.title) }}</li>
            </ul>
            <section id="seckillBox">
                <div v-if="seckillData.list.length > 0">
                    <ul class="seckill-box">
                        <li v-for="item in seckillData.list" :key="item.id" class="cs-p-t-20 cs-p-b-20 ">
                            <div class="cs-display-flex cs-justify-content-space-between">
                                <div class="cs-percent-w-30">
                                    <CoreshopImage class="cs-w-100 cs-h-100 cs-border-radius-6" :src="item.goodThumbnail"
                                        root="#groupBuyingBox">
                                    </CoreshopImage>
                                </div>
                                <div
                                    class="cs-percent-w-66 cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
                                    <p class="cs-percent-w-60 cs-font-size-16 cs-line-height-25 title">{{ item.name }}
                                    </p>
                                    <p class="cs-font-size-13 cs-color-gray desc">{{ item.goodName }}</p>
                                    <div v-if="item.timestamp" class="cs-color-red">
                                        <div class="cs-font-size-14" v-if="item.timestamp && item.startStatus == 1">
                                            <CoreshopLanguage :text="$t('仅剩')" />：
                                            <NCountdown :render="renderCountdown" :duration="item.timestamp * 1000"
                                                :active="true" />
                                        </div>
                                        <div class="cs-font-size-14" v-if="item.timestamp && item.startStatus == 0">
                                            <CoreshopLanguage :text="$t('即将开始')" />：
                                            <NCountdown :render="renderCountdown" :duration="item.timestamp * 1000"
                                                :active="true" />
                                        </div>
                                    </div>
                                    <div>
                                        <span class="cs-font-size-16 cs-color-red">NT${{ item.price }}</span>
                                        <span
                                            class="cs-font-size-12 cs-m-l-10 cs-color-gray cs-text-decoration-line-through">NT${{
                                                item.mktPrice
                                            }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="cs-display-flex cs-justify-content-space-between cs-align-items-center cs-m-t-10">
                                <div>
                                    <Tag
                                        class="cs-m-r-10 cs-font-size-12"
                                        color="#f37b1d"
                                        v-if="item.maxNums > 0">
                                        <CoreshopLanguage :text="$t('限购')" />{{ item.maxNums }}{{ item.goodUnit }}
                                    </Tag>
                                    <Tag
                                        type="success"
                                        class="cs-m-r-10 cs-font-size-12"
                                        v-if="item.maxNums == 0">
                                        <CoreshopLanguage :text="$t('不限购')" />
                                    </Tag>
                                    <Tag
                                        type="warning"
                                        class="cs-m-r-10 cs-font-size-12"
                                        v-if="item.maxGoodsNums > 0">
                                        <CoreshopLanguage :text="$t('总量')" />{{ item.maxGoodsNums }}{{
                                            item.goodUnit
                                        }}
                                    </Tag>
                                    <Tag
                                       type="primary"
                                        class="cs-m-r-10 cs-font-size-12"
                                        v-if="item.maxGoodsNums == 0">
                                        <CoreshopLanguage :text="$t('不限总量')" />
                                    </Tag>
                                    <Tag
                                        class="cs-m-r-10 cs-font-size-12">{{
                                            item.goodViewCount
                                        }}
                                        <CoreshopLanguage :text="$t('不限总量')" />
                                    </Tag>
                                </div>
                                <div class="cs-display-flex cs-justify-content-space-between cs-align-items-center">

                                    <CoreshopButton v-if="item.startStatus == 1" class="cs-w-100" size="small"
                                        @on-click="handleGoGoodDetail(item)">
                                        <CoreshopLanguage :text="$t('马上秒')" />
                                    </CoreshopButton>
                                    <CoreshopButton v-if="item.startStatus == 0" class="cs-w-100" size="small" bg-color="#404040">
                                        <CoreshopLanguage :text="$t('即将开始')" />
                                    </CoreshopButton>
                                    <CoreshopButton v-if="item.startStatus == 2" class="cs-w-100" size="small" bg-color="#404040">
                                        <CoreshopLanguage :text="$t('已结束')" />
                                    </CoreshopButton>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
               <div class="empty-data" v-else>
                <CoreshopNoData></CoreshopNoData>
               </div>
                <p class="no-more" v-if="seckillData.list.length > 0 && !seckillData.haveData">{{$t('没有更多了')}}</p>
            </section>
            <CoreshopLoading v-if="seckillData.isLoading" />
        </section>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { NCountdown, CountdownProps } from "naive-ui";
import { querySeckillGroup } from '@/composables/member';
import { Result } from "@/model/result";
import { GroupList } from '@/model/activity';
import { OrderTypeEnum } from '@/enum';
import { usePageConfig } from '@/store';
import { Tag } from 'vant';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({  layout: false});

interface ItabList {
    id: string;
    title: string;
    status: number;
}

const seckillData: UnwrapRef<{
    tabList: Array<ItabList>;
    status: number;
    tabId: string;
    list: Array<any>;
    page: number;
    limit: number;
    totalPages: number;
    haveData: boolean;
    isLoading: boolean;

}> = reactive({
    status: 1,
    tabId: 'ing',
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    tabList: [
        {
            id: 'ing',
            title: coreShopLang('进行中'),
            status: 1

        },
        {
            id: 'nostart',
            title: coreShopLang('即将开始'),
            status: 0
        },
        {
            id: 'ended',
            title: coreShopLang('已结束'),
            status: 2
        },
    ],
    haveData: true,
    isLoading: false,

});
 
usePageConfig().set_back_style({'top': '55px'});

const querySeckill = async () => {
    seckillData.isLoading = true;

    const _params: any = {
        page: seckillData.page,
        limit: seckillData.limit,
        type: OrderTypeEnum.seckill, //秒杀
        status: seckillData.status
    };
    const getGroup: Result<GroupList> = await querySeckillGroup(_params);
    seckillData.totalPages = getGroup.data.totalPages;
    if (getGroup.data?.list.length > 0) {
        seckillData.list = seckillData.list.concat(getGroup.data?.list || []);
    } else {
        seckillData.haveData = false;
    }
    seckillData.isLoading = false;

}
querySeckill();

const handleLink = (status: number) => {
    seckillData.tabId = seckillData.tabList.filter(item => item.status === status)[0].id;
    seckillData.status = status;
    seckillData.list = [];
    seckillData.page = 1;
    seckillData.haveData = true;
    seckillData.isLoading = false;

    querySeckill();
}

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && seckillData.haveData) {
            seckillData.page++;
            querySeckill();
        }
    }, 500))
})

// 倒计时
const renderCountdown: CountdownProps["render"] = ({ hours, minutes, seconds }) => {
    const day: string = hours / 24 > 1 ? `${String(Math.floor(hours / 24))}  ${coreShopLang('天')}  ${String(hours % 24).padStart(2, "0")}  ${coreShopLang('时')}` : `${String(hours).padStart(2, "0")}  ${coreShopLang('时')}`;
    return ` ${day} ${String(minutes).padStart(2, "0")}  ${coreShopLang('分')} ${String(seconds).padStart(2, "0")}  ${coreShopLang('秒')}`;
};

const handleGoGoodDetail = (item: any) => {
    return navigateTo(`/activity/seckill/detail?id=${item.id}`);
}

</script>

<style lang='scss' scoped>
.tab-list {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 15px #dcdcdc;
    z-index: 999;
    li {
        position: relative;
        font-size: 0.37rem;
        width: 33.33%;
        text-align: center;
        padding: 0.3rem 0;
    }

    li.on {
        background-color: #f56c6c;
        color: #fff;
        &:after{
            position: absolute;
            bottom: -0.15rem;
            left: 50%;
            transform: translateX(-50%);
            content: "";
            width: 0;
            height: 0;
            border-top: 0.2rem solid #f56c6c;
            border-right: 0.2rem solid transparent;
            border-left: 0.2rem solid transparent;
        }
    }
}

:deep(.coreshop-pane-class) {
    .n-tabs-nav {
        .n-tabs-tab-wrapper {
            .n-tabs-tab--active {
                color: #f56c6c;
                font-weight: bold;
            }

            .n-tabs-tab {
                font-size: 16px;
                width: 120px;
                display: flex;
                text-align: center;

                span {
                    margin: auto;
                }

                &:hover {
                    color: #dc2828;
                }
            }
        }

        .n-tabs-bar {
            background-color: #dc2828;
        }
    }
}

.seckill-box {
    margin-top: 1.5rem;
    li {
        padding: 0.3rem;
        background: #FFFFFF;
        box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
        border-radius: 8px;
        margin: 10px;
        .title,
            .desc {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
    }

}
.cs-border-radius-6{
    border-radius: 6px !important;
}
.empty-data{
    margin-top: 40px;
}
</style>