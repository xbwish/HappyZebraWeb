<template>
  <div class="layout cs-box-shadow-gray">
   <template v-if=" props.coreshopData?.parameters?.column == 1 && props.coreshopData?.parameters?.display == 'list'">
     <CoreshopHomeGoodsList :coreshopData="props.coreshopData"></CoreshopHomeGoodsList>
   </template>

   <template v-if="props.coreshopData?.parameters?.column == 2 && props.coreshopData.parameters.display == 'list' || props.coreshopData?.parameters?.column == 3 && props.coreshopData.parameters.display == 'list'">
     <CoreshopHomeGoodsGrid :coreshopData="props.coreshopData"></CoreshopHomeGoodsGrid>
   </template>

   <template v-if="props.coreshopData?.parameters?.display == 'slide'">
     <CoreshopHomeGoodsCarousel :coreshopData="props.coreshopData"></CoreshopHomeGoodsCarousel>
   </template>
   
   
  </div>
</template>

<script setup lang="ts">
import { GoodConfig } from '@/model';
const props = withDefaults(defineProps<{ coreshopData?: GoodConfig }>(), {});
</script>

<style scoped lang="scss">
.cs-box-shadow-gray{
    margin: 10px;
}
</style>
