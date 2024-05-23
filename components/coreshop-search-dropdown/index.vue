<template>
  <div class="layout-seach">
    <DropdownMenu active-color="#D33123">
      <DropdownItem
        :title="$t('综合')"
        v-model="searchState.synthesizeSort"
        :options="synthesizeSortOptions"
        @change="onChangeSort($event)"
      />
      <DropdownItem
        :title="$t('价格')"
        v-model="searchState.priceSort"
        :options="priceSortOptions"
        @change="onChangeSort($event)"
      />
      <DropdownItem
        :title="$t('销量')"
        v-model="searchState.saleCountSort"
        :options="saleCountSortOptions"
        @change="onChangeSort($event)"
      />
      <DropdownItem :title="$t('其它')" ref="otherFilter">
        <div class="price-brand">
          <div class="price-box">
            <p class="title">{{$t("价格区间")}}</p>
            <div class="price">
              <Field :border="false" v-model="searchState.priceFrom" type="number" :placeholder="$t('最低价')"> </Field>
              <div class="line">——</div>
              <Field :border="false" v-model="searchState.priceTo"  input-align="right" type="number" :placeholder="$t('最高价')"> </Field>
            </div>
          </div>
          <div class="brand-box">
            <p class="title">{{$t("品牌")}}</p>
            <div class="brand">
              <ul>
                <li
                  v-for="brand in searchState.brands"
                  :key="brand.id"
                  :class="{ active: brand.id === searchState.brandId }"
                  @click="handleSelectBrand((brand.id!))"
                >
                  {{ brand.name }}
                </li>
              </ul>
            </div>
          </div>
          <div class="btn-box">
            <div @click="handleClose">{{$t("取消")}}</div>
            <div @click="handleOk">{{$t("确定")}}</div>
          </div>
        </div>
      </DropdownItem>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { queryBrandList } from "@/composables/brandService";
import { Result } from "@/model/result";
import { Brand } from "@/model/brand";
import { DropdownMenu, DropdownItem, Field } from "vant";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
interface IOption {
  text: string;
  value: string;
}

// 综合排序
const synthesizeSortOptions: Array<IOption> = [
  { text: coreShopLang("顺序"), value: "asc" },
  { text: coreShopLang("倒序"), value: "desc" },
];

// 价格排序
const priceSortOptions: Array<IOption> = [
  { text: coreShopLang("从小到大"), value: "asc" },
  { text: coreShopLang("从大到小"), value: "desc" },
];

//销量
const saleCountSortOptions: Array<IOption> = [
  { text: coreShopLang("从小到大"), value: "asc" },
  { text: coreShopLang("从大到小"), value: "desc" },
];

const emits = defineEmits<{ (e: "handleSearch", params?: any): void }>();

const otherFilter= ref();

const searchState: UnwrapRef<{
  brands: Array<Brand>;
  priceFrom?: number;
  priceTo?: number;
  brandId?: number;
  synthesizeSort: string; // 综合
  priceSort: string;
  saleCountSort: string;
  data: {
    order: string;
    where: string;
  };
}> = reactive({
  brands: [],
  priceFrom: undefined,
  priceTo: undefined,
  synthesizeSort: "asc",
  priceSort: "",
  saleCountSort: "",
  brandId: undefined,
  data: {
    order: "",
    where: "",
  },
});

// 查询品牌
const queryBrand = async () => {
  const brandResult: Result<Array<Brand>> = await queryBrandList();
  searchState.brands = brandResult.data || [];
};
queryBrand();

const emitSearchParams=()=>{
    searchState.data.where = JSON.stringify({
    searchName: useRoute().query.key,
    priceTo: searchState.priceTo,
    priceFrom: searchState.priceFrom,
    brandId: searchState.brandId,
  });
  emits("handleSearch", searchState.data);
}

// 关闭
const handleClose = () => {
    searchState.brandId = undefined;
    searchState.priceFrom = undefined;
    searchState.priceTo = undefined; 
    emitSearchParams();
    otherFilter.value?.toggle();
};

// 品牌选择
const handleSelectBrand = (id: number) => {
  if (searchState.brandId != id) {
    searchState.brandId = id;
  } else {
    searchState.brandId = undefined;
  }
};

// 确定搜索
const handleOk = () => {
  emitSearchParams();
  otherFilter.value?.toggle();
};

const queryProduct = () => {
  searchState.data.order = `sort ${searchState.synthesizeSort}`;
  emitSearchParams();
};

const onChangeSort = (value: string) => {
  const { synthesizeSort, priceSort, saleCountSort } = searchState;
  let order: Array<string> = [];
  if (synthesizeSort) {
    order.push(`sort ${synthesizeSort}`);
  }

  if (priceSort) {
    order.push(`price ${priceSort}`);
  }

  if (saleCountSort) {
    order.push(`buyCount ${saleCountSort}`);
  }

  searchState.data.order = order.join(",");
  emitSearchParams();
};


queryProduct();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
