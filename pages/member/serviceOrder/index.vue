<template>
  <NuxtLayout name="personal-center">
    <div>
      <coreshop-title :title="$t('我购买的服务')"></coreshop-title>
      <ul class="order" v-if="servicesOrderData.list.length > 0">
        <li v-for="item in servicesOrderData.list" :key="item.id" class="cs-border-solid-bottom">
          <div
            class="cs-p-b-10 cs-display-flex cs-align-items-center cs-align-content-center cs-justify-content-space-between"
          >
            <p
              class="cs-font-size-14 cs-display-flex cs-align-items-center"
              @click="handleViewDetail(item.serviceOrderId)"
            >
              <span class="cs-m-l-5"
                ><CoreshopLanguage :text="$t('订单号')" /> : <span>{{ item.serviceOrderId }}</span></span
              >
            </p>
            <p class="cs-font-size-14">{{ item.statusStr }}</p>
          </div>
          <div class="cs-display-flex cs-justify-content-space-between">
            <section class="cs-percent-w-20">
              <CoreshopImage  class="cs-percent-w-100" root="#order" :src="item.service.thumbnail" />
            </section>
            <section class="cs-percent-w-78 cs-display-flex cs-flex-direction-column cs-justify-content-space-between">
              <p class="cs-font-size-14 cs-line-height-20">{{ item.service.title }}</p>
              <p class="cs-color-gray cs-font-size-12">{{ item.service.description }}</p>
              <p class="cs-color-gray cs-font-size-12">
                <CoreshopLanguage :text="$t('下单时间')" /> {{ timeFormat(item.payTime, "yyyy-mm-dd hh:MM:ss") }}
              </p>
            </section>
          </div>
          <div
            class="cs-m-t-10 cs-display-flex cs-align-items-center cs-align-content-center cs-justify-content-space-between"
          >
            <Tag type="success">
              {{ item.statusStr }}
            </Tag>
            <CoreshopButton @onClick="handleViewDetail(item.serviceOrderId)" :bordered="true">
              <CoreshopLanguage :text="$t('查看详情')" />
            </CoreshopButton>
          </div>
        </li>
      </ul>
      <CoreshopNoData v-else />
      <p class="no-more" v-if="servicesOrderData.list.length > 0 && !servicesOrderData.haveData">{{$t('没有更多了')}}</p>
    </div>
    <CoreshopLoading v-if="servicesOrderData.isLoading" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { queryUserServicesPageList } from "@/composables/order";
import { Result } from "@/model/result";
import { ServiceOrder, ServiceOrderListDetail } from "@/model/order";
import { Tag } from "vant";

definePageMeta({
  layout: false,
});

const servicesOrderData: UnwrapRef<{
  page: number;
  limit: number;
  count: number;
  list: Array<ServiceOrderListDetail>;
  haveData: boolean;
  isLoading: boolean;
}> = reactive({
  page: 1,
  limit: 10,
  count: 0,
  list: [],
  haveData: true,
  isLoading: false,
});

// 查询服务商品列表
const query = async () => {
  servicesOrderData.isLoading = true;

  const result: Result<ServiceOrder> = await queryUserServicesPageList({
    page: servicesOrderData.page,
    limit: servicesOrderData.limit,
  });
  servicesOrderData.count = result.data.count;

  if (result.data?.list.length > 0) {
    servicesOrderData.list = servicesOrderData.list.concat(result.data?.list || []);
  } else {
    servicesOrderData.haveData = false;
  }
  servicesOrderData.isLoading = false;
};
query();

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && servicesOrderData.haveData) {
        servicesOrderData.page++;
        query();
      }
    }, 500)
  );
});

// 查看详情
const handleViewDetail = (id: string) => {
  return navigateTo(`/member/serviceOrder/detail/${id}`);
};
</script>

<style lang="scss" scoped>
.order {
  li {
    padding: 0.3rem;
    background: #ffffff;
    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;
    margin: 10px;
  }
}
</style>
