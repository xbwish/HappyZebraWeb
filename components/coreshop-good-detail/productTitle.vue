<template>
  <div class="product-info">
    <h3 class="cs-font-size-16">{{ props.goodDetail?.name || "" }}</h3>
    <div class="cs-font-size-14 cs-color-gray brief">
      {{ props.goodDetail?.brief || "" }}
    </div>
    <div class="product__tags tags" v-if="props.goodDetail?.brand || props.goodDetail?.labels">
      <div class="tags__list cs-p-t-5 cs-p-b-5">
        <n-tag type="warning" size="small" class="cs-m-r-5" v-if="props.goodDetail?.brand">
          {{ props.goodDetail?.brand?.name }}
        </n-tag>
        <template v-if="props.goodDetail?.labels">
          <n-tag v-for="item in props.goodDetail?.labels" :key="item.id" type="warning" size="small" class="cs-m-r-5">
            {{ item.name }}
          </n-tag>
        </template>
      </div>
    </div>
    <slot name="meta"></slot>
  </div>
</template>

<script setup lang="ts">
import { NTag } from "naive-ui";
import { UrlSharePageType, ShareType } from "@/enum";

const props = withDefaults(
  defineProps<{
    goodDetail: any;
    sharePageType?: number;
    shareType?: number;
    teamId?: number;
  }>(),
  {
    goodDetail: {},
    sharePageType: UrlSharePageType.goods,
    shareType: ShareType.url,
    teamId: 1,
  }
);
</script>
<style lang="scss" scoped>
.product-info {
  width: 9rem;
  margin: 0.2rem auto;
  padding: 0.3rem;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
}

.brief {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
