<template>
  <div :class="[props.className, 'product-card product-card--hidden-actions']">
    <button
      class="product-card__quickview"
      type="button"
      @click="handleSelectSpec($event)"
    >
      <svg width="16px" height="16px">
        <use xlink:href="/images/sprite.svg#quickview-16"></use>
      </svg>
      <span class="fake-svg-icon"></span>
    </button>
    <div class="product-card__badges-list">
      <div
        v-if="props.detail.isRecommend"
        class="product-card__badge product-card__badge--new"
      >
        <CoreshopLanguage :text="$t('推荐')" />
      </div>
      <div
        v-if="props.detail.isHot"
        class="product-card__badge cs-background-color-red cs-color-white"
      >
        <CoreshopLanguage :text="$t('热门')" />
      </div>
    </div>
    <div class="product-card__image product-image">
      <div
        class="product-image__body cs-cursor-pointer"
        @click="handleProductClick"
      >
        <CoreshopImage
          class="product-image__img"
          :root="props.root"
          :radius="props.radius"
          :src="props.src"
          :lazy="props.lazy"
        >
        </CoreshopImage>
      </div>
    </div>
    <div
      class="product-card__info cs-cursor-pointer"
      @click="handleProductClick"
    >
      <div class="product-card__name">
        {{ props.title }}
      </div>
      <div class="product-card__brief">
        {{ props.brief }}
      </div>
      <slot name="time"></slot>
      <ul class="product-card__features-list">
        <li>
          <CoreshopLanguage :text="$t('访问量')" />：{{
            props.detail.viewCount
          }}
        </li>
        <li>
          <CoreshopLanguage :text="$t('已下单')" />：{{ props.detail.buyCount }}
          {{ props.detail.unit }}
        </li>
        <li>
          <CoreshopLanguage :text="$t('库存剩余')" />：{{ props.detail.stock }}
        </li>
        <li>
          <CoreshopLanguage :text="$t('赠送积分')" />：{{ props.detail.points }}
        </li>
        <li>
          <CoreshopLanguage :text="$t('积分可抵扣')" />：{{
            props.detail.pointsDeduction
          }}
        </li>
      </ul>
    </div>
    <div class="product-card__actions">
      <div class="product-card__prices" v-if="props.price != 0">
        {{ props.isPrice ? "NT$" : $t("积分") }}
        {{ props.price }}
        <span
          class="cs-font-size-12 cs-color-gray cs-text-decoration-line-through"
          v-if="props.activityPrice > props.price"
          >NT${{ props.activityPrice }}</span
        >
      </div>
      <div class="product-card__buttons">
        <button
          class="btn btn-primary product-card__addtocart"
          type="button"
          @click="handleProductClick"
        >
          {{ $t("查看详情") }}
        </button>
        <button
          class="btn btn-secondary product-card__addtocart product-card__addtocart--list"
          @click="handleProductClick"
          type="button"
        >
          {{ $t("查看详情") }}
        </button>
        <button
          class="btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist"
          type="button"
          @click="handleCollection"
        >
          <svg width="16px" height="16px">
            <use
              v-if="detailState.isFav"
              xlink:href="/images/sprite.svg#wishlist-16"
            ></use>
            <use v-else xlink:href="/images/sprite.svg#heart-20"></use>
          </svg>
          <span class="fake-svg-icon fake-svg-icon--wishlist-16"></span>
        </button>
      </div>
    </div>
  </div>
  <CoreshopModal
    :showModal="detailState.showModal"
    style="width: 1100px"
    @handleModalCancel="handleCancelClick"
  >
    <template #header>
      <div></div>
    </template>
    <CoreshopQuickview
      class="cs-p-t-30"
      :id="props.detail.id"
    ></CoreshopQuickview>
    <template #action>
      <div></div>
    </template>
  </CoreshopModal>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { Product } from "@/model/product"
import { queryGoodsCollection } from "@/composables/productService"
import type { Result } from "@/model/result"

const props = withDefaults(
  defineProps<{
    root: string // 图片懒加载的父级id
    src: string // 商品图片地址
    title?: string // 商品名字
    brief?: string
    titleSize?: number // 商品名字大小
    titleWidth?: number //商品名字宽度
    price?: number // 商品价格
    activityPrice?: number // 商品划线价格
    isHover?: boolean // 是否有hover效果
    isPrice?: boolean // price是否是价格,还有一种可能是显示积分
    line?: number // 商品名字默认显示行数
    radius?: string
    lazy?: boolean // 图片是否懒加载
    isFav?: boolean // 是否收藏
    className?: string
    detail?: Product
  }>(),
  {
    root: "",
    src: "",
    title: "",
    brief: "",
    titleSize: 14,
    titleWidth: 0,
    price: 199,
    activityPrice: 0,
    isHover: true,
    isPrice: true,
    line: 2,
    radius: "0px",
    lazy: true,
    isFav: false,
    className: "",
    detail: () => ({}),
  }
)

const detailState: UnwrapRef<{
  showModal: boolean
  isFav: boolean
}> = reactive({
  showModal: false,
  isFav: props.isFav,
})

let emit = defineEmits<{ (e: "handleClick"): void }>()

const handleProductClick = () => {
  emit("handleClick")
}

const handleSelectSpec = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  handleCancelClick()
}

const handleCancelClick = () => {
  detailState.showModal = !detailState.showModal
}

// 收藏
const handleCollection = async () => {
  const { message } = useCoreShopMessage()
  const goodsCollection: Result<any> = await queryGoodsCollection({
    id: props.detail.id,
  })
  message.success(goodsCollection.msg as string)
  detailState.isFav = !detailState.isFav
}
</script>
<style lang="scss" scoped></style>
