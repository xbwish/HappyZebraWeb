<template>
    <CoreshopGoodDetailProductInfo :goodDetail="goodDetail" :chooseSku="productDetailState.chooseSku"
     @handleChangeGoodNum="handleChangeGoodNum" :serviceDescription="detailData.serviceDescription"
        @handleChangeGoodSku="handleChangeGoodSku">
        <template #meta>
            <ul class="product__meta">
                <li class="product__meta-availability">运费: <span class="text-success">包邮</span></li>
                <li>销量: <a href="">{{ goodDetail?.buyCount || '0' }}</a></li>
                <li>库存: {{ goodDetail?.product?.stock || 0 }}</li>
            </ul>
        </template>
        <template #button>
            <div class="product__actions-item product__actions-item--wishlist">
                <button type="button" class="btn btn-secondary btn-svg-icon btn-lg" data-toggle="tooltip" title="收藏"
                    @click="handleCollection">
                    <svg width="16px" height="16px">
                        <use v-if="detailData.isFav" xlink:href="/images/sprite.svg#wishlist-16">
                        </use>
                        <use v-else xlink:href="/images/sprite.svg#heart-20"></use>
                    </svg>
                </button>
            </div>
            <div class="product__actions-item product__actions-item--addtocart cs-flex-1">
                <button class="btn btn-secondary btn-lg cs-percent-w-100" @click="handleAddCart($event)">加入购物车</button>
            </div>
            <div class="product__actions-item product__actions-item--addtocart cs-flex-1">
                <button class="btn btn-primary btn-lg cs-percent-w-100" @click="handleBuyNow($event)">立即购买</button>
            </div>
        </template>
    </CoreshopGoodDetailProductInfo>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { Result } from "@/model/result";
import { useAccountStore } from '@/store';
import { queryGoodsDetailByToken, queryProductDetial,queryServiceDescription, queryGoodsCollection } from "@/composables/productService";
import { Product, SkuItem, GoodDescription } from "@/model/product";
import { OrderTypeEnum, OrderBuyProductModeEnum } from "@/enum";
import * as cartService from "@/composables/cartService";
import { showToast,showSuccessToast   } from 'vant'

definePageMeta({
    layout: false, // 手动关闭 default 布局
})

const props = withDefaults(defineProps<{
    id?: number | string;
    params:any;
}>(), {
    id: 0,
    params:{},
});

const detailData: UnwrapRef<{
    img: string;
    isFav: boolean;
    serviceDescription: GoodDescription;
}> = reactive({
    img: "",
    isFav: false, // 商品是否收藏
    serviceDescription: {
        commonQuestion: [],
        delivery: [],
        service: [],
    },
});

const productDetailState: UnwrapRef<{
    chooseProductImage: string;
    chooseSku?: SkuItem;
    nums?: number;
}> = reactive({
    chooseProductImage: "",
    chooseSku: {},
    nums: 1,
});

//#region 查询商品详情
let goodDetialResult: Product = {};
const _params = {
    id: props.id,
    data: true,
    ...props.params,
}

if (useAccountStore().getToken) {
    goodDetialResult = await queryGoodsDetailByToken(_params);
} else {
    goodDetialResult = await queryProductDetial(_params);
}
const goodDetail: Product = goodDetialResult?.data || {};

const defaultSku: SkuItem = (goodDetail.skuList?.sku_list?.find(
    (x) => parseFloat((x._id) as string) === goodDetail.product?.id
)) || {};
productDetailState.chooseSku = defaultSku;

const handleChangeGoodSku = (sku: SkuItem) => {
    productDetailState.chooseSku = sku;
};

const handleChangeGoodNum = (num: number) => {
    productDetailState.nums = num
};

//#region 获取商品关键词
const goodDescription: Result<GoodDescription> = await queryServiceDescription();
detailData.serviceDescription.commonQuestion = goodDescription.data?.commonQuestion || [];
detailData.serviceDescription.delivery = goodDescription.data?.delivery || [];
detailData.serviceDescription.service = goodDescription.data?.service || [];

// 添加购物车
const handleAddCart = async (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    const buyResult: Result<number> = await cartService.cartAddCart({
        nums: productDetailState.nums || 1,
        productId: productDetailState.chooseSku?._id || '',
        type: OrderBuyProductModeEnum.addCart,   // 1 加入购物车  2购买
        cartType: OrderTypeEnum.common,
    });

    if (!buyResult.status || !buyResult.data) {
        showToast((buyResult.msg) as string);
        return;
    }
    showSuccessToast('加入购物车');
};

// 立即购买
const handleBuyNow = async (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    const buyResult: Result<number> = await cartService.cartAddCart({
        nums: productDetailState.nums || 1,
        productId: productDetailState.chooseSku?._id || '',
        type: OrderBuyProductModeEnum.buyNow,   // 1 加入购物车  2购买
        cartType: OrderTypeEnum.common,
        // 非普通订单关联营销对象序列
        objectId: 0,
    });

    if (!buyResult.status || !buyResult.data) {
        showToast((buyResult.msg) as string);
        return;
    }
    navigateTo(`/order/submit?orderType=${OrderTypeEnum.common}&cartIds=${buyResult.data}`);
}

// 收藏
const handleCollection = async () => {
    const goodsCollection: Result<any> = await queryGoodsCollection({
        id: props.id as unknown as number,
    });
    showSuccessToast((goodsCollection.msg) as string);
    detailData.isFav = !detailData.isFav;
}



</script>

<style scoped>

</style>
