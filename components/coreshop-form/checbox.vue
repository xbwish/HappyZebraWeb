<template>
  <div class="cs-background-color-white cs-p-10">
    <div class="title">
      <div>{{ props.data.name }}：</div>
      <div v-if="props.data.required">
        <Tag type="primary">{{$t('必选')}}</Tag>
      </div>
    </div>
    <div class="goods-box">

      <CheckboxGroup v-model="checkboxState.value" direction="horizontal" @change="checkboxChange">
        <Checkbox name="a">复选框 a</Checkbox>
        <Checkbox name="b">复选框 b</Checkbox>
      </CheckboxGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { Tag, Checkbox, CheckboxGroup } from "vant";

const checkboxState: UnwrapRef<{
  value: Array<string>;
}> = reactive({
  value: [],
});

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {
    data: () => {},
  }
);

let emits = defineEmits(["handleConfirm"]);

const checkboxChange = () => {
  emits("handleConfirm", {
    key: props.data.id,
    value: checkboxState.value?.join(","),
  });
};
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
