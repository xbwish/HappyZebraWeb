<template>
  <div>
    <coreshop-title :title="$t('分类')"></coreshop-title>
    <section
      class="layout-classify"
      v-if="configStore.getConfig.cateStyle === 1"
    >
      <ul class="classify-good-one">
        <li v-for="(item, index) in goodState.classify" :key="index">
          <nuxt-link :to="`/category?id=${item.id}&title=${item.name}`">
            <img :src="item.imageUrl" alt="" />
            <p>{{ item.name }}</p>
          </nuxt-link>
        </li>
      </ul>
    </section>
    <section
      class="layout-classify"
      v-if="configStore.getConfig.cateStyle === 2"
    >
      <ul class="classify-good-two">
        <li v-for="(item, index) in goodState.classify" :key="index">
          <nuxt-link :to="`/category?id=${item.id}&title=${item.name}`">
            <img :src="item.imageUrl" alt="" />
            <p>{{ item.name }}</p>
          </nuxt-link>
        </li>
      </ul>
    </section>
    <section
      class="layout-classify"
      v-if="configStore.getConfig.cateStyle === 3"
    >
      <section class="classify-left">
        <Sidebar v-model="goodState.activeMainClassifyIndex">
          <SidebarItem
            v-for="(item, index) in goodState.classify || []"
            :key="item.id"
            :title="item.name"
            @click="handlerChangeClassifyTypeThree($event, item.id)"
          ></SidebarItem>
        </Sidebar>
      </section>
      <section class="classify-right">
        <div class="classify-good-three">
          <p class="title">{{ goodState.title }}</p>
          <ul>
            <li v-for="(item, index) in goodState.classifyChilds" :key="index">
              <nuxt-link :to="`/category?id=${item.id}&title=${item.name}`">
                <img :src="item.imageUrl" alt="" />
                <p>{{ item.name }}</p>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </section>
    </section>
    <section
      class="layout-classify"
      v-if="configStore.getConfig.cateStyle === 4"
    >
      <section class="classify-left">
        <Sidebar v-model="goodState.activeMainClassifyIndex">
          <SidebarItem
            v-for="(item, index) in goodState.classify || []"
            :key="item.id"
            :title="item.name"
            @click="handlerChangeClassify($event, item.id)"
          ></SidebarItem>
        </Sidebar>
      </section>
      <section class="classify-right">
        <div class="classify-childs">
          <Tabs
            class="classify-childs"
            :ellipsis="false"
            @click-tab="handlerChangeclassifyChilds($event)"
            title-active-color="#404040"
            color="#404040"
          >
            <Tab :title="$t('全部')" :name="goodState.classifyId"></Tab>
            <Tab
              v-for="(item, index) in goodState.classifyChilds"
              :name="item.id"
              :key="index"
              :title="item.name"
            ></Tab>
          </Tabs>
        </div>
        <div class="goods-box" ref="goodsBox">
          <ul v-show="goodState.goods.length > 0" class="good">
            <li v-for="item in goodState.goods" :key="item.id">
              <nuxt-link
                :to="`/goods/detail/${item.id}?goodsId=${item.id}`"
                class="img-box"
              >
                <img :src="item.image" alt="" />
              </nuxt-link>
              <div class="good-info">
                <nuxt-link :to="`/goods/detail/${item.id}?goodsId=${item.id}`">
                  <p class="name">{{ item.name }}</p>
                  <p class="brief">{{ item.brief }}</p>
                </nuxt-link>
                <div class="price-box">
                  <p style="font-weight: bold">NT${{ item.price }}</p>
                  <div class="join-cart" @click="handleSelectSpec(item.id)">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill="url(#paint0_linear_56_1457)"
                      />
                      <path
                        d="M5.34082 5.5H6.44979L6.92506 7.61613M6.92506 7.61613L8.24124 13.4764C8.39794 14.1741 9.01745 14.6699 9.73254 14.6699H15.5241C16.2392 14.6699 16.8587 14.1741 17.0154 13.4764L17.9131 9.47953C18.1276 8.52409 17.401 7.61613 16.4217 7.61613H6.92506Z"
                        stroke="white"
                        stroke-width="1.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.5 18.5615C10.0523 18.5615 10.5 18.1138 10.5 17.5615C10.5 17.0092 10.0523 16.5615 9.5 16.5615C8.94772 16.5615 8.5 17.0092 8.5 17.5615C8.5 18.1138 8.94772 18.5615 9.5 18.5615Z"
                        fill="white"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.5 18.5615C16.0523 18.5615 16.5 18.1138 16.5 17.5615C16.5 17.0092 16.0523 16.5615 15.5 16.5615C14.9477 16.5615 14.5 17.0092 14.5 17.5615C14.5 18.1138 14.9477 18.5615 15.5 18.5615Z"
                        fill="white"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_56_1457"
                          x1="22"
                          y1="21.5"
                          x2="-2.39522e-07"
                          y2="2.45092e-07"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop />
                          <stop offset="1" stop-color="#868686" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <CoreshopNoData v-show="goodState.goods.length == 0" />
          <p
            class="no-more"
            v-if="goodState.goods.length > 0 && !goodState.haveData"
          >
            {{ $t("没有更多了") }}
          </p>
        </div>
        <CoreshopLoading v-if="goodState.isLoading" />
      </section>
      <section class="classify-bottom">
        <div>
          <!-- <span class="num">{{ goodState.cartNums }}</span> -->
          <!-- <img src="/images/cart.png" alt="" /> -->
          <p>商品數量 {{ goodState.cartNums }}</p>
          <p>NT${{ goodState.cartMoney }}</p>
        </div>
        <div>
          <a
            href="JavaScript:;"
            @click="handleGoCart"
            :class="{ on: goodState.cartNums > 0 }"
            >{{ $t("去结算") }}</a
          >
        </div>
      </section>

      <!-- 商品规格弹框 -->
      <teleport to=".layout-page">
        <CoreshopGoodDetailProductSku
          :show="goodState.showSku"
          :goodDetail="goodState.goodDetail"
          :chooseSku="goodState.chooseSku"
          @handleShowSku="handleShowSku"
          @handleChangeGoodSku="handleChangeGoodSku"
          @handleChangeGoodNum="handleChangeGoodNum"
        >
          <template #button>
            <div
              class="cs-m-t-20 cs-display-flex cs-text-align-center cs-justify-content-space-between cs-percent-w-100"
            >
              <CoreshopButton
                class="cs-percent-w-48"
                @click="handleAddCart($event)"
                bgColor="#404040"
                round
                size="medium"
              >
                <CoreshopLanguage :text="$t('加入购物车')" />
              </CoreshopButton>
              <CoreshopButton
                class="cs-percent-w-48"
                bg-color="#e84f5d"
                @click="handleBuyNow($event)"
                round
                size="medium"
              >
                <CoreshopLanguage :text="$t('立即购买')" />
              </CoreshopButton>
            </div>
          </template>
        </CoreshopGoodDetailProductSku>
      </teleport>
    </section>
  </div>
</template>

<script setup lang="ts">
import { queryAllCategories } from "@/composables/categoryService"
import { queryGetGoodsPageList } from "@/composables/productService"
import type { Result } from "@/model/result"
import { Category } from "@/model/category"
import { ProductData, ProductQuery, ProductQueryWhere } from "@/model/product"
import { OrderModeEnum } from "@/enum"
import { queryCartNumAndMoney } from "@/composables/cartService"
import { Product, SkuItem } from "@/model/product"
import { Brand } from "@/model/brand"
import { useAccountStore, useCartStore, usePageConfig } from "@/store"
import {
  queryGoodsDetailByToken,
  queryProductDetial,
} from "@/composables/productService"
import * as cartService from "@/composables/cartService"
import { OrderTypeEnum, OrderBuyProductModeEnum } from "@/enum"
import { useConfigStore } from "@/store"
import { coreShopAuthCookie } from "@/consts"
import {
  showToast,
  showSuccessToast,
  PullRefresh,
  Icon,
  Tab,
  Tabs,
  Sidebar,
  SidebarItem,
} from "vant"

export interface IselectTab {
  title: string
  value: string
  select: boolean
}

let page: number = 1

const goodsBox = ref<any>(null)
let disableWatchEffectQuery: boolean = false
const configStore = useConfigStore()
const route = useRoute()
const goodState = reactive<{
  classify: Array<Category>
  classifyId?: number
  classifyChilds: Array<any> | undefined
  classifyChildsId?: number | null
  goods: Array<{ [key: string]: any }>
  limit: number
  totalPages: number
  order?: string | null
  orderField: string | null //商品排序字段
  orderMode?: OrderModeEnum
  searchName?: string | null
  id?: number | null
  brands: Array<Brand>
  brandId: Array<string>
  btnTab: number
  features: boolean
  haveData: boolean
  isLoading: boolean
  cartNums: number
  cartMoney: number
  showSku: boolean
  chooseSku?: SkuItem
  goodDetail: Product
  nums: number
  title: string
  pullRefresh: boolean
  activeMainClassifyIndex: number
}>({
  classify: [],
  classifyId: undefined,
  classifyChilds: [],
  classifyChildsId: 0,
  goods: [],
  limit: 20,
  totalPages: 0,
  order: null,
  orderField: null,
  orderMode: OrderModeEnum.desc,
  searchName: null,
  id: Number(route.query.id),
  brands: [],
  brandId: [],
  btnTab: 1,
  features: false,
  haveData: true,
  isLoading: true,
  cartNums: 0,
  cartMoney: 0,
  showSku: false,
  chooseSku: {},
  goodDetail: {},
  nums: 1,
  title: "",
  pullRefresh: false,
  activeMainClassifyIndex: 0,
})

usePageConfig().set_show_back(false)
const cookie = useCookie(coreShopAuthCookie)
const cartStore = useCartStore()
/** 商品品牌 */
if (route.query.brandId) {
  goodState.brandId.push(route.query.brandId as string)
}

/** 查询分类 */
const queryCategories = async () => {
  const categories: Result<Array<Category>> = await queryAllCategories()
  goodState.isLoading = false
  if (!Array.isArray(categories?.data) || categories?.data?.length === 0) {
    return
  }

  const { child, id, name } = categories.data[0]
  goodState.classify = categories.data
  goodState.classifyChilds = child
  goodState.classifyId = id
  goodState.classifyChildsId = id
  goodState.title = name
}

try {
  /** 查询分类 */
  await queryCategories()
} catch (ex) {}

/** 滑动查询 */
onMounted(async () => {
  if (configStore.getConfig.cateStyle === 4) {
    goodsBox.value.addEventListener(
      "scroll",
      throttle(() => {
        const scrollH: number =
          document.querySelector(".good")?.scrollHeight || 0 // 文档的完整高度
        const scrollT: number =
          document.querySelector(".goods-box")?.scrollTop || 0 // 当前滚动条的垂直偏移
        const screenH: number =
          (document.querySelector(".goods-box") as HTMLDivElement)
            ?.offsetHeight || 0 // 屏幕可视高度
        if (scrollH - scrollT - screenH < 60 && goodState.haveData) {
          page++
          disableWatchEffectQuery = true
          queryProduct()
        }
      }, 500)
    )
  }
})

const queryProduct = async () => {
  goodState.isLoading = true
  let _params: ProductQuery = {
    page: page,
    limit: goodState.limit,
  }
  let where: ProductQueryWhere = {}
  // 大分类
  if (goodState.classifyId) {
    where.catId = goodState.classifyId
  }
  // 小分类
  if (goodState.classifyChildsId) {
    where.catId = goodState.classifyChildsId
  }
  if (goodState.searchName) {
    where.searchName = goodState.searchName
  }
  if (goodState.orderField) {
    _params.order = `${goodState.orderField} ${goodState.orderMode}`
  }
  if (goodState.brandId.length > 0) {
    where.brandId = goodState.brandId.join(",")
  }
  if (Object.keys(where).length) {
    _params.where = JSON.stringify(where)
  }

  const productResult: Result<ProductData> = await queryGetGoodsPageList(
    _params
  )
  goodState.totalPages =
    (((productResult?.data?.totalPages || 0) as number) <= 1
      ? 0
      : productResult?.data?.totalPages) || 0

  if (
    Array.isArray(productResult?.data?.list) &&
    productResult.data?.list?.length > 0
  ) {
    goodState.goods = goodState.goods.concat(productResult.data?.list || [])
  } else {
    goodState.haveData = false
  }
  goodState.isLoading = false
}

/** 获取购物车数量和商品总价格 */
const queryCartMoney = async () => {
  const result: Result<any> = await queryCartNumAndMoney()
  goodState.cartNums = result?.data?.count
  goodState.cartMoney = result?.data?.money
  cartStore.setCartProductTotalByNumber(goodState.cartNums)
}

watchEffect(() => {
  if (disableWatchEffectQuery) {
    return
  }

  page = 1
  goodState.goods = []
  goodState.haveData = true
  goodState.isLoading = false

  if (configStore.getConfig.cateStyle === 4) {
    if (cookie.value && Object.keys(cookie.value).length) {
      queryCartMoney()
    }

    queryProduct()
    goodState.isLoading = false
  }
})

/** 下拉刷新 */
const onPullRefresh = async () => {
  page = 1
  goodState.goods = []
  goodState.haveData = true
  goodState.isLoading = false

  /** 查询分类 */
  await queryCategories()
  if (configStore.getConfig.cateStyle === 4) {
    if (cookie.value && Object.keys(cookie.value).length) {
      await queryCartMoney()
    }

    await queryProduct()
    goodState.isLoading = false
  }

  goodState.pullRefresh = false
}

/** 切换大分类查询 */
const handlerChangeClassify = (index: number, classifyId: number) => {
  goodState.activeMainClassifyIndex = index
  disableWatchEffectQuery = true
  if (goodState.classifyId != classifyId) {
    page = 1
    goodState.goods = []
    goodState.haveData = true
    goodState.isLoading = false
    goodState.classifyId = classifyId
    const classify = goodState.classify.filter(
      (item: Category) => item.id === classifyId
    )[0]
    goodState.classifyChilds = classify.child
    goodState.classifyChildsId = classifyId
    queryProduct()
  }
}

/** 切换小分类查询 */
const handlerChangeclassifyChilds = (event: { name: number }) => {
  if (goodState.classifyChildsId != event.name) {
    page = 1
    goodState.goods = []
    goodState.haveData = true
    goodState.isLoading = false
    goodState.classifyChildsId = event.name
    queryProduct()
  }
}

/** 添加购物车*/
const handleAddCart = async (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  const buyResult: Result<number> = await cartService.cartAddCart({
    nums: goodState.nums || 1,
    productId: goodState.chooseSku?._id || "",
    type: OrderBuyProductModeEnum.addCart, // 1 加入购物车  2购买
    cartType: OrderTypeEnum.common,
  })

  if (!buyResult.status || !buyResult.data) {
    showToast(buyResult.msg as string)
    return
  }
  showSuccessToast("加入购物车")
  queryCartMoney()
  handleShowSku()
}

/** 立即购买*/
const handleBuyNow = async (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  const buyResult: Result<number> = await cartService.cartAddCart({
    nums: goodState.nums || 1,
    productId: goodState.chooseSku?._id || "",
    type: OrderBuyProductModeEnum.buyNow, // 1 加入购物车  2购买
    cartType: OrderTypeEnum.common,
    objectId: 0,
  })

  if (!buyResult.status || !buyResult.data) {
    showToast(buyResult.msg as string)
    return
  }
  navigateTo(
    `/order/submit?orderType=${OrderTypeEnum.common}&cartIds=${buyResult.data}`
  )
}

/** 选规格 查询商品详情*/
const handleSelectSpec = async (id: number) => {
  let goodDetialResult: Result<Product> = { data: [], msg: "", status: false }
  const _params = {
    id: id,
    data: true,
  }
  if (useAccountStore().getToken) {
    goodDetialResult = await queryGoodsDetailByToken(_params)
  } else {
    goodDetialResult = await queryProductDetial(_params)
  }
  goodState.goodDetail = goodDetialResult?.data
  goodState.chooseSku =
    goodDetialResult?.data.skuList?.sku_list?.find(
      (x) => parseFloat(x._id as string) === goodDetialResult?.data.product?.id
    ) || {}
  goodState.showSku = true
}

const handleChangeGoodNum = (num: number) => {
  goodState.nums = num
}

const handleChangeGoodSku = (sku: SkuItem) => {
  goodState.chooseSku = sku
}

const handleShowSku = () => {
  goodState.showSku = !goodState.showSku
}

const handleGoCart = () => {
  if (goodState.cartNums > 0) {
    navigateTo(`/cart?select=all`)
  }
}

const handlerChangeClassifyTypeThree = (index: number, classifyId: number) => {
  goodState.activeMainClassifyIndex = index
  if (goodState.classifyId != classifyId) {
    goodState.classifyId = classifyId
    const data = goodState.classify.filter(
      (item: any) => item.id == classifyId
    )[0]
    goodState.title = data.name
    goodState.classifyChilds = data.child || []
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/color.scss";
@import "./index.scss";
</style>
