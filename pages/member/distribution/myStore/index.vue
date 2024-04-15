<template>
    <NuxtLayout name="personal-center">
        <CoreshopTitle :title="$t('我的店铺')"></CoreshopTitle>
        <div>
            <div class="banner-box">
                <NCarousel :show-dots="false">
                    <img v-for="item,index in storeData.storeBanner" :key="index" :src="item" alt="">
                </NCarousel>
            </div>

            <div>
                <ul class="store-box">
                    <li>
                        <img :src="storeData.storeInfo.storeLogo ? storeData.storeInfo.storeLogo : '/images/empty.png'" alt="">
                    </li>
                    <li>
                        <div class="icons">
                            <p class="cs-color-red cs-font-size-16">{{ storeData.totalCount }}</p>
                        </div>
                        <p class="cs-font-size-12">{{$t('全部宝贝')}}</p>
                    </li>
                    <li @click="handleToggleCollectPopup">
                        <div class="icons">
                            <NIcon :size="20" class="cs-margin-auto">
                                <CoreshopIconStar28Regular />
                            </NIcon>
                        </div>
                        <p class="cs-font-size-12">{{$t('收藏本店')}}</p>
                    </li>
                    <li @click="handleTogglePoster">
                        <div class="icons" >
                            <NIcon :size="20" class="cs-margin-auto">
                                <CoreshopIconQrCode24Regular />
                            </NIcon>
                        </div>
                        <p class="cs-font-size-12">{{$t('二维码')}}</p>
                    </li>
                </ul>
            </div>
            <div class="search-box">
                <n-input-group>
                    <n-input :style="{ width: '81%' }" :clearable="true" v-model:value="storeData.where.searchName"
                        :placeholder="$t('请输入关键词搜索')" @clear="handleClearSearchName" />
                    <CoreshopButton @on-click="handleSeach" style="padding:0.45rem;">
                        <CoreshopLanguage text="搜索" />
                    </CoreshopButton>
                </n-input-group>
            </div>
            <div class="goods-box" id="classify-content">
                <ul class="clr" v-if="storeData.list.length > 0">
                    <li v-for="item in storeData.list || []" :key="item.id">
                        <nuxt-link :to="`/goods/detail/${item.id}`">
                            <span class="good-tag-hot" v-if="item.isHot">{{$t('热门')}}</span>
                            <span class="good-tag-recommend" v-if="item.isRecommend">{{$t('推荐')}}</span>
                            <div>
                                <CoreshopImage root="#classify-content" :src="item.image">
                                </CoreshopImage>
                            </div>
                            <div>
                                <p class="cs-font-size-14 name cs-p-t-5">{{ item.name }}</p>
                                <p class="cs-font-size-12 brief">{{ item.brief }}</p>
                                <p class="price">
                                    <span>NT${{ item.price }}</span>
                                    <span>NT${{ item.mktprice }}</span>
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
                <CoreshopNoData v-else />
                <p class="no-more" v-if="storeData.list.length > 0 && !storeData.haveData">{{$t('没有更多了')}}</p>
            </div>
            <CoreshopLoading v-if="storeData.isLoading" />
        </div> 
        <!-- 海报 -->
        <coreshop-canvas-poster :showPopup="storeData.showPopupPoster"
            :link="storeData.link"
            :shareType="UrlSharePageType.inv" :shareOptions="storeData.shareOptions"
            @handleClosePopup="handleTogglePoster"  />
        <!-- 收藏弹框 -->
        <van-popup v-model:show="storeData.showCollectPopup" class="collectPopup" :style="{
                'background': 'none',
                'transform': 'inherit',
                'top': 0,
                'left': 0,
                'max-width': '100%',
                'width': '100%',
                'height':'100%',
        }">
            <img src="/images/wxh5.png" alt="" srcset="">
            <div class="colse" @click="handleToggleCollectPopup">{{$t('关闭')}}</div>
        </van-popup>
    </NuxtLayout>
</template>

<script setup lang='ts'>
import { UnwrapRef } from 'vue';
import { queryDistributionStoreInfo, queryDistributionInfo } from '@/composables/distribution';
import { Result } from "@/model/result";
import { NInputGroup, NInput, NCarousel, NIcon } from "naive-ui";
import { queryGetGoodsPageList } from '@/composables/productService';
import { AgentInfo, AgentStoreInfo } from '@/model/member'; 
import { ShareType, UrlSharePageType,
    UrlShareClentType, shareUrl,
} from "@/enum";
import { queryShare } from '@/composables/shareService';
import { showToast } from 'vant';
import { useAccountStore } from '@/store'; 
import { IShareParams } from '@/model';
import { coreShopAuthCookie } from "@/consts";


definePageMeta({
    layout: false,
})

const route = useRoute(); 

const storeData: UnwrapRef<{
    storeInfo: any;
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    list: Array<any>;
    where: {
        searchName: string;
    };
    haveData: boolean;
    isLoading: boolean;
    storeBanner: Array<string>; 
    link: string;
    showPopupPoster: boolean; 
    showCollectPopup: boolean; 
    shareOptions: { store: number; }
}> = reactive({
    storeInfo: {},
    page: 1,
    limit: 12,
    totalPages: 0,
    totalCount: 0,
    list: [],
    searchName: null,
    where: {
        searchName: '',
    },
    haveData: true,
    isLoading: false,
    storeBanner: [], 
    link: "",
    showPopupPoster: false, 
    showCollectPopup: false,
    shareOptions: { store: 0 }
});

const getDistributionInfo: Result<AgentInfo> = await queryDistributionInfo();
storeData.storeBanner = getDistributionInfo.data?.storeBanner?.split(',') || []; 
storeData.shareOptions.store = Number(getDistributionInfo.data?.store);

const getDistributionStoreInfo: Result<AgentStoreInfo> = await queryDistributionStoreInfo({
    id: getDistributionInfo.data.store
});
storeData.storeInfo = getDistributionStoreInfo.data;
        
const query = async () => {
    storeData.isLoading = true;

    const getGoodsList: Result<any> = await queryGetGoodsPageList({
        page: storeData.page,
        limit: storeData.limit,
        where: JSON.stringify(storeData.where)
    }, true);
    storeData.totalPages = getGoodsList.data.totalPages;
    storeData.totalCount = getGoodsList.data.totalCount;

    if (getGoodsList.data?.list.length > 0) {
        storeData.list = storeData.list.concat(getGoodsList.data?.list || []);
    } else {
        storeData.haveData = false;
    }
    storeData.isLoading = false;

};

query();

const handleShare = async () => {
    let data:IShareParams = {
        client: UrlShareClentType.wxofficial, 
        type: ShareType.url,
        url:'',
        page: UrlSharePageType.inv,
        params: {
            store: route?.query?.store
        },
        token: useAccountStore().getToken
    }
    if (process.client) {
        data.url = `${window.location.origin}${shareUrl}`;
    }
    const cookie = useCookie(coreShopAuthCookie);   
    const result: Result<string> = await queryShare(data,cookie.value ? true : false);
    if (result.status) { 
        storeData.link = result.data;
    }else{
        showToast(result.msg)
    }
}
onMounted(() => { 
    handleShare();
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 60 && storeData.haveData) {
            storeData.page++;
            query();
        }
    }, 500))
})

const handleTogglePoster = () => {
    storeData.showPopupPoster = !storeData.showPopupPoster;
}

const handleSeach = () => {
    storeData.list = [];
    storeData.page = 1;
    storeData.haveData = true;
    storeData.isLoading = false;

    query();
}

const handleClearSearchName = () => {
    storeData.where.searchName = '';
    handleSeach();
}

const handleToggleCollectPopup = () => {
    storeData.showCollectPopup =!storeData.showCollectPopup;
}

</script>

<style lang='scss' scoped>  
@import './index.scss';
</style>