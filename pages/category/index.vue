<template>
    <NuxtLayout name="coreshop-shop-header-back">
        <PullRefresh v-model="goodState.pullRefresh" @refresh="onPullRefresh()">
            <CoreshopTitle :title="goodState.title"></CoreshopTitle>
        <div class="search-contain">
            <CoreshopSearchDropdown @handle-search="handleSearch" />
        </div>
        <div class="products-box">
            <div class="products-list" v-if="goodState?.goods.length > 0">
                <ul >
                    <li v-for="item in goodState.goods" :key="item.id">
                        <nuxt-link :to="`/goods/detail/${item.id}?goodsId=${item.id}`">
                            <div>
                                <img :src="item.image" alt="">
                            </div>
                            <div>
                                <p class="title">
                                    <img v-if="item.isRecommend" src="/images/recommend.png" alt="" srcset="">
                                    <img v-if="item.isHot" src="/images/hot.png" alt="" srcset="">
                                    {{ item.name }}
                                </p>
                                <p class="price cs-color-red">NT${{ item.price }}
                                    <span v-if="item.mktprice && item.mktprice > 0" class="cs-color-gray">NT${{
                                        item.mktprice
                                    }}</span>
                                </p>
                            </div>
                            <section class="point-box">
                                <div
                                    v-if="config.pointSwitch == 1 && config.pointExchangeModel == 2 && config.pointShowExchangePrice == 1 && item.pointsDeduction > 0">
                                    <p>
                                        {{ config.pointShowName }}{{$t('兑换价')}}:
                                    </p>
                                    <p class="cs-color-red">
                                        {{ (config.pointDiscountedProportion ||0) * item.pointsDeduction }}{{
                                            config.pointShowName
                                        }}+{{
                                            parseFloat(`${((item.price||0) - (item.pointsDeduction||0))}`).toFixed(2)
                                        }} {{$t('元')}}
                                    </p>
                                </div>
                                <div
                                    v-if="config.pointSwitch == 1 && config.pointGetModel == 2 && config.pointShowPoint == 1 && item.points > 0">
                                    <p>
                                        {{$t('购买赠送')}}:
                                    </p>
                                    <p class="cs-color-red">
                                        {{ item.points }}{{ config.pointShowName }}
                                    </p>
                                </div>
                            </section>
                        </nuxt-link>
                    </li>
                </ul> 
            </div>
            <CoreshopNoData class="no-data" v-else />
            <p class="no-more" v-if="goodState.goods.length > 0 && !goodState.haveData">{{$t('没有更多了')}}</p>

        </div>
        <CoreshopLoading v-if="goodState.isLoading" />
    </PullRefresh>
</NuxtLayout>
</template>

<script setup lang='ts'>
import { Result } from "@/model/result";
import { ProductData, ProductQuery } from "@/model/product";
import { queryGetGoodsPageList } from '@/composables/productService';
import { OrderModeEnum } from "@/enum";
import {  useConfigStore,usePageConfig } from '@/store';
import { PullRefresh  } from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
interface IQueryParams{
    id?:string;
    title?:string;
    keyWord?:string;
}

usePageConfig().set_back_style({'align-items':'flex-end'});
definePageMeta({layout: false});

const route = useRoute();
const config = useConfigStore().getConfig;
const goodState = reactive<{
    totalPages: number;
    limit: number;
    page: number;
    id: string | null;
    goods: Array<{ [key: string]: any }>, 
    orderField: string | null; //商品排序字段
    orderMode?: OrderModeEnum,
    features: boolean;
    haveData: boolean;
    isLoading: boolean;
    title: string;
    paramsData: any;
    [key: string]: any;
    pullRefresh:boolean;
}>({
    totalPages: 0,
    limit: 10,
    page: 1,
    id: null,
    goods: [], 
    orderField: null,
    features: false,
    orderMode: OrderModeEnum.desc,
    haveData: true,
    isLoading: false,
    paramsData: '',
    title:coreShopLang('商品搜索'),
    pullRefresh:false
});

 const queryParams:IQueryParams = route.query;

onMounted(() => {
    if(queryParams){
      goodState.title = queryParams.title || coreShopLang('商品搜索');
    } 
    listenScroll(); 
})

const queryProduct = async () => {
    goodState.isLoading = true;
    let _params: ProductQuery = {
        page: goodState.page,
        limit: goodState.limit,
        ...goodState.paramsData,
    };

    let where = _params.where? JSON.parse(_params.where):{};
    
    if(queryParams?.id){
        where.catId = queryParams.id;
    }

    if(queryParams.keyWord){
        where.searchName = queryParams.keyWord;
    }

    if(Object.keys(where).length ){
        _params.where=JSON.stringify(where);
    }

    const productResult: Result<ProductData> = await queryGetGoodsPageList(_params);

    goodState.totalPages = ((productResult.data?.totalPages) as number <= 1 ? 0 : productResult.data?.totalPages) || 0;

    if (productResult.data?.list && productResult.data?.list.length > 0) { 
        goodState.goods = goodState.goods.concat(productResult.data?.list); 
    } else {
        goodState.haveData = false;
    }
    goodState.isLoading = false;
};


const listenScroll =()=>{
    window.addEventListener('scroll', throttle(() => {
        const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
        const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
        const screenH = window.screen.height;  // 屏幕可视高度
        if ((scrollH - scrollT - screenH) < 10 && goodState.haveData) {
            goodState.page++;
            queryProduct();
        }
    }, 500))
}

/** 商品搜索查询 */
const handleSearch = (data:{order:string,where:string}={order:"sort asc",where:''}) => {
    goodState.page = 1;
    goodState.goods = [];
    goodState.producLeft = [];
    goodState.producRight = [];
    goodState.haveData = true;
    goodState.isLoading = false;
    goodState.paramsData = data;
    queryProduct();
}

const onPullRefresh=()=>{
    handleSearch(goodState.paramsData);
    goodState.pullRefresh=false;
}

</script>
<style scoped lang="scss">
@import './index.scss';
</style>