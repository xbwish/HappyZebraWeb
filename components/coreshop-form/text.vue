<template>
  <div class="cs-background-color-white cs-p-10">
    <div class="title">
      <div>{{ props.data.name }}：</div>
      <div v-if="props.data.required">
        <Tag type="primary">{{ $t("必选") }}</Tag>
      </div>
    </div>
    <div class="goods-box">
      <Field
        v-model="textState.value"
        :placeholder="$t('请输入') + props.data.name"
        @update:model-value="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { Tag, Field } from "vant"

const props = withDefaults(
  defineProps<{
    data: any
  }>(),
  {
    data: () => {},
  }
)
let emits = defineEmits(["handleConfirm"])

const textState: UnwrapRef<{
  value: string
}> = reactive({
  value: props.data.defaultValue,
})

const handleChange = () => {
  emits("handleConfirm", {
    key: props.data.id,
    value: textState.value,
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
  .van-field {
    padding: 0;
  }
}
</style>
