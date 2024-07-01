<template>
  <CoreshopTitle :title="$t('提现记录')"></CoreshopTitle>
  <div class="filter">
    <!-- <Field
      v-model="balanceDetailData.filterTypeName"
      is-link
      readonly
      :label="$t('类型筛选')+':'"
      :placeholder="$t('请选择类型筛选')"
      @click="balanceDetailData.showPicker = true"
    /> -->
    <Cell>
      <template #title>
        <span class="custom-title">{{ $t("类型筛选") + "：" }}</span>
        <span
          class="custom-value"
          @click="balanceDetailData.showPicker = true"
          >{{ balanceDetailData.filterTypeName }}</span
        >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
          >
            <path
              d="M5.79241 5.97063C5.3921 6.49064 4.6079 6.49064 4.20759 5.97063L1.04322 1.85999C0.537026 1.20243 1.00579 0.250001 1.83563 0.250001L8.16437 0.250001C8.99421 0.250001 9.46298 1.20243 8.95678 1.86L5.79241 5.97063Z"
              fill="#292B2E"
            />
          </svg>
        </span>
      </template>
    </Cell>
  </div>

  <div>
    <div class="balance-detail-box">
      <ul class="detail-list-box clr" v-if="balanceDetailData.list.length > 0">
        <li v-for="item in balanceDetailData.list" :key="item.id" class="fl">
          <p
            class="cs-display-flex cs-align-items-center cs-justify-content-space-between"
          >
            <span class="cs-font-size-14">{{ item.statusName }}</span>
            <span class="cs-color-red balance">
              <CoreshopLanguage :text="$t('提现金额')" />：<span
                class="cs-font-size-16"
                >NT${{ item.money }}</span
              >
            </span>
          </p>
          <p
            class="cs-font-size-12 cs-color-gray cs-display-flex cs-align-items-center cs-justify-content-space-between"
          >
            <span>
              <CoreshopLanguage :text="$t('提现卡号')" />：{{ item.cardNumber }}
            </span>
            <span>
              <CoreshopLanguage :text="$t('提现时间')" />：{{ item.createTime }}
            </span>
          </p>
        </li>
      </ul>
      <CoreshopNoData v-else :text="$t('暂无提现明细')"></CoreshopNoData>
      <p
        class="no-more"
        v-if="balanceDetailData.list.length > 0 && !balanceDetailData.haveData"
      >
        {{ $t("没有更多了") }}
      </p>
    </div>
    <Popup v-model:show="balanceDetailData.showPicker" round position="bottom">
      <Picker
        :columns="objectType"
        @cancel="balanceDetailData.showPicker = false"
        @confirm="onConfirmChoose($event)"
      >
        <template #confirm>
          <div class="confirm-choose-type">{{ $t("确认") }}</div>
        </template>
      </Picker>
    </Popup>
    <CoreshopLoading v-if="balanceDetailData.isLoading" />
  </div>
</template>

<script setup lang="ts">
import type { Result } from "@/model/result"
import type { UnwrapRef } from "vue"
import { queryCashList } from "@/composables/balance"
import { Picker, Field, Popup, Cell } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

const objectType: Array<any> = [
  {
    value: 0,
    text: coreShopLang("全部"),
  },
  {
    value: 1,
    text: coreShopLang("待审核"),
  },
  {
    value: 2,
    text: coreShopLang("提现成功"),
  },
  {
    value: 3,
    text: coreShopLang("提现失败"),
  },
]

const balanceDetailData: UnwrapRef<{
  typeList: Array<any>
  id: number
  page: number
  limit: number
  list: Array<any>
  haveData: boolean
  isLoading: boolean
  showPicker: boolean
  filterTypeName?: string
}> = reactive({
  typeList: objectType,
  id: 0,
  page: 1,
  limit: 20,
  list: [],
  haveData: true,
  isLoading: false,
  showPicker: false,
  filterTypeName: "全部",
})

const query = async () => {
  balanceDetailData.isLoading = true

  const balanceList: Result<any> = await queryCashList({
    limit: balanceDetailData.limit,
    page: balanceDetailData.page,
    id: balanceDetailData.id,
  })

  if (balanceList.data.length > 0) {
    balanceDetailData.list = balanceDetailData.list.concat(
      balanceList.data || []
    )
  } else {
    balanceDetailData.haveData = false
  }
  balanceDetailData.isLoading = false
}
query()

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight // 文档的完整高度
      const scrollT =
        document.documentElement.scrollTop || document.body.scrollTop // 当前滚动条的垂直偏移
      const screenH = window.screen.height // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && balanceDetailData.haveData) {
        balanceDetailData.page++
        query()
      }
    }, 500)
  )
})

const onConfirmChoose = (event: {
  selectedOptions: Array<{ text: string; value: number }>
}) => {
  balanceDetailData.id = event.selectedOptions[0].value
  balanceDetailData.page = 1
  balanceDetailData.list = []
  balanceDetailData.filterTypeName = event.selectedOptions[0].text
  balanceDetailData.showPicker = false
  balanceDetailData.haveData = true
  balanceDetailData.isLoading = false
  query()
}
</script>

<style lang="scss" scoped>
.filter {
  position: fixed;
  top: 0;
  width: 100%;

  font-family: "PingFang HK";
  font-size: 0.4rem;
  .custom-title {
    color: #6e737d;
    font-weight: 500;
  }
  .custom-value {
    margin-right: 2px;
    color: #292b2e;
    font-weight: 500;
  }
}

.balance-detail-box {
  padding-top: 0.5rem;
  margin: 10px;
}
.detail-list-box {
  margin-top: 0.8rem;

  li {
    width: 94%;
    margin-bottom: 10px;
    background: #ffffff;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    padding: 10px;
    .balance {
      margin-top: 5px;
    }
  }
}
.no-more {
  color: #999999;
}
.confirm-choose-type {
  color: #f56c6c;
}

.van-empty {
  background: #fff;
  margin-top: 16px;
  border-radius: 8px;
}
.van-cell {
  background: transparent;
}
:deep(.van-field__label) {
  width: 70px;
  margin: 0 !important;
}
:deep(.van-cell__value) {
  flex: auto;
}
</style>
