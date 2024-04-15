<template>
  <div class="citySelect">
    <van-field
      v-model="addressState.fieldValue"
      is-link
      readonly
      :label="$t(props.label)"
      :placeholder="$t('请选择所在地区')"
      @click="addressState.showPopup = true"
    />
    <van-popup v-model:show="addressState.showPopup" round position="bottom">
      <van-cascader
        v-model="addressState.cascaderValue"
        :title="$t('请选择所在地区')"
        :options="addressState.cascaderOptions"
        @close="addressState.showPopup = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { queryAreas } from "@/composables/member";
import { Result } from "@/model/result";
import { Areas } from "@/model/member";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
let areaId: any = ref<number>();

const addressState: UnwrapRef<{
  cascaderOptions: Array<any>;
  showPopup: boolean;
  fieldValue: string | number;
  cascaderValue: number;
}> = reactive({
  cascaderOptions: [],
  showPopup: false,
  fieldValue: "",
  cascaderValue: 0,
});

let emits = defineEmits(["handleChangeValue"]);

const props = withDefaults(
  defineProps<{
    areaId?: number | null;
    areaName?: string | null;
    label?: string;
    size?: "small" | "medium" | "large";
  }>(),
  {
    areaId: null,
    areaName: null,
    size: "medium", // 'small' | 'medium' | 'large'
    label: "縣市區",
  }
);

watchEffect(() => {
  addressState.fieldValue = props.areaName || "";
  addressState.cascaderValue = Number(props.areaId) | 0;
});

const getAreas: Result<Array<Areas>> = await queryAreas();

const hanldeAreas = (data: any) => {
  return data.map((item: any) => {
    return {
      text: item.label,
      value: item.value,
      children: item.children?.length > 0 ? hanldeAreas(item.children) : null,
    };
  });
};
addressState.cascaderOptions = hanldeAreas(getAreas.data);

const onFinish = ({ selectedOptions }: any) => {
  areaId.value = addressState.cascaderValue;
  addressState.showPopup = false;
  console.log( addressState.fieldValue);

  addressState.fieldValue = selectedOptions.map((option: any) => option.text).join("/");
  emits("handleChangeValue", selectedOptions[1].value, addressState.fieldValue);
};
</script>
<style lang="scss" scoped>
.citySelect {
  border-radius: 5px;
}

:deep(.van-icon-arrow:before) {
  content: none;
}
:deep(.van-cascader__option--selected){
  color: #D33123;
}
:deep(.van-tabs__line){
  background-color: #D33123;
}
</style>
