<template>
  <div>
    <p
      class="edit-box cs-p-l-12 cs-min-width-200 cs-cursor-pointer cs-font-size-16"
      v-show="state.editInput"
      @click="handleClick"
    >
      {{ state.value }}
    </p>
    <section v-if="props.type === 'text'">
      <NInput
        ref="myInput"
        v-show="!state.editInput"
        :dataKey="props.dataKey"
        class="cs-font-size-16"
        :value="state.value"
        @blur="handleBlur"
        @update:value="handleChange"
      >
      </NInput>
    </section>
    <section v-if="props.type === 'number'">
      <NInputNumber
        ref="myInput"
        v-show="!state.editInput"
        :dataKey="props.dataKey"
        class="cs-font-size-16"
        :value="state.value"
        @blur="handleBlur"
        @update:value="handleChange"
      >
      </NInputNumber>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { NInput, NInputNumber } from "naive-ui"
// 元素节点
const myInput = ref(null)

const state: UnwrapRef<{
  editInput: Boolean
  value: any
}> = reactive({
  editInput: true,
  value: "",
})

const props = withDefaults(
  defineProps<{
    value: any
    type?: string
    dataKey?: string
  }>(),
  {
    value: "",
    type: "text",
    dataKey: "",
  }
)
state.value = props.value

const handleClick = () => {
  state.editInput = !state.editInput
  setTimeout(() => {
    myInput.value.focus()
  }, 500)
}
const handleBlur = () => {
  state.editInput = !state.editInput
}

const emits = defineEmits<{ (e: "handleEidt", params: any): void }>()

const handleChange = (value) => {
  state.value = value
  let data = {
    key: props.dataKey,
    value: value,
  }
  emits("handleEidt", data)
}
</script>
<style lang="scss" scoped>
.edit-box:hover {
  &::after {
    display: inline-block;
    content: "";
    background: url(/images/i-pen.png);
    width: 15px;
    height: 15px;
    background-size: contain;
    vertical-align: middle;
    margin-left: 3px;
  }
}
</style>
