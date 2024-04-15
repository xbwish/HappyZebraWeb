<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle title="订单查询"></CoreshopTitle>
        <div class="search-box">
            <n-input round :placeholder="$t('请输订单号收货人手机号收货人姓名')" v-model:value="searchState.value">
                <template #prefix>
                    <n-icon :component="CoreshopIconSearch" />
                </template>
            </n-input>
            <div class="title" @click="handleSearch">{{$t('搜索')}}</div>
        </div>
        <div class="merchant-list" v-if="searchState.list.length > 0">
            <ul>
                <template v-for="item in searchState.list" :key="item.orderId">
                    <li v-if="item.items&&item.items.length > 0">
                        <div class="number">
                            <p>{{$t('编号')}}：{{ item.orderId }} </p>
                            <p class="cs-color-yellow">{{ item.shipStatusText }}</p>
                            <NTag type="primary" v-if="item.receiptType==1">{{$t('物流快递')}}</NTag>
                            <NTag type="success" v-if="item.receiptType==2">{{$t('同城配送')}}</NTag>
                            <NTag type="warning" v-if="item.receiptType==3">{{$t('门店自提')}}</NTag>
                        </div>
                        <div class="goods" v-for="itemChild in item.items" :key="itemChild.id">
                            <div>
                                <img :src="itemChild.imageUrl" alt="">
                            </div>
                            <div class="cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
                                <p class="name">{{ itemChild.name || '' }}</p>
                                <p class="num">{{$t('数量')}} : {{ itemChild.nums || 0 }} <span>{{ itemChild.addon ? itemChild.addon : ''
                                        }}</span></p>
                                <p class="price cs-color-red">NT${{ itemChild.amount || 0 }}</p>
                            </div>
                        </div>
                        <div class="date">
                            <p>{{ timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')}}</p>
                            <p>{{ item.shipName }}【{{ item.shipMobile }}】</p>
                        </div>
                        <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-14">
                            <div>
                                <NTag type="primary" v-if="item.status ==1">{{$t('订单正常')}}</NTag>
                                <NTag type="success" v-if="item.status ==2">{{$t('订单完成')}}</NTag>
                                <NTag type="warning" v-if="item.status ==3">{{$t('订单取消')}}</NTag>
                            </div>
                            <div>
                                <span>{{ item.payStatusText }}</span>
                                <span v-if="item.paymentCodeText">【{{ item.paymentCodeText}}】</span>
                            </div>
                            <div>
                                {{$t('实付款')}}：<span class="cs-color-red cs-font-size-16">NT${{ item.payedAmount }}</span>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
        <CoreshopNoData v-if="searchState.list.length === 0" :text="$t('暂无订单')"></CoreshopNoData>
        <p class="no-more" v-if="searchState.list.length > 0 && !searchState.haveData">{{$t('没有更多了')}}</p>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from 'vue';
import { Result } from "@/model/result";
import { getOrderPageByMerchantSearch } from '@/composables/merchant';
import { NTag ,NInput,NIcon} from "naive-ui";
import CoreshopIconSearch from "@/components/coreshop-icon/search.vue";
import { showToast   } from 'vant';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    layout: false,
})
const searchState: UnwrapRef<{
    list: Array<any>;
    haveData: boolean;
    isLoading: boolean;
    page: number;
    limit: number;
    value:string;
}> = reactive({
    list: [],
    haveData: true,
    isLoading: false,
    page: 1,
    limit: 10,
    value: String(useRoute().query.keyword),
});

const query = async () => {
    searchState.isLoading = true;

    const getOrderList: Result<any> = await getOrderPageByMerchantSearch({
        keyword: searchState.value,
        page: searchState.page,
        limit: searchState.limit,
    });

    if (getOrderList.data?.pages.length > 0) {
        searchState.list = searchState.list.concat(getOrderList.data?.pages || []);
    } else {
        searchState.haveData = false;
    }

    searchState.isLoading = false;

}
query();

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && searchState.haveData) {
            searchState.page++;
            query();
        }
    }, 500))
})

const handleSearch = () => {
    if (searchState.value == '') {
        showToast(coreShopLang('请输订单号收货人手机号收货人姓名'));
        return;
    }
    searchState.list = [];
    searchState.isLoading = false;
    searchState.haveData = true;
    searchState.page = 1;
    query();
}
</script>

<style scoped lang="scss">
.search-box {
    display: flex;
    align-items: center;
    padding: 0.3rem;
    background-color: #fff;
    margin-bottom: 0.2rem;
    .title {
        width: 1.5rem;
        text-align: center;
        font-size: 0.35rem;
    }
}
.merchant-list {

    li {
        padding: 0.3rem;
        background-color: #fff;
        margin-bottom: 0.3rem;

        .number {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.35rem;
        }

        .goods {
            display: flex;
            justify-content: space-between;
            padding: 0.2rem 0;

            div:nth-of-type(1) {
                img {
                    width: 2rem;
                    border-radius: 5px;
                }
            }

            div:nth-of-type(2) {
                width: 7.2rem;

                .name {
                    font-size: 0.35rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                .num {
                    font-size: 0.3rem;
                    color: #909399;

                    span {
                        margin-left: 0.1rem;
                    }
                }

                .price {
                    font-size: 0.4rem;
                }

            }
        }

        .date {
            font-size: 0.35rem;
            padding: 0.2rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>