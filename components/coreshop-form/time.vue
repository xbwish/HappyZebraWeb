<template>
  <div class="cs-background-color-white cs-p-10">
    <div class="title">
      <div>{{ props.data.name }}：</div>
      <div v-if="props.data.required">
        <Tag type="primary">{{$t('必选')}}</Tag>
      </div>
    </div>
    <div class="goods-box">
      <div @click="textState.show = true" :class="['empty', { value: !!textState.displayValue }]">
        {{ textState.displayValue ? textState.displayValue : $t("请选择时间") }}
      </div>
    </div>
  </div>
  <Popup v-model:show="textState.show" position="bottom">
    <TimePicker v-model="textState.value" @confirm="handleConfirm" :columns-type="columnsType"></TimePicker>
  </Popup>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { Tag, TimePicker, TimePickerColumnType, Popup } from "vant";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {
    data: () => {},
  }
);
let emits = defineEmits(["handleConfirm"]);

const columnsType: Array<TimePickerColumnType> = ["hour", "minute", "second"];
const textState: UnwrapRef<{
  value?: Array<string>;
  show: boolean;
  displayValue?: string;
}> = reactive({
  value: [],
  show: false,
  displayValue: undefined,
});

watch(
  () => props.data?.defaultValue,
  () => {
    textState.value = props.data.defaultValue.split(",");
    textState.displayValue = props.data.defaultValue.split(",")?.join(":");
    emits("handleConfirm", {
      key: props.data.id,
      value: textState.displayValue,
    });
  }
);

const handleConfirm = (event: { selectedValues: Array<string> }) => {
  textState.displayValue = event.selectedValues.join(":");
  textState.show = false;
  textState.value = event.selectedValues;
  emits("handleConfirm", {
    key: props.data.id,
    value: textState.displayValue,
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
