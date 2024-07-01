<template>
  <div class="store-list cs-cursor-pointer" id="storeList">
    <ul v-if="storesState">
      <li
        :class="{ 'disable-choose': !props.choose }"
        v-for="item in storesState"
        :key="item.id"
        @click="handleChooseStore(item)"
      >
        <Checkbox
          v-if="props.choose"
          v-model="item.checked"
          checked-color="#dc2828"
        ></Checkbox>
        <div class="store-logo">
          <CoreshopImage
            :src="item.logoImage"
            :width="50"
            :height="50"
            class="cs-w-50 cs-h-50"
            root="#storeList"
          ></CoreshopImage>
        </div>
        <div class="store-info">
          <p class="cs-font-size-14">{{ item.storeName }}</p>
          <p class="cs-font-size-14">{{ item.mobile }}</p>
          <p class="cs-font-size-12 address">地址：{{ item.address }}</p>
        </div>
      </li>
    </ul>
    <CoreshopNoData v-else />
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue"
import { queryStoreList } from "@/composables/store"
import type { Result } from "@/model/result"
import { Store } from "@/model/store"
import { Checkbox } from "vant"

interface IStoreExt extends Store {
  checked?: boolean
}

const props = defineProps({
  storeId: {
    type: Number,
    default: undefined,
  },
  choose: {
    type: Boolean,
    default: true,
  },
})

const storesState = ref<Array<IStoreExt>>([])

let chooseStoreId: Ref<number | undefined> = ref<number>()
chooseStoreId.value = props.storeId

const storeResult: Result<Array<IStoreExt>> = await queryStoreList({
  limit: 99999,
  page: 1,
})
storesState.value = storeResult.data

if (props.storeId) {
  storesState.value = storesState.value.map((item) => ({
    ...item,
    checked: item.id === props.storeId,
  }))
}

const emits = defineEmits(["onChooseStore"])

const handleChooseStore = (store: Store) => {
  if (!props.choose) {
    return
  }
  chooseStoreId.value = store.id as number
  storesState.value = storesState.value.map((item) => ({
    ...item,
    checked: item.id === store.id,
  }))
  emits("onChooseStore", store)
}
</script>

<style lang="scss" scoped>
.store-list {
  padding: 10px 0;
  margin: 0 auto;
  ul {
    li {
      display: flex;
      border-radius: 5px;
      background-color: #fff;
      align-items: center;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
      padding: 10px 0;
      &.disable-choose {
        background: #ffffff;
        box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
        border-radius: 8px;
        margin: 10px;
      }
    }
  }
}

.store-info {
  flex: 1;
}

.store-logo {
  margin: 0 10px;
}
.address {
  font-size: 12px;
  line-height: 20px;
  color: #999999;
}
</style>
