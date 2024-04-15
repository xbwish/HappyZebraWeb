<template>
    <div class="product-footer">
        <div class="product">
            <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-percent-w-35 ">
                <div class="customer" @click="onRedirectHome()">
                    <Icon name="wap-home-o" size="20" />
                    <p>{{$t("首页")}}</p>
                </div>
                <div class="cart" @click="handleGoCart">
                    <Icon name="shopping-cart-o"  size="20"/>
                    <Badge class="hit" v-if="cartStore.cartProductNumber > 0" :content="cartStore.cartProductNumber" />
                     <p>{{$t("购物车")}}</p>
                </div>
            </div>
            <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between right-foot-operate">
                <slot name="button"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { Icon, Badge } from "vant";
import { useCartStore } from "@/store";

const cartStore = useCartStore();

const handleGoCart = () => {
    navigateTo(`/cart`);

}

const onRedirectHome=()=>{
    navigateTo('/',{replace:true});
}



</script>
<style lang="scss" scoped>
.product-footer {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 10rem;
    background: #fff;
    box-shadow: 0 0 15px #dcdcdc;

    .product {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem;

        :deep(.n-icon) {
            display: block;
            width: 0.5rem;
            height: 0.5rem;
            margin: 0 auto;

            svg {
                width: 100%;
                height: 100%;
            }
        }

        p {
            text-align: center;
            font-size: 0.3rem;
            line-height: 1;
            padding-top: 0.1rem;
        }

        .customer,
        .cart {
            position: relative;
            flex: 1;
            text-align: center;

            .hit {
                position: absolute;
                right: 0.6rem;
                bottom: 0.6rem;
            }
        }
    }
}
.right-foot-operate{
    flex: 1;
}
</style>