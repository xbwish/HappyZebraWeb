<template>
  <div class="cs-background-color-white cs-p-10">
    <div class="title">
      <div>{{ props.data.name }}：</div>
      <div v-if="props.data.required">
        <Tag type="primary">{{ $t("必选") }}</Tag>
      </div>
    </div>
    <div class="goods-box">
      <div
        @click="textState.show = true"
        :class="['empty', { value: !!textState.value }]"
      >
        {{ textState.value ? textState.value : $t("请选择日期") }}
      </div>
      <Calendar
        v-model:show="textState.show"
        @confirm="onConfirm"
        color="#f56c6c"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { Tag, Calendar } from "vant"

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
  value?: string
  show: boolean
}> = reactive({
  value: undefined,
  show: false,
})

emits("handleConfirm", {
  key: props.data.id,
  value: textState.value,
})

const onConfirm = (date: Date) => {
  textState.show = false
  textState.value = `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(
    2,
    "0"
  )}-${`${date.getDate()}`.padStart(2, "0")}`
}

const handleConfirm = () => {
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
  .empty {
    color: #999999;
    font-size: 14px;
    padding: 5px 0;

    &.value {
      color: #333333;
    }
  }
}
</style>
