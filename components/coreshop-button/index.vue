<template>
  <n-button
    @click="handleClick($event)"
    type="tertiary"
    :bordered="false"
    :color="props.bgColor"
    :disabled="props.disabled"
    :size="props.size || btnSize.tiny"
    :round="round"
    :quaternary="props.quaternary"
  >
    <slot name="icon"></slot>
    <CoreshopLanguage :useLang="props.useLang" :text="props.text" />
    <slot name="default"></slot>
  </n-button>
</template>

<script setup lang="ts">
import { btnSize } from "@/enum";
import { NButton } from "naive-ui";
import { color } from "@/consts";
const props = withDefaults(
  defineProps<{
    text?: string;
    disabled?: boolean;
    useLang?: boolean;
    size?: btnSize;
    bgColor?: string;
    round?: boolean;
    quaternary?: boolean;
  }>(),
  {
    text: "",
    disabled: false,
    useLang: true,
    size: btnSize.tiny,
    bgColor: color.accentColor,
    round: true,
    quaternary: false,
  }
);

const emits = defineEmits<{ (e: "onClick", params?: any): void }>();

const handleClick = (event: Event) => {
  event.stopPropagation();
  event.preventDefault();
  emits("onClick");
};
</script>
<style lang="scss" scoped></style>
