<template>
        <coreshop-title :title="$t('个人中心')"> </coreshop-title>
        <PullRefresh v-model="userData.pullRefresh" @refresh="onPullRefresh()" class="layot-member">
            <div class="personal-smg" id="personal-smg">
            <div class="header">
                <div>
                    <CoreshopImage radius="50%" class="img cs-w-65 cs-h-65" :disabled="false" root="#personal-smg"
                        :src="userData.userInfo.avatarImage || '/images/heard.png'" />
                    <div class="login" v-if="!accountStore.getToken" @click="onRedirectLogin()">
                        <CoreshopLanguage :text="$t('立即登录')" /> 
                    </div>
                </div>
                <div v-if="accountStore.getToken" class="header-info">
                    <div class="info-text">
                        <p class="name">
                            <nuxt-link to="/member/setting/userInfo" class="cs-display-flex cs-align-items-center cs-justify-content-space-between">
                                <span class="cs-color-white" style="font-weight: bold;">{{ userData.userInfo.nickName }}</span>
                            </nuxt-link>
                        </p>
                        <section>
                            <!-- <nuxt-link class="link" v-if="userData.userInfo.gradeName">
                                <CoreshopLanguage :text="$t('用户级别')" />：<span>{{ userData.userInfo.gradeName }}</span>
                            </nuxt-link> -->
                            <nuxt-link to="/member/balance/withdrawCash" class="link cs-cursor-pointer">
                                <CoreshopLanguage :text="$t('我的余额')" />：<span>NT${{ userData.balance }}</span>
                            </nuxt-link>
                            <!-- <nuxt-link to="/member/integral" class="link cs-cursor-pointer">
                                <CoreshopLanguage :text="$t('我的金豆')" />：<span>{{
                                    userData.point
                                }}</span>
                            </nuxt-link> -->
                        </section>
                    </div>
                  
                    <div class="right-icon">
                        <nuxt-link to="/member/setting/userInfo" class="cs-display-flex cs-align-items-center cs-justify-content-space-between">
                            <NIcon color="#ffffff" :size="25">
                                <CoreshopIconChevronRight28RegularNew />
                            </NIcon>
                        </nuxt-link>
                    </div>
                  
                
                </div> 
            </div>
            <!-- <div class="personal-count">
                <ul>
                    <li>
                        <nuxt-link class="link" to="/member/history">
                            <div>
                                <p>{{ userData.userInfo.footPrintCount || 0}}</p>
                                <p>
                                    <CoreshopLanguage :text="$t('足迹')" />
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="link" to="/member/myCoupon">
                            <div>
                                <p>{{ userData.userInfo.userCouponCount || 0}}</p>
                                <p>
                                    <CoreshopLanguage :text="$t('优惠券')" />
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="link" to="/member/collection">
                            <div>
                                <p>{{ userData.userInfo.collectionCount || 0}}</p>
                                <p>
                                    <CoreshopLanguage :text="$t('收藏')" />
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="link" to="/member/afterSales">
                            <div>
                                <p>{{ userData.orderSum?.isAfterSale || 0}}</p>
                                <p>
                                    <CoreshopLanguage :text="$t('售后')" />
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div> -->
            <div class="my-huiyuan box-shadow">
                <img src="/images/huiyuan-level.png"   style="width: 52px;height: 22px;top: 157px;left: 25px" alt=""/>
                <div class="line"></div>
                <nuxt-link to="/member/integral" class="link cs-cursor-pointer">
                    <CoreshopLanguage :text="$t('我的金豆')" />：<span>{{
                        userData.point
                    }}</span>
                </nuxt-link>
                <nuxt-link to="/member/integral" class="link cs-cursor-pointer">
                    <div class="see-detail">
                        <span>{{ $t('查看详情') }}</span>
                        <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0.833313L5 4.49998L1 8.16665" stroke="#292B2E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <!-- 我的订单 -->
        <div class="personal-order box-shadow">
            <nuxt-link to="/member/order" class="title">
                <CoreshopLanguage :text="$t('我的订单')" />
            </nuxt-link>
            <ul>
                <li v-for="item, index in userData.order" :key="index">
                    <nuxt-link :to="{ path: '/member/order', query: { 'status': index } }">
                        <!-- <p>{{ userData.orderSum ? userData.orderSum[index] : '-'}}</p> -->
                        <van-badge :content="userData.orderSum ? userData.orderSum[index]: 0" :show-zero="false" color="#D33123">
                            <img :src="`/images/goodsStatus${index+1}.png`" width="46">
                        </van-badge>
                        <p>{{ $t(item) }}</p>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <!-- 天天有钱 -->
        <div class="invite-friends box-shadow" v-if="config.showInviter == 1">
            <p class="title">{{ $t('天天有钱')  }} </p>
            <ul>
                <li>
                    <nuxt-link to="/member/invite">
                        <div>
                            <img src="/images/coupon-element1.png" alt="">
                        </div>
                        <div>
                            <p>{{ $t('边逛边赚钱')  }}</p>
                            <p>{{ $t('最高提现')  }}20元</p>
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/member/invite">
                        <div>
                            <img src="/images/coupon-element2.png" alt="">
                        </div>
                        <div>
                            <p>{{ $t('邀请好友')  }}</p>
                            <p>{{ $t('最高分红')  }}5000</p>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <!-- 我的服务 -->
        <div class="service-box box-shadow">
            <p class="title">{{ $t('我的服务')}}</p>
            <ul>
                <li v-if="userData.isClerk">
                    <nuxt-link to="/member/merchant">
                        <NIcon class="cs-display-block cs-margin-auto" color="#606266" :size="25">
                            <CoreshopIconBuildingShop20Regular />
                        </NIcon>
                        <p>{{$t('商家管理')}}</p>
                    </nuxt-link>
                </li>
                <li v-for="item, index in serviceList" :key="index">
                    <nuxt-link :to="item.link" >
                        <NIcon class="cs-display-block cs-margin-auto" color="#606266" :size="25">
                            <component :is="item.icon"></component>
                        </NIcon>
                        <p>{{ $t(item.title) }}</p>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <!-- 增值服务 -->
        <div class="service-box box-shadow">
            <p class="title">{{$t('增值服务')}}</p>
            <ul>
                <li v-for="item, index in valueAddedServices" :key="index">
                    <nuxt-link :to="item.link">
                        <NIcon class="cs-display-block cs-margin-auto" color="#606266" :size="25">
                            <component :is="item.icon"></component>
                        </NIcon>
                        <p>{{ $t(item.title) }}</p>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <!-- 其它服务 -->
        <div class="service-box box-shadow">
            <p class="title">{{ $t('其它服务')}}</p>
            <ul>
                <li v-for="item, index in othenService" :key="index">
                    <nuxt-link :to="item.link">
                        <NIcon class="cs-display-block cs-margin-auto" color="#606266" :size="25">
                            <component :is="item.icon"></component>
                        </NIcon>
                        <p>{{ $t(item.title) }}</p>
                    </nuxt-link>
                </li>
            </ul>
        </div>
        </PullRefresh>
        <CoreshopFooterMenu></CoreshopFooterMenu>
</template>

<script setup lang="ts">
import { UnwrapRef } from 'vue';
import { NIcon } from "naive-ui";
import { queryOrderStatusSum } from '@/composables/order';
import { Result } from "@/model/result";
import { IOrderStatusSum } from '@/model/order';
import { IAccountInfo } from '@/model/account'
import { useMemberStore, useConfigStore,usePageConfig,useAccountStore } from '@/store'
import { getIsStoreUser } from '@/composables/member';
import CoreshopIconWifi120Regular from '@/components/coreshop-icon/Wifi120Regular.vue';
import CoreshopIconLineHorizontal320Regular from '@/components/coreshop-icon/LineHorizontal320Regular.vue';
import CoreshopIconCoupon from '@/components/coreshop-icon/coupon.vue';
import CoreshopIconBalance from '@/components/coreshop-icon/balance.vue';
import CoreshopIconInvoice from '@/components/coreshop-icon/invoice.vue';
import CoreshopIconServiceCard from '@/components/coreshop-icon/serviceCard.vue';
import CoreshopIconIntegral from '@/components/coreshop-icon/integral.vue';
import CoreshopIconAddress from '@/components/coreshop-icon/address.vue';
import CoreshopIconCollection from '@/components/coreshop-icon/collection.vue';
import CoreshopIconFootprint from '@/components/coreshop-icon/footprint.vue';
import CoreshopIconStore from '@/components/coreshop-icon/store.vue';
import CoreshopIconServiceGoods from '@/components/coreshop-icon/serviceGoods.vue';
import CoreshopIconPinTuan from '@/components/coreshop-icon/pinTuan.vue';
import CoreshopIconSeckill from '@/components/coreshop-icon/seckill.vue';
import CoreshopIconGroupPurchase from '@/components/coreshop-icon/groupPurchase.vue';
import CoreshopIconSolitaire from '@/components/coreshop-icon/solitaire.vue';
import CoreshopIconSignIn from '@/components/coreshop-icon/signIn.vue';
import CoreshopIconForm from '@/components/coreshop-icon/form.vue';
import CoreshopIconNotice from '@/components/coreshop-icon/notice.vue';
import CoreshopIconHelpCenter from '@/components/coreshop-icon/helpCenter.vue';
import CoreshopIconInviteFriends from '@/components/coreshop-icon/inviteFriends.vue';
import CoreshopIconSearch from '@/components/coreshop-icon/search.vue';
import CoreshopIconSystemSetting from '@/components/coreshop-icon/systemSetting.vue';
import { PullRefresh, Badge } from "vant";
import { redirectLogin } from '@/utils';
import { coreshopLanguage } from '~/consts';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
const serviceList = [
    {
        title: coreShopLang("分销中心"),
        link: "/member/distribution",
        icon: CoreshopIconWifi120Regular
    },
   /* {
        title: coreShopLang('代理中心'),
        link: "/member/agent",
        icon: CoreshopIconLineHorizontal320Regular
    },*/
    {
        title: coreShopLang('我的优惠券'),
        link: "/member/myCoupon",
        icon: CoreshopIconCoupon
    },
    {
        title: coreShopLang("我的余额"),
        link: "/member/balance",
        icon: CoreshopIconBalance
    },
    {
        title: coreShopLang("我的发票"),
        link: "/member/invoice",
        icon: CoreshopIconInvoice

    },
    {
        title: coreShopLang("我的服务卡"),
        link: "/member/serviceOrder",
        icon: CoreshopIconServiceCard

    },
    {
        title: coreShopLang("我的金豆"),
        link: "/member/integral",
        icon: CoreshopIconIntegral

    },
    {
        title: coreShopLang("地址管理"),
        link: "/member/address",
        icon: CoreshopIconAddress

    },
    {
        title: coreShopLang("我的收藏"),
        link: "/member/collection",
        icon: CoreshopIconCollection

    },
    {
        title: coreShopLang("我的足迹"),
        link: "/member/history",
        icon: CoreshopIconFootprint

    }
]

const valueAddedServices = [
    {
        title: coreShopLang("门店列表"),
        link: "/storeMap",
        icon: CoreshopIconStore
    }, {
        title: coreShopLang("服务商品"),
        link: "/serviceGood",
        icon: CoreshopIconServiceGoods
    }, {
        title: coreShopLang("优惠券"),
        link: "/coupon",
        icon: CoreshopIconCoupon
    }, {
        title: coreShopLang("拼团"),
        link: "/activity/pinTuan",
        icon: CoreshopIconPinTuan
    }, {
        title: coreShopLang("秒杀"),
        link: "/activity/seckill",
        icon: CoreshopIconSeckill
    }, {
        title: coreShopLang("团购"),
        link: "/activity/groupBuying",
        icon: CoreshopIconGroupPurchase
    }, {
        title: coreShopLang("接龙"),
        link: "/activity/solitaire",
        icon: CoreshopIconSolitaire
    }, {
        title: coreShopLang("签到"),
        link: "/activity/checkIn",
        icon: CoreshopIconSignIn
    }, {
        title: coreShopLang("万能表单"),
        link: "/form",
        icon: CoreshopIconForm
    },
]

const othenService = [
    {
        title: coreShopLang("通知公告"),
        link: "/notice",
        icon: CoreshopIconNotice
    }, {
        title: coreShopLang("帮助中心"),
        link: "/article",
        icon: CoreshopIconHelpCenter
    }, {
        title: coreShopLang("邀请好友"),
        link: "/member/invite",
        icon: CoreshopIconInviteFriends
    }, {
        title: coreShopLang("商品检索"),
        link: "/search",
        icon: CoreshopIconSearch
    }, {
        title: coreShopLang("系统设置"),
        link: "/member/setting",
        icon: CoreshopIconSystemSetting
    },
]

const userData: UnwrapRef<{
    orderSum: any;
    order: Array<string>;
    isClerk: boolean; // 判断是否是店员
    userInfo: IAccountInfo;
    balance: number;
    point: number;
    pullRefresh:boolean;
}> = reactive({
    orderSum: null,
    order: [coreShopLang('全部'), coreShopLang('待付款'), coreShopLang('待发货'), coreShopLang('待收货'), coreShopLang('待评价')],
    isClerk: false,
    userInfo: {},
    balance: 0,
    point:0,
    pullRefresh:false
})

const memberStore = useMemberStore();
const config = useConfigStore().getConfig;
const accountStore= useAccountStore()

usePageConfig().set_show_back(false);

const onRedirectLogin=()=>{
    redirectLogin();
}

const queryMemberInfo= async ()=>{

    userData.userInfo = await memberStore.getUserData;
    userData.balance = memberStore.getBalance;
    userData.point = memberStore.getPoint;

    const getOrderSum: Result<IOrderStatusSum> = await queryOrderStatusSum({
        "ids": "0,1,2,3,4",
        "isAfterSale": true
    }); 
    userData.orderSum = getOrderSum?.data || null;

    const getIsClerk: Result<any> = await getIsStoreUser();
    userData.isClerk = getIsClerk?.data?.isClerk || false;
 
}
if(accountStore.getToken){
    queryMemberInfo();
}

const onPullRefresh=()=>{
    queryMemberInfo();
    userData.pullRefresh = false;
}
</script>

<style lang="scss" scoped>
.carousel-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
}

@import "./index.scss";

.block-products__list-item {
    width: 90% !important;
}
.box-shadow{
    background: #FFFFFF;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
}


:deep(.van-badge--top-right){
    top: 12px;
    right: 8px;
}
</style>

