<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('提货单核销')"></CoreshopTitle>
    <div class="search-box">
      <n-input
        round
        :placeholder="$t('请输入完整服务券核销码')"
        v-model:value="orderState.id"
      >
        <template #prefix>
          <n-icon :component="CoreshopIconSearch" />
        </template>
      </n-input>
      <div class="title" @click="handleSearch">{{ $t("搜索") }}</div>
    </div>
    <div class="merchant-list" v-if="orderState.ticket != ''">
      <ul>
        <li>
          <div class="number">
            <p
              class="cs-font-weight-bold cs-display-flex cs-align-items-center"
            >
              {{ $t("服务单号") }}：{{ orderState.ticket.serviceOrderId }}
            </p>
            <n-tag v-if="orderState.ticket.status == 0" type="success">{{
              $t("正常")
            }}</n-tag>
            <n-tag v-if="orderState.ticket.status == 1" type="error">{{
              $t("过期")
            }}</n-tag>
            <n-tag v-if="orderState.ticket.status == 2" type="warning">{{
              $t("作废")
            }}</n-tag>
            <n-tag v-if="orderState.ticket.status == 3" type="info">{{
              $t("已核销")
            }}</n-tag>
          </div>
          <div class="goods">
            <div>
              <img :src="orderState.service.thumbnail" alt="" />
            </div>
            <div
              class="cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
            >
              <p class="name">{{ orderState.service.title || "" }}</p>
              <p class="desc">
                {{ $t("是否核销") }}：{{
                  orderState.ticket.isVerification ? $t("是") : $t("否")
                }}
              </p>
              <p class="desc">
                {{ $t("有效状态") }}：{{
                  orderState.ticket.validityType == 1
                    ? $t("长期有效")
                    : $t("限定消费时间")
                }}
              </p>
              <p class="order-num">
                {{ $t("服务券状态") }}：{{ orderState.ticket.statusStr }}
              </p>
            </div>
          </div>
          <div class="date">
            <div
              v-if="
                orderState.ticket.validityStartTime &&
                orderState.ticket.validityEndTime
              "
            >
              {{ $t("可核销时间") }}：{{ orderState.ticket.validityStartTime }}
              {{ $t("至") }} {{ orderState.ticket.validityEndTime }}
            </div>
            <div class="cs-color-gray cs-font-size-12">
              <p
                v-if="
                  orderState.ticket.createTime && orderState.ticket.status > 0
                "
              >
                {{ $t("下单时间") }}：{{
                  timeFormat(orderState.ticket.createTime, "mm-dd hh:MM:ss")
                }}
              </p>
              <p v-else>
                {{ $t("下单时间") }}：{{
                  timeFormat(orderState.ticket.createTime, "mm-dd hh:MM:ss")
                }}
              </p>
              <p v-if="orderState.ticket.verificationTime">
                {{ $t("核销时间") }}：{{
                  timeFormat(
                    orderState.ticket.verificationTime,
                    "mm-dd hh:MM:ss"
                  )
                }}
              </p>
            </div>
            <NIcon
              v-if="!orderState.ticket.disabled"
              :size="30"
              class="cs-display-block"
              @click="handleSelect"
            >
              <CoreshopIconCheckboxChecked24Regular
                v-if="orderState.ticket.checked"
              />
              <CoreshopIconCheckboxUnchecked24Regular v-else />
            </NIcon>
          </div>
        </li>
      </ul>
    </div>

    <div class="code-box">
      <NIcon :size="22" class="cs-display-block">
        <CoreshopIconCode />
      </NIcon>
    </div>

    <div class="btn-box" v-if="orderState.ticket != ''">
      <CoreshopButton
        size="small"
        class="cs-percent-w-100"
        bg-color="#f0a020"
        v-if="orderState.ticket.checked"
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
import { NInput, NIcon, NTag } from "naive-ui"
import {
  getServiceVerificationTicketInfo,
  verificationTicket,
} from "@/composables/merchant"
import type { Result } from "@/model/result"
import CoreshopIconSearch from "@/components/coreshop-icon/search.vue"
import { showToast, showSuccessToast } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const orderState: UnwrapRef<{
  haveData: boolean
  isLoading: boolean
  id: string
  checkedIds: Array<string>
  showModal: Boolean
  ticket: any
  service: any
  serviceOrder: any
}> = reactive({
  haveData: true,
  isLoading: false,
  id: useRoute().query.id ? String(useRoute().query.id) : "",
  checkedIds: [],
  showModal: false,
  ticket: "",
  service: {},
  serviceOrder: {},
})

const query = async () => {
  orderState.isLoading = true

  const getOrderList: Result<any> = await getServiceVerificationTicketInfo({
    id: orderState.id,
  })

  orderState.ticket = getOrderList.data.ticket
  orderState.service = getOrderList.data.service
  orderState.serviceOrder = getOrderList.data.serviceOrder

  if (orderState.ticket.isVerification) {
    // 已提货
    orderState.ticket["checked"] = false
    orderState.ticket["disabled"] = true
  } else {
    // 未提货
    orderState.ticket["checked"] = true
    orderState.ticket["disabled"] = false
  }

  orderState.isLoading = false
}

// 搜索
const handleSearch = () => {
  if (!orderState.id) {
    showToast(coreShopLang("请输入完整手机号订单号"))
    return
  }
  query()
}

// 选择框事件
const handleSelect = () => {
  if (orderState.ticket.checked) {
    orderState.checkedIds.splice(
      orderState.checkedIds.indexOf(orderState.ticket.redeemCode),
      1
    )
  } else {
    orderState.checkedIds.push(orderState.ticket.redeemCode)
  }
  orderState.ticket.checked = !orderState.ticket.checked
}

// 确认核销
const handleConfirmWriteOff = () => {
  orderState.showModal = true
}

const handleCancel = () => {
  orderState.showModal = false
}
const handleConfirm = async () => {
  const ladingState: Result<any> = await verificationTicket({
    id: orderState.checkedIds.join(","),
  })

  orderState.showModal = false
  if (ladingState.status) {
    showSuccessToast(ladingState.msg)
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
