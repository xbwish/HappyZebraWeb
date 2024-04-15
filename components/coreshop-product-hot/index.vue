<template>
    <div class="similar-goods" id="hot-goods">
        <div class="title">热销推荐</div>
        <div class="hot-godds" id="hot-goods">
            <ul>
                <li v-for="item in recommendProducts" :key="item.id">
                    <coreshop-product :width="168" :height="168" root="#hot-godds"
                        @handleClick="()=>handleClick(item.id)" :src="item.image" :title="item.name"
                        :price="item.price">
                    </coreshop-product>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { queryGoodsRecommendList } from '@/composables/productService';
import { Result } from "@/model/result";
import { Product } from "@/model/product";

/** 商品推荐商品 */
const result: Result<Array<Product>> = await queryGoodsRecommendList();
const recommendProducts: Array<Product> = result.data.slice(0,4);

let emits = defineEmits<{ (e: 'handleClick', id: number): void }>();
const handleClick = (id: number) => {
    emits('handleClick', id)
}

</script>

<style lang='scss' scoped>
.similar-goods {
    width: 270px;
    background-color: #f3f3f3;
    height: 100%;

    .title {
        font-size: 18px;
        padding: 15px 20px;
        background-color: #ecebeb;
    }

    .hot-godds {
        padding: 30px;

        li {
            margin-bottom: 20px;
        }
    }
}
</style>