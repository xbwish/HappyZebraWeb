<template>
  <div class="address-container">
    <coreshop-title :title="$t('地址管理')"></coreshop-title>
    <section>
      <ul
        class="cs-display-flex address-box cs-flex-wrap cs-percent-w-95"
        v-if="addressData.list.length > 0"
      >
        <li
          class="cs-m-b-10"
          v-for="(item, index) in addressData.list"
          :key="index"
        >
          <SwipeCell :before-close="onBeforeClose" :name="item.id!">
            <div class="address-main-item">
              <coreshop-address
                class="address-info"
                :name="item.name"
                :default="item.isDefault"
                :phone="item.mobile"
                :address="item.address"
                :areaName="item.areaName"
              >
              </coreshop-address>
              <div class="edit-address" @click="handleEditAddress(item.id!)">
                <Icon name="arrow" size="16" />
              </div>
            </div>
            <template #right>
              <div class="actions">
                <div class="set-default" @click="onSetDefaultAddress(item.id!)">
                  {{ $t("设为默认") }}
                </div>
                <div class="delete" @click="onDeleteAddress(item.id!)">
                  {{ $t("删除") }}
                </div>
              </div>
            </template>
          </SwipeCell>
        </li>
      </ul>
      <CoreshopNoData v-else :text="$t('暂无地址信息')" />
    </section>

    <div class="add-address">
      <CoreshopButton
        @click="onAddAddressModalShow()"
        round
        class="cs-percent-w-100"
        bg-color="#D33123"
        :text="$t('新增收货地址')"
        size="medium"
      />
    </div>

    <CoreshopAddressAdd
      :show="modalState.showModal"
      :name="modalState.name"
      :phone="modalState.phone"
      :detailedAddress="modalState.detailedAddress"
      :areaId="modalState.areaId"
      :isDefault="modalState.isDefault"
      :addressId="addressData.addressId"
      :title="$t(addressData.title)"
      :areaName="modalState.areaName"
      @handleModalCancel="handleAddressAddModalCancel"
      @handleModalOk="handleAddressAddModalOk"
    />
    <CoreshopLoading v-if="addressData.loading" />
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import {
  queryUserShip,
  setDefaultShip,
  queryRemoveShip,
  queryShipDetail,
} from "@/composables/address"
import type { Result } from "@/model/result"
import { Address } from "@/model/address"
import {
  SwipeCell,
  showToast,
  showSuccessToast,
  showConfirmDialog,
  Icon,
} from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
const addressData: UnwrapRef<{
  list: Array<Address>
  showModalRef: boolean
  addressId: number
  title: string
  loading: boolean
}> = reactive({
  list: [],
  showModalRef: false,
  addressId: 0,
  title: coreShopLang("新增收货地址"),
  loading: false,
})

const modalState = reactive<{
  showModal: boolean
  name?: string
  phone?: string
  detailedAddress?: string
  isDefault?: boolean
  areaId?: number
  areaName?: string
}>({
  showModal: false,
  name: undefined,
  phone: undefined,
  detailedAddress: undefined,
  isDefault: false,
  areaId: undefined,
  areaName: "",
})

// 查询地址列表
const queryShip = async () => {
  addressData.loading = true
  const userShip: Result<Array<Address>> = await queryUserShip()
  addressData.list = userShip.data as Array<Address>
  addressData.loading = false
}
queryShip()

const onAddAddressModalShow = () => {
  addressData.title = coreShopLang("新增收货地址")
  modalState.showModal = !modalState.showModal
  modalState.areaId = undefined
  addressData.addressId = 0
  modalState.areaName = ""
}

const onSetDefaultAddress = async (id: number) => {
  const res: Result = await setDefaultShip({ id })
  if (!res.status) {
    showToast(res.msg as string)
    return
  }
  showSuccessToast(coreShopLang("设置成功"))
  queryShip()
}

// 编辑地址
const handleEditAddress = async (id: number) => {
  addressData.title = coreShopLang("编辑收货地址")
  addressData.addressId = id
  modalState.showModal = true

  const data: Result<Address> = await queryShipDetail({ id })
  modalState.name = data.data.name
  modalState.areaName = data.data.areaName
  modalState.phone = data.data.mobile
  modalState.detailedAddress = data.data.address || "" + data.data.street
  modalState.isDefault = data.data.isDefault
  modalState.areaId = data.data.areaId
}

// 删除地址
const onDeleteAddress = (id: number) => {
  showConfirmDialog({
    confirmButtonColor: "#D33123",
    title: coreShopLang("删除地址"),
    message: coreShopLang("删除地址后将不能恢复"),
    confirmButtonText: coreShopLang("确认"),
    cancelButtonText: coreShopLang("取消"),
  })
    .then(async () => {
      const removeRes: Result = await queryRemoveShip({ id })
      if (!removeRes.status) {
        showToast(removeRes.msg || coreShopLang("删除失败"))
        return
      }
      showSuccessToast(coreShopLang("删除成功"))
      queryShip()
    })
    .catch(() => {})
}

const handleModalCancel = () => {
  addressData.showModalRef = false
}

const handleAddressAddModalCancel = () => {
  modalState.showModal = false
  addressData.addressId = 0
  modalState.name = undefined
  modalState.phone = undefined
  modalState.detailedAddress = undefined
  modalState.areaId = undefined
  modalState.isDefault = false
}

const handleAddressAddModalOk = () => {
  queryShip()
  handleAddressAddModalCancel()
}

const onBeforeClose = (event: { name: number; position: string }): boolean => {
  return true
}
</script>

<style scoped lang="scss">
.address-container {
  padding: 0 0 1.5rem 0;
}
.add-address {
  position: absolute;
  left: 50%;
  // bottom: 0;
  transform: translateX(-50%);
  width: 9.4rem;
  padding: 0 0.3rem;
  z-index: 9;
  .n-button {
    height: 1.1rem;
  }
}
.address-box {
  margin: 10px auto;
  li {
    width: 9rem;
    position: relative;
    width: 100%;
    background: #ffffff;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    .address-main-item {
      height: 2.25rem;
      .address-info {
        box-sizing: border-box;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 4px 10px !important;
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
      .edit-address {
        width: 60px;
        text-align: center;
      }
    }
  }
}
:deep(.address) {
  margin-top: 4px !important;
}
.actions {
  display: flex;
  height: 100%;

  .set-default,
  .delete {
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .set-default {
    background-color: #f3f3f3;
  }

  .delete {
    background-color: #d33123;
    color: #ffffff;
    height: 100%;
    padding: 0 10px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
:deep(.van-empty) {
  background: #fff;
  border-radius: 8px;
  margin: 10px;
}
</style>
