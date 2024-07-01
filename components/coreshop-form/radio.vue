<template>
  <div class="cs-background-color-white cs-p-10">
    <div class="title">
      <div>{{ props.data.name }}：</div>
      <div v-if="props.data.required">
        <Tag type="primary">{{ $t("必选") }}</Tag>
      </div>
    </div>
    <div class="goods-box">
      <RadioGroup
        v-model="checkboxState.value"
        direction="horizontal"
        @change="handleChange()"
      >
        <Radio v-for="(item, index) in props.data.radioValue" :name="item">{{
          item
        }}</Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { Tag, RadioGroup, Radio } from "vant"

const checkboxState: UnwrapRef<{
  value: any
}> = reactive({
  value: "",
})
let emits = defineEmits(["handleConfirm"])

const props = withDefaults(
  defineProps<{
    data: any
  }>(),
  {
    data: () => {},
  }
)

const handleChange = () => {
  emits("handleConfirm", {
    key: props.data.id,
    value: checkboxState.value,
  })
}
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.35rem;
}

.goods-box {
  margin: 0.2rem 0;
  font-size: 0.4rem;
}
</style>
