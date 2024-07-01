<template>
  <div
    class="store-list cs-background-color-white cs-cursor-pointer"
    id="storeList"
  >
    <ul>
      <li
        v-for="item in addressState"
        :key="item.id"
        @click="handleChooseStore(item)"
      >
        <Checkbox v-model="item.checked" checked-color="#dc2828"></Checkbox>
        <div class="info-container">
          <div class="info">
            <Tag v-if="item.isDefault" color="#f56c6c" round>
              {{ $t("默认") }}
            </Tag>
            <div class="name">{{ item.name }} {{ item.mobile }}</div>
          </div>
          <div class="address">{{ item.areaName }} {{ item.address }}</div>
        </div>
      </li>
    </ul>
    <CoreshopLoading v-if="loading" />
  </div>
</template>

<script setup lang="ts">
import type { Result } from "@/model/result"
import { queryUserShip } from "@/composables/address"
import { Address } from "@/model/address"
import { Tag, Checkbox } from "vant"

interface AddressExt extends Address {
  checked?: boolean
}

const props = defineProps({
  addressId: {
    type: Number,
    default: null,
  },
})

const addressState = ref<Array<AddressExt>>([])
const loading = ref<boolean>(true)

const result: Result<Array<AddressExt>> = await queryUserShip({
  limit: 99999,
  page: 1,
})
addressState.value = result.data

if (props.addressId) {
  addressState.value = addressState.value.map((item) => ({
    ...item,
    checked: item.id === props.addressId,
  }))
}
loading.value = false

const emits = defineEmits(["onChooseAddress"])

const handleChooseStore = (address: Address) => {
  addressState.value = addressState.value.map((item) => ({
    ...item,
    checked: item.id === address.id,
  }))
  emits("onChooseAddress", address)
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.store-list {
  ul {
    li {
      margin-bottom: 10px;
      padding: 10px 0;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      .info-container {
        margin-left: 10px;
      }
      .info {
        display: flex;
        align-items: center;
        .name {
          font-size: 14px;
          font-weight: 600;
          color: #333333;
          line-height: 14px;
          margin-left: 10px;
        }
      }

      .address {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        line-height: 12px;
        margin-top: 10px;
      }
    }
  }
}
</style>
