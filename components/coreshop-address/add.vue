<template>
  <Popup
    v-model:show="props.show"
    :round="true"
    :safe-area-inset-bottom="true"
    position="bottom"
    @click-overlay="handleCancelClick"
    :z-index="99"
    :style="{ height: '80%' }"
    class="pop-up"
  >
    <div class="cs-p-20">
      <p class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-font-size-16 cs-m-b-15">
        <span>{{ props.title }}</span>
        <NIcon :size="25" class="close-icon" @click="handleCancelClick">
          <CoreshopIconClose />
        </NIcon>
      </p>

      <CellGroup>
        <Field :border="false" v-model="addressData.name" :label="$t('姓名')" :placeholder="$t('请输入姓名')"></Field>
        <Field :border="false" type="number" v-model="addressData.phone" :label="$t('手机号')" :placeholder="$t('请输入手机号')"></Field>
        <CoreshopCascaderAddress
          :areaName="addressData.areaName"
          :areaId="addressData.areaId"
          @handleChangeValue="handleChangeValue"
        >
        </CoreshopCascaderAddress>
        <Field :border="false" v-model="addressData.detailedAddress" :label="$t('详细地址')" :placeholder="$t('请输入详细地址')"></Field>
        <Field :border="false" :label="$t('是否默认')+'：'">
          <template #input>
            <RadioGroup v-model="addressData.isDefault" direction="horizontal">
              <Radio :name="true" checked-color="#D33123">{{$t('是')}}</Radio>
              <Radio :name="false" checked-color="#D33123">{{$t('否')}}</Radio>
            </RadioGroup>
          </template>
        </Field>
      </CellGroup>
      <div class="cs-display-flex cs-align-items-center cs-justify-content-space-between cs-m-t-20 addrsss-actions">
        <coreshop-button
          :text="$t('取消')"
          round
          @click="handleCancelClick"
          class="cs-flex-1 cancel"
          :size="btnSize.medium"
          bg-color="#404040"
        >
        </coreshop-button>
        <coreshop-button
          round
          :text="$t('确认')"
          @click="handleConfirmClick"
          class="cs-flex-1 cs-m-l-20 add"
          :size="btnSize.medium"
          bg-color="#D33123"
        >
        </coreshop-button>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import {  NIcon } from "naive-ui";
import { Result } from "@/model/result";
import { Address } from "@/model/address";
import { editShip, addUserShip } from "@/composables/address";
import { Popup, CellGroup, Field, RadioGroup, Radio, showToast, showSuccessToast } from "vant";
import { btnSize } from "@/enum";
import { mobileReg } from "@/consts";
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
export interface AddressType {
  show?: boolean;
  title?: string;
  addressId?: number;
  areaName?: string;
  name?: string;
  phone?: string;
  areaId?: number;
  detailedAddress?: string;
  isDefault?: boolean;
}

const props = withDefaults(defineProps<AddressType>(), {
  show: false,
  title: '新增收货地址',
  addressId: 0,
  name: "",
  phone: "",
  areaId: 0,
  detailedAddress: "",
  isDefault: false,
});

const addressData: UnwrapRef<AddressType> = reactive({
  name: "",
  phone: "",
  areaId: 0,
  detailedAddress: "",
  isDefault: false,
  areaName: "",
});

watch(
  () => props,
  (newVal, oldVal) => {
    addressData.name = newVal.name;
    addressData.phone = newVal.phone;
    addressData.detailedAddress = newVal.detailedAddress;
    addressData.isDefault = newVal.isDefault;
    addressData.areaId = newVal.areaId;
    addressData.areaName = newVal.areaName;
  },
  {
    deep: true,
    immediate: true,
  }
);

const handleChangeValue = (areaId: number,areaName:string) => {
  addressData.areaId = areaId;
  addressData.areaName = areaName;
};

const emits = defineEmits(["handleModalCancel", "handleModalOk"]);

const handleCancelClick = () => {
  emits("handleModalCancel");
};

// 确认添加地址
const handleConfirmClick = async () => {
  if (!addressData.name) {
    showToast(coreShopLang('请输入收货人姓名'));
    return;
  }

  if (!addressData.phone) {
    showToast(coreShopLang('请输入收货人手机号'));
    return;
  }
  /*if (!mobileReg.test(addressData.phone)) {
    showToast(coreShopLang("收货人手机号格式不正确"));
    return;
  }*/
  // if (!addressData.areaId) {
  //   showToast(coreShopLang("请选择省市区信息"));
  //   return;
  // }

  if (!addressData.detailedAddress) {
    showToast(coreShopLang("请输入详细地址"));
    return;
  }
  let data = {
    name: addressData.name,
    address: addressData.detailedAddress,
    mobile: addressData.phone,
    isDefault: addressData.isDefault ? 1 : 2,
    areaId: addressData.areaId,
    longitude: 0,
    latitude: 0,
    street: "",
  };
  if (props.addressId === 0) {
    // 添加
    const editShip: Result<Address> = await addUserShip(data);
    if (!editShip.status) {
      showToast(editShip.msg as string);
      return;
    }
    showSuccessToast(coreShopLang("新增成功"));
  } else {
    // 编辑
    const editShipRes: Result<Address> = await editShip({
      id: props.addressId,
      ...data,
    });

    if(!editShipRes.status){
        showToast(editShipRes.msg as string);
        return
    }
     showSuccessToast(coreShopLang("编辑成功"));
  }
  emits("handleModalOk");
};
</script>

<style lang="scss" scoped>
.addrsss-actions {
  position: fixed;
  bottom: 20px;
  width: 90%;
  .cancel,
  .add {
    flex: 1;
  }
}
</style>
