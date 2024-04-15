<template>
    <footer class="layout-footer">
        <ul>
            <li v-for="(item, index) in tabList" :key="index">
                <nuxt-link :to="item.link">
                    <component :is="item.icon" :color="route.path == item.link ? color.accentColor : item.color"
                        :isActive="route.path === item.link">
                    </component>
                    <p :class="{ 'on': route.path == item.link }">{{ item.tilte }}</p>
                </nuxt-link>
                <ClientOnly>
                    <Badge class="cart-product-num" v-if="item.link === '/cart' && cartStore.getCartProductNumber > 0"
                        :content="cartStore.getCartProductNumber" />
                </ClientOnly>
            </li>
        </ul>
        <van-back-top style="--van-back-top-bottom:75px;z-index: 999;--van-back-top-background:#D33123;" />
    </footer>
</template>

<script setup lang="ts">
import { color } from '@/consts';
import CoreshopIconHome from '@/components/coreshop-icon/home.vue';
import CoreshopIconClassify from '@/components/coreshop-icon/classify.vue';
import CoreshopIconCart from '@/components/coreshop-icon/cart.vue';
import CoreshopIconMe from '@/components/coreshop-icon/me.vue';
import { useI18n } from "vue-i18n";
import { useCartStore } from "@/store";
import { Badge } from "vant";
const cartStore = useCartStore();
const { t: coreShopLang } = useI18n();
const route = useRoute();

const tabList = [
    {
        tilte: coreShopLang("首页"),
        link: "/",
        icon: CoreshopIconHome,
        color: "#666666",
    }, {
        tilte: coreShopLang("分类"),
        link: "/goods/classify",
        icon: CoreshopIconClassify,
        color: "#666666",
    }, {
        tilte: coreShopLang("购物车"),
        link: "/cart",
        icon: CoreshopIconCart,
        color: "#666666",
    }, {
        tilte: coreShopLang("我的"),
        link: "/member/center",
        icon: CoreshopIconMe,
        color: "#666666",
    },
];

</script>
<style lang="scss" scoped>
@import '@/assets/css/color.scss';

.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease;
}

.v-enter,
.v-leave-to {
    transform: translateY(10px);
    opacity: 0;
}

.layout-footer {
    position: fixed;
    display: flex;
    left: 50%;
    bottom: 0;
    width: 10rem;
    transform: translateX(-50%);
    background-color: #fff;
    z-index: 999;
    height: 1.5rem;
    box-shadow: 0 0 15px #dcdcdc;

    ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;

        li {
            width: 25%;

            img {
                display: block;
                margin: auto;
                width: 30px;
            }

            p {
                text-align: center;
                font-size: 0.3rem;
                color: #000;
                padding-top: 0.1rem;
                line-height: 1;
            }

            p.on {
                color: $accent-color;
            }
        }
    }
}

p {
    text-align: center;
    font-size: 0.3rem;
    color: #000;
    padding-top: 0.1rem;
    line-height: 1;
}

.cart-product-num {
    position: absolute;
    right: 140px;
    background-color: #f56c6c;
}

.totop-end {
    position: fixed;
    right: 0.75rem;
    bottom: 2rem;
    background: #fff;
    border-radius: 50%;
}
</style>
