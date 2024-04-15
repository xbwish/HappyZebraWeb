<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('提货单列表')"></CoreshopTitle>
        <div class="merchant-list" v-if="orderState.list.length > 0">
            <ul>
                <template v-for="item in orderState.list" :key="item.id">
                    <li>
                        <div class="number">
                            <p class="cs-font-weight-bold cs-display-flex cs-align-items-center">
                                <NIcon class="cs-m-b-1 cs-m-r-5" :size="20" color="#000">
                                    <CoreshopIconCalendarWeekNumbers24Regular />
                                </NIcon>
                                {{$t('编号')}}：{{ item.ticket.serviceOrderId }}
                                <span class="copy" @click="handleCopy(item.ticket.redeemCode)">{{$t('复制核销码')}}</span>
                            </p>
                        </div>
                        <div class="goods" >
                            <div>
                                <img :src="item.service.thumbnail" alt="">
                            </div>
                            <div class="cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
                                <p class="name">{{item.service.title}}</p>
                                <p class="desc">{{item.service.description}}</p>
                                <p class="order-num">{{$t('核销时间')}}：{{item.ticket.verificationTime}}</p>
                                <p class="order-num">{{$t('核销码')}}：{{item.ticket.redeemCode}}</p>
                            </div>
                        </div>
                        <div class="date">
                            <p>{{$t('下单时间')}}：{{ timeFormat(item.ticket.createTime, 'mm-dd hh:MM:ss') }}</p>
                            <CoreshopButton size="small" bg-color="red" @on-click="handleDeleteOrder(item.id)">{{$t('删除')}}</CoreshopButton>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
        <CoreshopNoData v-if="orderState.list.length === 0" :text="$t('暂无订单')"></CoreshopNoData>
        <p class="no-more" v-if="orderState.list.length > 0 && !orderState.haveData">{{$t('没有更多了')}}</p>

        <CoreshopLoading v-if="orderState.isLoading" />

        <CoreshopModal :showModal="orderState.showModal" :content="$t('删除核验单后将无法找回')" @handleModalCancel="handleCancel"
            @handleModalOk="handleConfirm">
        </CoreshopModal>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from 'vue';
import { NIcon } from "naive-ui";
import { getverificationPageList, serviceLogDelete } from '@/composables/merchant';
import { Result } from "@/model/result";
import { showToast,showSuccessToast  } from 'vant';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    layout: false,
});

const orderState: UnwrapRef<{
    list: Array<any>;
    haveData: boolean;
    isLoading: boolean;
    page: number;
    limit: number;
    showModal: boolean;
    orderId: string;
}> = reactive({
    list: [],
    haveData: true,
    isLoading: false,
    page: 1,
    limit: 10,
    showModal: false,
    orderId: "",
})

const query = async () => {
    orderState.isLoading = true;

    const getOrderList: Result<any> = await getverificationPageList({
        page: orderState.page,
        limit: orderState.limit,
    });
    console.log(getOrderList)
    if (getOrderList.data.length > 0) {
        orderState.list = orderState.list.concat(getOrderList.data || []);
    } else {
        orderState.haveData = false;
    }

    orderState.isLoading = false;

}
query();

onMounted(() => {
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && orderState.haveData) {
            orderState.page++;
            query();
        }
    }, 500))
})

// 复制
const handleCopy = async (id: string) => {
    const aux = document.createElement("input");
    aux.setAttribute("value", id);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    showToast(coreShopLang('复制成功'));
}

// 删除
const handleDeleteOrder = async (id: string) => {
    orderState.showModal = true;
    orderState.orderId = id;
}
const handleCancel = () => {
    orderState.showModal = false;
}
const handleConfirm = async () => {
    const ladingState: Result<any> = await serviceLogDelete({
        id: orderState.orderId,
    });

    orderState.showModal = false;
    if (ladingState.status) {
        showSuccessToast(ladingState.msg);
        orderState.list = [];
        orderState.page = 1;
        query();
    } else {
        showToast(ladingState.msg);
    }
}

</script>

<style scoped lang="scss">
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

            .copy {
                margin-left: 0.3rem;
                font-size: 0.3rem;
                color: #fff;
                background-color: #5ac725;
                padding: 0.12rem 0.25rem;
                border-radius: 3px;
                line-height: 1;
                align-self: baseline;
            }
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

                .desc {
                    font-size: 0.3rem;
                    overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    color: #909399;
                }

                .num {
                    font-size: 0.3rem;
                    color: #909399;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;

                    span {
                        margin-left: 0.1rem;
                    }
                }

                .price {
                    font-size: 0.35rem;

                    span {
                        color: #909399;
                        font-size: 0.3rem;
                    }
                }

                .order-num {
                    font-size: 0.3rem;
                    color: #fbbd08;
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