<template>
  <div class="address-item">
    <div
      class="cs-display-flex cs-font-size-14 cs-cursor-pointer cs-justify-content-space-between cs-align-items-center"
    >
      <div>
        <span class="name">{{ props.name }}</span>
        <span class="phone">{{ props.phone }}</span>
      </div>
    </div>
    <p class="address">{{ props.areaName }}{{ props.address }}</p>
    <p class="default-box">
      <Tag class="default" v-if="props.default" color="#D33123" round>
        {{ $t("默认") }}
      </Tag>
    </p>

    <slot name="default"></slot>
  </div>
</template>

<script setup lang="ts">
import { Tag } from "vant";

const props = withDefaults(
  defineProps<{
    name: string;
    default: boolean;
    phone: number | string | null;
    address: string;
    areaName?: string | null;
  }>(),
  {
    name: "",
    default: false,
    phone: null,
    address: "",
    areaName: null,
  }
);

let emits = defineEmits<{ (e: "handleClick"): void }>();

const handleClick = (item: boolean) => {
  if (!item) {
    emits("handleClick");
  }
};
</script>

<style lang="scss" scoped>
.address-item {
  padding: 10px;
}

.name,
.phone {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  line-height: 14px;
}
.phone {
  margin-left: 20px;
}

.address {
  font-weight: 400;
  line-height: 14px;
  margin-top: 10px;
  color: #6E737D;
  font-family: "PingFang HK";
  font-size: 11px;
}
.default-box {
  margin-top: 8px;
  .default {
    padding: 0px 0.1rem;
    border-radius: 0.1rem;
    color: #fff;
    font-family: "PingFang HK";
    font-size: 0.25rem;
  }
}
.no-default {
  background-color: #ffd333;
  font-size: 0.25rem;
  padding: 0.1rem 0.3rem;
  color: #fff;
  border-radius: 5px;
}
</style>
