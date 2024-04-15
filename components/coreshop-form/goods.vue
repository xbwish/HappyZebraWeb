<template>
    <div class="cs-background-color-white cs-p-10">
        <div class="title">
            <div>{{ props.data.name }}：</div>
            <div v-if="props.data.required">
                <Tag type="primary">{{$t('必选')}}</Tag>
            </div>
        </div>
        <div class="goods-box">
            <div>
                <img :src="props.data.good?.image" alt="">
            </div>
            <div>
                <p class="name">{{ props.data.good?.name }}</p>
                <p class="buyCount">{{$t('已售')}}{{ props.data.good?.buyCount }}</p>
                <p class="price">
                    <span>NT${{ props.data.good?.price}}</span>
                    <span v-if="props.data.good?.cartCount > 0">{{ props.data.good?.cartCount || 0}}</span>
                    <CoreshopButton class="cs-percent-w-35" bg-color="#f56c6c"  @on-click="handleShowSku">
                        <CoreshopLanguage :text="$t('选规格')" />
                    </CoreshopButton>
                </p>
            </div>
        </div>
        <div class="sku-box" v-if="productDetailState.sku.length > 0">
            <div class="title">{{$t('已选规格')}}：</div>
            <ul>
                <li v-for="item in productDetailState.sku" :key="item.id" class="cs-m-b-5">
                    <div>{{ item.sku }}</div>
                    <div>x{{ item.num}}</div>
                    <CoreshopButton  bg-color="#404040"  @on-click="handleDeleteSku(item.id)">
                        <CoreshopLanguage :text="$t('删除')" />
                    </CoreshopButton>
                </li>
            </ul>
        </div>
    </div>
    <!-- 商品规格弹框 -->
    <CoreshopGoodDetailProductSku :show="productDetailState.showSku" :goodDetail="props.data.good"
        :chooseSku="productDetailState.chooseSku" @handleShowSku="handleShowSku"
        @handleChangeGoodSku="handleChangeGoodSku" @handleChangeGoodNum="handleChangeGoodNum">
        <template #button>
            <div class="cs-m-t-20 cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100">
                <CoreshopButton class="cs-percent-w-100" bg-color="#e84f5d"  size="medium" @on-click="handleProductSkuOk">
                    <CoreshopLanguage :text="$t('确定')"/>
                </CoreshopButton>
            </div>
        </template>
    </CoreshopGoodDetailProductSku>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { SkuItem } from "@/model/product";
import { Tag,} from "vant";

const props = withDefaults(defineProps<{
    data: any;
}>(), {
    data: () => { }
});

let emits = defineEmits(['handleConfirm','handleDelete']);

const productDetailState: UnwrapRef<{
    chooseProductImage: string;
    chooseSku?: SkuItem;
    nums?: number;
    showSku: boolean,
    sku:Array<any>;
}> = reactive({
    chooseProductImage: "",
    chooseSku: {},
    nums: 1,
    showSku: false,
    sku:[],
});

const defaultSku: SkuItem = (props.data.good.skuList?.sku_list?.find(
    (x:any) => parseFloat((x._id) as string) === props.data.good?.product?.id
)) || {};
productDetailState.chooseSku = defaultSku;


const handleShowSku = () => {
    productDetailState.showSku = !productDetailState.showSku;
}

const handleChangeGoodSku = (sku: SkuItem) => {
    productDetailState.chooseSku = sku;
};

const handleChangeGoodNum = (num: number) => {
    productDetailState.nums = num;
};


const handleProductSkuOk = ()=>{
    let data = {
        "key": props.data.id,
        "productId": productDetailState.chooseSku?._id,
        "goodsId": productDetailState.chooseSku?.goods_id,
        "nums": productDetailState.nums,
        "price": productDetailState.chooseSku?.price
    }
    productDetailState.showSku = false;

    if (productDetailState.sku.length > 0){
        let arr = productDetailState.sku.filter(item => item.id == productDetailState.chooseSku?._id);
        if (arr.length > 0){
            arr[0].num += productDetailState.nums;
        }else{
            addSku();
        }
    }else{
        addSku();
    }

    emits('handleConfirm',{
        key: props.data.id,
        value:data,
    })
 
}

//  添加
const addSku = ()=>{
    productDetailState.sku.push({
        id: productDetailState.chooseSku?._id,
        sku: productDetailState.chooseSku?.sku_name_arr && productDetailState.chooseSku?.sku_name_arr[0],
        num: productDetailState.nums
    });
}

// 删除
const handleDeleteSku = (id:number)=>{
    productDetailState.sku.forEach((item,index)=> {
        if (item.id == id){
            productDetailState.sku.splice(index,1);
        }
    });
    emits('handleDelete', id)
}
</script>

<style scoped lang="scss">
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.35rem;
}
.sku-box{
    ul{
        li{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

.goods-box {
    display: flex;
    justify-content: space-between;
    margin: 0.2rem 0;
    div:nth-of-type(1) {
        width: 23%;

        img {
            display: block;
            width: 100%;
            border-radius: 5px;
        }
    }

    div:nth-of-type(2) {
        width: 75%;

        .name {
            font-size: 0.35rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .buyCount{
            color: #919293;
        }
        .price{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.4rem;
            color: #f56c6c;
        }
    }
}
</style>