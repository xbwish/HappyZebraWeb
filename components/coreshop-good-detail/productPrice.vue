<template>
  <div class="product-sidebar">
    <div
      class="price cs-color-red cs-display-flex cs-align-items-center cs-justify-content-space-between"
    >
      <div>
        NT${{ props.chooseSku?.price || 0 }}
        <span
          v-if="
            props.goodDetail?.mktprice > 0 &&
            props.chooseSku?.price != props.goodDetail?.mktprice
          "
          class="cs-font-size-12 cs-color-gray cs-text-decoration-line-through"
        >
          NT${{ props.goodDetail?.mktprice }}
        </span>
      </div>
      <slot name="countdown"></slot>
    </div>
    <slot name="point"></slot>
    <div
      class="form-group product__option"
      v-if="props.promotionList && props.promotionList.length > 0"
    >
      <label class="product__option-label">
        <CoreshopLanguage text="優惠" />
      </label>
      <div
        class="product__actions cs-display-flex cs-align-items-center cs-flex-1 cs-justify-content-space-between"
        @click="productDetailState.showSheet = true"
      >
        <div>
          <Tag
            plain
            round
            type="danger"
            class="cs-m-r-5 cs-m-b-5"
            v-for="(item, index) in props.promotionList"
            :key="index"
            >{{ item.name }}</Tag
          >
        </div>
        <Icon size="15" name="arrow" />
      </div>
    </div>
    <div
      class="form-group product__option"
      v-if="props.service && props.service.length > 0"
    >
      <label class="product__option-label">
        <CoreshopLanguage text="服務" />
      </label>
      <div class="product__actions">
        <Tag
          plain
          round
          type="primary"
          class="cs-m-r-5 cs-m-b-5"
          v-for="(item, index) in props.service"
          :key="index"
          >{{ item.title }}</Tag
        >
      </div>
    </div>
    <div
      class="form-group product__option"
      v-if="props.delivery && props.delivery.length > 0"
    >
      <label class="product__option-label">
        <CoreshopLanguage text="發貨" />
      </label>
      <div class="product__actions">
        <Tag
          plain
          round
          type="success"
          class="cs-m-r-5 cs-m-b-5"
          v-for="(item, index) in props.delivery"
          :key="index"
          >{{ item.description }}
        </Tag>
      </div>
    </div>
    <!-- .product__options -->
    <form
      class="product__options"
      v-if="
        props.chooseSku?.sku_name_arr &&
        props.chooseSku?.sku_name_arr?.length > 0
      "
    >
      <div class="form-group product__option" @click="handleShowSku">
        <label class="product__option-label">
          <CoreshopLanguage text="規格" />
        </label>
        <div
          class="cs-display-flex cs-align-items-center cs-flex-1 cs-justify-content-space-between"
        >
          <div class="input-radio-label__list">
            <label
              v-for="(item, index) in props.chooseSku?.sku_name_arr"
              :key="index"
            >
              <span class="cs-m-r-5">{{ item }}</span>
            </label>
          </div>
          <Icon size="15" name="arrow" />
        </div>
      </div>
      <div
        class="cs-display-flex cs-text-align-center cs-justify-content-space-between"
      >
        <slot name="button"></slot>
      </div>
    </form>
  </div>

  <ActionSheet
    v-model:show="productDetailState.showSheet"
    title="全平臺促銷優惠"
  >
    <div class="content">
      <div
        class="product-box"
        v-for="(item, index) in props.promotionList"
        :key="index"
      >
        <p class="cs-font-size-18">活動 {{ index + 1 }} : {{ item.name }}</p>

        <div
          v-if="item.conditions"
          class="cs-p-5 cs-m-t-10 cs-m-b-10 cs-border-solid"
        >
          <p>
            滿足條件：<span class="cs-color-red">要求同時滿足下麵所有條件</span>
          </p>
          <p
            v-for="(itemC, indexC) in item.conditions"
            :key="indexC"
            class="cs-p-l-22 cs-font-size-14"
          >
            條件{{ indexC + 1 }}：{{ itemC }}
          </p>
        </div>

        <div
          v-if="item.results"
          class="cs-p-5 cs-m-t-10 cs-m-b-10 cs-border-solid"
        >
          <p>
            活動結果：<span class="cs-color-red">{{ item.results[0] }}</span>
          </p>
        </div>

        <div>
          活動時間：{{ timeFormat(item.startTime) }} 至
          {{ timeFormat(item.endTime) }}
        </div>
      </div>
    </div>
  </ActionSheet>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { SkuItem } from "@/model/product"
import { Tag, Icon, ActionSheet } from "vant"
import { PromotionList } from "@/model/product"

const props = withDefaults(
  defineProps<{
    goodDetail: any
    chooseSku: SkuItem | null
    service: Array<any> | null
    delivery: Array<any> | null
    promotionList?: Array<PromotionList>
  }>(),
  {
    goodDetail: {},
    chooseSku: null,
    service: null,
    delivery: null,
    promotionList: () => [],
  }
)

const productDetailState: UnwrapRef<{
  chooseSku: SkuItem | null
  nums: number
  showSheet: boolean
}> = reactive({
  chooseSku: props.chooseSku,
  nums: 1,
  showSheet: false,
})

watch(
  () => props.chooseSku,
  (newVal, oldVal) => {
    productDetailState.chooseSku = newVal
  },
  {
    deep: true,
  }
)

let emits = defineEmits<{
  // 出现sku弹框
  (e: "handleShowSku"): void
}>()

const handleShowSku = () => {
  emits("handleShowSku")
}
</script>

<style lang="scss" scoped>
.product-box {
  box-shadow: 0 0 15px #dcdcdc;
  padding: 10px;
  border-radius: 10px;
  width: 90%;
  margin: 10px auto;
}
.product-sidebar {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;

  .price {
    font-size: 0.6rem;
    font-weight: bold;

    span {
      font-size: 0.35rem;
      font-weight: normal;
    }
  }
}

.product__option {
  display: flex;
  align-items: center;
  padding: 0.2rem 0;

  .product__option-label {
    min-width: 1rem;
  }
}
</style>
