<template>
  <NuxtLayout name="personal-center">
    <div>
      <CoreshopTitle :title="$t('我的发票')"></CoreshopTitle>
      <section>
        <ul class="invoice-box" v-if="invoiceData.list.length > 0">
          <li v-for="item in invoiceData.list" :key="item.id">
            <div class="cs-display-flex cs-align-content-center">
                <Icon name="coupon-o" :size="50" />
              <div
                class="cs-flex-sub cs-m-l-10 cs-display-flex cs-flex-direction-column cs-justify-content-space-between"
              >
                <p
                  class="cs-font-size-14 cs-m-b-5 cs-line-height-no-px-1 cs-display-flex cs-align-content-center cs-justify-content-space-between"
                >
                  <span class="cs-text-price cs-font-size-16 cs-color-red">{{ item.amount }}</span>
                  <span :class="item.status == 1 ? 'cs-color-red' : 'cs-color-green'">{{ $t(item.statusName) || "" }}</span>
                </p>
                <p class="cs-font-size-14">{{ $t("发票抬头") }}：{{ item.title || "" }}</p>
                <p class="cs-font-size-14" v-if="item.taxNumber">
                  {{ $t("发票税号") }}：{{ item.taxNumber }}
                </p>
                <p class="cs-font-size-14" v-if="item.remarks && item.remarks != ''">
                  {{ $t("开票备注") }}：{{ item.remarks || "" }}
                </p>
              </div>
            </div>
            <div class="cs-display-flex cs-m-t-5 cs-align-content-center cs-justify-content-space-between">
              <p class="cs-font-size-14 create-time">{{ item.createTime }}</p>
              <p class="cs-font-size-14">{{ $t(item.typeName) || "" }}</p>
            </div>
          </li>
        </ul>
        <CoreshopNoData v-else :text="$t('暂无发票明细')"></CoreshopNoData>
        <p class="no-more" v-if="invoiceData.list.length > 0 && !invoiceData.haveData">{{$t('没有更多了')}}</p>
      </section>
      <CoreshopLoading v-if="invoiceData.isLoading" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { Result } from "@/model/result";
import { queryUserInvoiceList } from "@/composables/member";
import { InvoiceList } from "@/model/member";
import { Icon } from 'vant';

export interface IotherData {
  totalCount: number;
  totalPages: number;
}

definePageMeta({
  layout: false,
});

const invoiceData: UnwrapRef<{
  list: Array<any>;
  otherData: IotherData;
  limit: number; // 一页数据的个数
  page: number; // 页数
  haveData: boolean;
  isLoading: boolean;
}> = reactive({
  list: [],
  limit: 5,
  page: 1,
  otherData: {
    totalCount: 0,
    totalPages: 0,
  },
  haveData: true,
  isLoading: false,
});

const query = async () => {
  invoiceData.isLoading = true;

  const userInvoice: Result<Array<InvoiceList>> = await queryUserInvoiceList({
    limit: invoiceData.limit,
    page: invoiceData.page,
  });
  invoiceData.otherData = userInvoice.otherData;
  if (userInvoice.data.length > 0) {
    invoiceData.list = invoiceData.list.concat(userInvoice.data || []);
  } else {
    invoiceData.haveData = false;
  }
  invoiceData.isLoading = false;
};
query();

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && invoiceData.haveData) {
        invoiceData.page++;
        query();
      }
    }, 500)
  );
});
</script>

<style lang="scss" scoped>
.pagination-box {
  display: flex;
  flex-direction: row-reverse;
  padding: 10px 0;
}

.invoice-box {
  li {
    padding: 0.3rem;
    background: #ffffff;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin: 10px;
    .create-time {
      color: #d5d5d5;
    }
  }
}
</style>
