<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('提货单核销')"></CoreshopTitle>
    <div class="search-box">
      <n-input
        round
        :placeholder="$t('请输入完整手机号订单号')"
        v-model:value="orderState.id"
      >
        <template #prefix>
          <n-icon :component="CoreshopIconSearch" />
        </template>
      </n-input>
      <div class="title" @click="handleSearch">{{ $t("搜索") }}</div>
    </div>
    <div class="merchant-list" v-if="orderState.list.length > 0">
      <ul>
        <template v-for="item in orderState.list" :key="item.id">
          <li v-if="item.orderItems && item.orderItems.length > 0">
            <div class="number">
              <p
                class="cs-font-weight-bold cs-display-flex cs-align-items-center"
              >
                {{ $t("提货码") }}：{{ item.id }}
                <span class="copy" @click="handleCopy(item.id)">{{
                  $t("复制")
                }}</span>
              </p>
              <p class="cs-color-yellow">{{ item.statusName }}</p>
            </div>
            <div
              class="goods"
              v-for="itemChild in item.orderItems"
              :key="itemChild.id"
            >
              <div>
                <img :src="itemChild.imageUrl" alt="" />
              </div>
              <div
                class="cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
              >
                <p class="name">{{ itemChild.name || "" }}</p>
                <p class="desc">{{ itemChild.addon || "" }}</p>
                <p class="price cs-color-red">
                  NT${{ itemChild.price }}
                  <span class="cs-m-l-5">x{{ itemChild.nums }}</span>
                </p>
                <p class="order-num">{{ $t("SN码") }}：{{ itemChild.sn }}</p>
                <p class="order-num">{{ $t("BN码") }}：{{ itemChild.bn }}</p>
              </div>
            </div>
            <div class="date">
              <div class="cs-color-gray cs-font-size-12">
                <p>
                  {{ $t("下单时间") }}：{{
                    timeFormat(item.createTime, "yyyy-mm-dd hh:MM:ss")
                  }}
                </p>
                <p>
                  {{ $t("提货时间") }}：{{
                    timeFormat(item.pickUpTime, "yyyy-mm-dd hh:MM:ss")
                  }}
                </p>
              </div>
              <NIcon
                v-if="!item.disabled"
                :size="30"
                class="cs-display-block"
                @click="handleSelect(item.id)"
              >
                <CoreshopIconCheckboxChecked24Regular v-if="item.checked" />
                <CoreshopIconCheckboxUnchecked24Regular v-else />
              </NIcon>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <CoreshopNoData
      v-if="orderState.list.length === 0"
      :text="$t('未查询到数据')"
    ></CoreshopNoData>

    <div class="code-box">
      <NIcon :size="22" class="cs-display-block">
        <CoreshopIconCode />
      </NIcon>
    </div>
    <div class="btn-box" v-if="orderState.list.length > 0">
      <CoreshopButton
        size="small"
        class="cs-percent-w-100"
        bg-color="#f0a020"
        v-if="orderState.checkedIds.length > 0"
        @click="handleConfirmWriteOff"
        >{{ $t("确认核销") }}</CoreshopButton
      >
      <CoreshopButton
        size="small"
        class="cs-percent-w-100"
        bg-color="#f0a020"
        v-else
        >{{ $t("请选择待核销订单") }}</CoreshopButton
      >
    </div>

    <CoreshopLoading v-if="orderState.isLoading" />

    <CoreshopModal
      :showModal="orderState.showModal"
      :content="$t('您确认提货核销吗')"
      @handleModalCancel="handleCancel"
      @handleModalOk="handleConfirm"
    >
    </CoreshopModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { NInput, NIcon } from "naive-ui"
import { getLadingInfo, ladingExec } from "@/composables/merchant"
import type { Result } from "@/model/result"
import CoreshopIconSearch from "@/components/coreshop-icon/search.vue"
import { showToast, showSuccessToast } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const orderState: UnwrapRef<{
  list: Array<any>
  haveData: boolean
  isLoading: boolean
  id: string
  checkedIds: Array<string>
  showModal: boolean
}> = reactive({
  list: [],
  haveData: true,
  isLoading: false,
  id: useRoute().query.id ? String(useRoute().query.id) : "",
  checkedIds: [],
  showModal: false,
})

const query = async () => {
  orderState.isLoading = true

  const getOrderList: Result<any> = await getLadingInfo({
    id: orderState.id,
  })

  if (getOrderList.status) {
    orderState.list =
      getOrderList?.data.map((item: any) => {
        if (item.status === true) {
          return {
            // 已提货
            checked: false,
            disabled: true,
            ...item,
          }
        } else {
          orderState.checkedIds.push(item.id)
          return {
            // 未提货
            checked: true,
            disabled: false,
            ...item,
          }
        }
      }) || []
  }

  orderState.isLoading = false
}
query()

// 复制
const handleCopy = (id: string) => {
  const aux = document.createElement("input")
  aux.setAttribute("value", id)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand("copy")
  document.body.removeChild(aux)
  showToast(coreShopLang("复制成功"))
}

// 搜索
const handleSearch = () => {
  if (!orderState.id) {
    showToast(coreShopLang("请输入完整手机号订单号"))
    return false
  }
  query()
}

// 选择框事件
const handleSelect = (id: string) => {
  const data = orderState.list.filter((item: any) => item.id === id)[0]
  if (data.checked) {
    orderState.checkedIds.splice(orderState.checkedIds.indexOf(data.id), 1)
  } else {
    orderState.checkedIds.push(data.id)
  }
  data.checked = !data.checked
}

// 确认核销
const handleConfirmWriteOff = () => {
  orderState.showModal = true
}

const handleCancel = () => {
  orderState.showModal = false
}
const handleConfirm = async () => {
  const ladingState: Result<any> = await ladingExec({
    id: orderState.checkedIds.join(","),
  })

  orderState.showModal = false
  if (ladingState.status) {
    showSuccessToast(ladingState.msg)
    orderState.list = []
    query()
  } else {
    showToast(ladingState.msg)
  }
}
</script>

<style scoped lang="scss">
.code-box {
  position: fixed;
  right: 0.5rem;
  bottom: 2rem;
  background-color: #fff;
  border-radius: 50%;
  padding: 0.3rem;
  box-shadow: 0 0 15px #dcdcdc;
  animation: code 2s infinite;
}

@keyframes code {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

.btn-box {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 9.4rem;
  padding: 0.3rem;
  background-color: #fff;
  box-shadow: 0 0 15px #dcdcdc;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 0.3rem;
  background-color: #fff;
  margin-bottom: 0.2rem;

  .title {
    width: 1.5rem;
    text-align: center;
    font-size: 0.35rem;
  }
}

.merchant-list {
  padding-bottom: 3rem;

  li {
    padding: 0.3rem;
    background-color: #fff;
    margin-bottom: 0.3rem;

    .number {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.35rem;

      .copy {
        margin-left: 0.3rem;
        font-size: 0.3rem;
        color: #fff;
        background-color: #5ac725;
        padding: 0.12rem 0.25rem;
        border-radius: 3px;
        line-height: 1;
        align-self: baseline;
      }
    }

    .goods {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0;

      div:nth-of-type(1) {
        img {
          width: 2rem;
          border-radius: 5px;
        }
      }

      div:nth-of-type(2) {
        width: 7.2rem;

        .name {
          font-size: 0.35rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .desc {
          font-size: 0.3rem;
          color: #909399;
        }

        .num {
          font-size: 0.3rem;
          color: #909399;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;

          span {
            margin-left: 0.1rem;
          }
        }

        .price {
          font-size: 0.35rem;

          span {
            color: #909399;
            font-size: 0.3rem;
          }
        }

        .order-num {
          font-size: 0.3rem;
          color: #fbbd08;
        }
      }
    }

    .date {
      font-size: 0.35rem;
      padding: 0.2rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  li:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
