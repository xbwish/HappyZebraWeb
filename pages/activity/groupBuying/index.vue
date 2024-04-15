<template>
    <NuxtLayout name="personal-center">
        <section>
            <CoreshopTitle :title="$t('团购')"></CoreshopTitle>
            <div class="block" id="groupBuyingBox">
                <div v-if="groupBuyingData.list.length > 0">
                    <ul class="groupBuying-box">
                        <li v-for="item in groupBuyingData.list" :key="item.id" >
                            <div class="cs-display-flex cs-justify-content-space-between">
                                <div class="cs-percent-w-30">
                                    <CoreshopImage class="cs-w-100 cs-h-100" :src="item.goodThumbnail" root="#groupBuyingBox">
                                    </CoreshopImage>
                                </div>
                                <div class="cs-percent-w-68 cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
                                    <p class="cs-percent-w-60 cs-font-size-16 cs-line-height-25 title">{{ item.name }}
                                    </p>
                                    <p class="cs-font-size-13 cs-color-gray desc">{{ item.goodName }}</p>
                                    <div v-if="item.timestamp" class="cs-color-red">
                                        <div class="cs-font-size-14" v-if="item.timestamp && item.startStatus == 1">
                                            <CoreshopLanguage :text="$t('仅剩')" />：
                                            <NCountdown :render="renderCountdown" :duration="item.timestamp * 1000" :active="true" />
                                        </div>
                                        <div class="cs-font-size-14" v-if="item.timestamp && item.startStatus == 0">
                                            <CoreshopLanguage :text="$t('即将开始')" />：
                                            <NCountdown :render="renderCountdown" :duration="item.timestamp * 1000" :active="true" />
                                        </div>
                                    </div>
                                    <div>
                                        <span class="cs-font-size-16 cs-color-red">NT${{ item.price }}</span>
                                        <span class="cs-font-size-12 cs-m-l-10 cs-color-gray cs-text-decoration-line-through">
                                            NT${{
                                            item.mktPrice
                                            }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="cs-display-flex cs-justify-content-space-between cs-align-items-center cs-m-t-10">
                                    <div>
                                        <Tag
                                            class="cs-m-r-10 cs-font-size-12"
                                            color="#D33123"
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
                                            color="#FF912B"
                                            type="primary"
                                            class="cs-m-r-10 cs-font-size-12"
                                            v-if="item.maxGoodsNums == 0">
                                            <CoreshopLanguage :text="$t('不限总量')" />
                                        </Tag>
                                        <Tag
                                            color="#8298BA"
                                            class="cs-m-r-10 cs-font-size-12">{{
                                                item.goodViewCount
                                            }}
                                            <CoreshopLanguage :text="$t('人浏览')" />
                                        </Tag>
                                    </div>
                                    <div class="cs-display-flex cs-justify-content-space-between cs-align-items-center">

                                        <CoreshopButton v-if="item.startStatus == 1" class="cs-w-100 pintuan-btn" :size="btnSize.small"
                                            @on-click="handleGoGoodDetail(item)">
                                            <CoreshopLanguage :text="$t('立即团购')" />
                                        </CoreshopButton>
                                        <CoreshopButton v-if="item.startStatus == 0" class="cs-w-100" :size="btnSize.small" bg-color="#404040">
                                            <CoreshopLanguage :text="$t('即将开始')" />
                                        </CoreshopButton>
                                        <CoreshopButton v-if="item.startStatus == 2" class="cs-w-100" :size="btnSize.small" bg-color="#404040">
                                            <CoreshopLanguage :text="$t('已结束')" />
                                        </CoreshopButton>
                                    </div>
                                </div>
                        </li>
                    </ul>
                </div>
                <CoreshopNoData v-else></CoreshopNoData>
                <p class="no-more" v-if="groupBuyingData.list.length > 0 && !groupBuyingData.haveData">{{$t('没有更多了')}}</p>

            </div>
            <CoreshopLoading v-if="groupBuyingData.isLoading" />

        </section>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { CountdownProps, NCountdown } from "naive-ui";
import { querySeckillGroup } from '@/composables/member';
import { Result } from "@/model/result";
import { OrderTypeEnum,btnSize } from "@/enum";
import { GroupList, GroupDetailList } from '@/model/activity';
import { Tag }  from 'vant';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    layout: false,
});

const groupBuyingData: UnwrapRef<{
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
    haveData: true,
    isLoading: false,

});

const queryGroupBuying = async () => {
    groupBuyingData.isLoading = true;

    const _params: any = {
        page: groupBuyingData.page,
        limit: groupBuyingData.limit,
        type: OrderTypeEnum.group,
        status: groupBuyingData.status
    };
    const getGroup: Result<GroupList> = await querySeckillGroup(_params);
    groupBuyingData.totalPages = getGroup.data?.totalPages || 0;
    if (getGroup.data?.list.length > 0) {
        groupBuyingData.list = groupBuyingData.list.concat(getGroup.data?.list || []);
    } else {
        groupBuyingData.haveData = false;
    }
    groupBuyingData.isLoading = false;

}
queryGroupBuying();

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && groupBuyingData.haveData) {
            groupBuyingData.page++;
            queryGroupBuying();
        }
    }, 500))
})

// 倒计时
const renderCountdown: CountdownProps["render"] = ({ hours, minutes, seconds }) => {
    const day: string = hours / 24 > 1 ? `${String(Math.floor(hours / 24))} ${coreShopLang('天')}  ${String(hours % 24).padStart(2, "0")} ${coreShopLang('时')}` : `${String(hours).padStart(2, "0")} ${coreShopLang('时')}`;
    return ` ${day} ${String(minutes).padStart(2, "0")} ${coreShopLang('分')} ${String(seconds).padStart(2, "0")} ${coreShopLang('秒')}`;
};

// 去商品详情页
const handleGoGoodDetail = (item: GroupDetailList) => {
    return navigateTo(`/activity/groupBuying/detail?id=${item.id}`);
}


</script>

<style lang='scss' scoped>
:deep(.coreshop-pane-class) {
    .n-tabs-nav {
        .n-tabs-tab-wrapper {
            .n-tabs-tab--active {
                color: #dc2828;
            }

            .n-tabs-tab {
                font-size: 18px;
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

.groupBuying-box {
    li {
            padding: 0.3rem;
            margin-bottom: 0.3rem;
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
.pintuan-btn{
    width: 1.9rem;
    height: 0.7rem;
    border-radius: 0.85rem;
    background: linear-gradient(270deg, #D33123 -5.82%, #F27063 100%);
}
.cs-color-red{
    color: #D33123;
    font-weight: 600;
}
</style>
