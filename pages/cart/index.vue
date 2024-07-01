<template>
  <div>
    <coreshop-title :title="$t('购物车')"></coreshop-title>
    <PullRefresh v-model="cartState.pullRefresh" @refresh="onPullRefresh()">
      <ul class="goods-box" v-if="cartState.cartList.length > 0">
        <li v-for="item in cartState.cartList" :key="item.productId">
          <SwipeCell
            :before-close="onBeforeClose"
            :right-width="60"
            :name="item.id!"
          >
            <div class="good-img">
              <div class="icon">
                <Checkbox
                  v-model="item.check"
                  checked-color="#dc2828"
                ></Checkbox>
              </div>
              <div class="img">
                <nuxt-link
                  :to="`/goods/detail/${item.products.goodsId}?goodsId=${item.products.goodsId}`"
                >
                  <img :src="item.products?.images" />
                </nuxt-link>
              </div>
              <div class="desc">
                <div class="good-name">
                  {{ item.products?.name }}
                </div>
                <div class="name">
                  {{ item.products?.spesDesc }}
                </div>
                <div class="price">
                  <p>
                    NT${{ item.products?.price }}
                    <span
                      v-if="
                        config.pointSwitch == 1 &&
                        config.pointGetModel == 2 &&
                        config.pointShowPoint == 1 &&
                        item.products?.points &&
                        item.products.points > 0
                      "
                    >
                      ({{ $t("送") }} {{ item.products.points
                      }}{{ config.pointShowName }})
                    </span>
                  </p>
                  <Stepper
                    v-model="item.nums"
                    theme="round"
                    button-size="22"
                    integer
                    min="0"
                    @minus="handleSubtract(item.productId!)"
                    @plus="handleAdd(item.productId!)"
                  />
                </div>
              </div>
            </div>
            <div
              class="cs-font-size-12 cs-m-t-10 point-buy"
              v-if="
                config.pointSwitch == 1 &&
                config.pointExchangeModel == 2 &&
                config.pointShowExchangePrice == 1 &&
                item.products.pointsDeduction > 0
              "
            >
              <span> {{ config.pointShowName }}{{ $t("兑换价") }}： </span>
              <span
                class="cs-color-red"
                v-if="config.pointDiscountedProportion"
              >
                {{
                  config?.pointDiscountedProportion *
                  item.products.pointsDeduction
                }}{{ config.pointShowName }}+{{
                  parseFloat(
                    `${
                      (item.products.price || 0) -
                      (item.products.pointsDeduction || 0)
                    }`
                  )?.toFixed(2)
                }}{{ $t("元") }}
              </span>
            </div>
            <template #right>
              <div class="delete">
                <NIcon class="icon" :size="15">
                  <CoreshopIconDelete20Regular />
                </NIcon>
                <div class="del-tip">{{ $t("删除") }}</div>
              </div>
            </template>
          </SwipeCell>
        </li>
      </ul>
      <div v-else>
        <CoreshopNoData :text="$t('您的购物车空空如也')" />
        <CoreshopButton
          @click="handleGoHome()"
          class="cs-display-flex cs-margin-auto"
          size="small"
          round
          :text="$t('返回首页')"
        />
      </div>
    </PullRefresh>
    <div class="total-box" v-if="cartState.cartList.length > 0">
      <div>
        <div class="icon-box" @click="handleSelectAll">
          <Checkbox v-model="checkAll" checked-color="#dc2828"></Checkbox>
        </div>
        <div class="price-box">
          <p>
            <span class="text">{{ $t("商品合计") }}:</span>
            <span class="num">NT${{ totalPrice }}</span>
          </p>
        </div>
      </div>
      <div class="btn-order" @click="handleSubmitOrder">
        {{ $t("立即下单") }}
      </div>
    </div>
    <CoreshopLoading v-if="cartState.loading" />
  </div>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui"
import type { UnwrapRef } from "vue"
import { useCartStore, useConfigStore, usePageConfig } from "@/store"
import { Cart, ProductItem } from "@/model/cart"
import * as cartService from "@/composables/cartService"
import type { Result } from "@/model/result"
import { OrderTypeEnum } from "@/enum"
import {
  showConfirmDialog,
  showToast,
  PullRefresh,
  SwipeCell,
  Stepper,
  Checkbox,
} from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
const route = useRoute()
const config = useConfigStore().getConfig
usePageConfig().set_show_back(false)

const cartState: UnwrapRef<{
  total: number
  cartList: Array<ProductItem>
  pullRefresh: boolean
  loading: boolean
}> = reactive({
  total: 0,
  cartList: [],
  pullRefresh: false,
  loading: true,
})

const cartStore = useCartStore()
// 查询购物车数据
cartState.loading = true
const cartData: Result<Cart> = await cartService.cartGetCartList()
cartStore.setCartList(cartData.data?.list || [])
cartState.loading = false
cartStore.$subscribe((mu, state) => {
  cartState.cartList = state.cartList
})

cartState.cartList = cartStore.getCartList
const checkAll = computed(() => cartStore.getProductAllChecked)
const totalPrice = computed(() => cartStore.getTotalPrice)

/** 下拉刷新 */
const onPullRefresh = async () => {
  cartState.loading = true
  const cartData: Result<Cart> = await cartService.cartGetCartList()
  cartStore.setCartList(cartData.data?.list || [])
  cartState.loading = false
  cartState.pullRefresh = false
}

// 商品全选中
const handleSelectAll = () => {
  const checkAll = cartStore.getProductAllChecked
  cartStore.setAllProductChecked(checkAll ? false : true)
}

if (route.query?.select === "all") {
  handleSelectAll()
}

// 商品选中
const handleSelect = (id: number) => {
  cartStore.setProductChecked(id)
}

// 商品数量减
const handleSubtract = async (id: number) => {
  const current = cartState.cartList.find((item) => item.productId === id)
  await cartStore.setReduceProductNumber(id, 1)

  if ((current?.nums || 0) <= 0 && current?.id) {
    cartStore.setDeleteCartItem(current.id || 0)
  }
}
// 商品添加
const handleAdd = (id: number) => {
  cartStore.setAddProductNumber(id, 1)
}

const handleNumberChange = (id: number, value: number | null) => {
  cartStore.setProductNumber(id, !value ? 1 : value)
}

/** 提交订单 */
const handleSubmitOrder = () => {
  const carIds: string = cartState.cartList
    ?.filter((x) => x.check)
    ?.map((x) => x.id)
    ?.join(",")
  if (!carIds) {
    showToast(coreShopLang("请选择购物车商品"))
    return
  }
  navigateTo(
    `/order/submit?orderType=${OrderTypeEnum.common}&cartIds=${carIds}`,
    { replace: true }
  )
}

const handleGoHome = () => {
  return navigateTo(`/`, { replace: true })
}

const onBeforeClose = (event: {
  name: number
  position: string
}): Promise<boolean> => {
  if (["cell", "outside"].includes(event.position)) {
    return Promise.resolve(true)
  }

  return new Promise((resolve) => {
    showConfirmDialog({
      title: coreShopLang("删除商品"),
      message: coreShopLang("确定删除商品"),
      confirmButtonColor: "#f56c6c",
      confirmButtonText: coreShopLang("确认"),
      cancelButtonText: coreShopLang("取消"),
    })
      .then(() => {
        cartStore.setDeleteCartItem(event.name)
        return resolve(true)
      })
      .catch(() => {
        return resolve(true)
      })
  })
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/color.scss";
@import "./index.scss";

:deep(.layout-page) {
  padding-bottom: 2.5rem !important;
}
</style>
import { position } from
"html2canvas/dist/types/css/property-descriptors/position";
