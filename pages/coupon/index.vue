<template>
  <NuxtLayout name="coreshop-shop-header-back">
    <section class="cs-p-10 cs-background-color-white">
      <CoreshopTitle :title="$t('优惠券')"></CoreshopTitle>
      <section>
        <ul v-show="couponData.list.length > 0" class="cs-display-flex cs-flex-wrap coupon-box">
          <li class="cs-m-b-10 cs-border-radius-5 cs-position-relative" v-for="item in couponData.list" :key="item.id">
            <div>
              <div class="cs-display-flex cs-percent-w-30 cs-flex-direction-column">
                <img class="cs-percent-w-60 cs-display-block cs-margin-auto" src="/images/coupon-element.png" alt="" />
                <p class="cs-font-size-12 cs-text-align-center">
                  <span v-for="items in item.results" class="cs-m-r-5" :key="items">{{ items }}</span>
                </p>
              </div>
              <div
                class="cs-percent-w-58 cs-display-flex cs-flex-direction-column cs-m-l-10 cs-justify-content-space-between cs-flex-1"
              >
                <p
                  class="cs-font-size-14 cs-display-flex cs-align-items-center cs-justify-content-space-between"
                >
                  <span>{{ item.name }}</span>
                  <CoreshopButton
                    :text="$t('立即领取')"
                    @click="handleUserGetCoupon(item)"
                    bgColor="#f56c6c"
                    :bordered="true"
                    textColor="#fff"
                  >
                  </CoreshopButton>
                </p>

                <p class="cs-font-size-12 cs-p-t-5 cs-p-b-5">
                  {{$t('领取时间')}}：{{ handleDeleteTime(item.startTime) }} - {{ handleDeleteTime(item.endTime) }}
                </p>

                <div
                  class="cs-font-size-12 cs-cursor-pointer cs-display-flex cs-align-items-center cs-justify-content-space-between"
                  @click="handleViewCoupon(item)"
                >
                  <span class="cs-percent-w-80 cs-o-e-v-1 cs-align-self-flex-end">{{$t('使用规则')}}</span>
                  <Icon :name="`arrow-${item.isSelect?'down':'up'}`"  />

                </div>
              </div>
            </div>

            <div
              v-show="item.isSelect"
              class="cs-overflow-hidden cs-p-t-10 cs-p-l-10 cs-p-r-10 cs-p-b-7 cs-font-size-16 coupon-message"
            >
              <div>
                <p class="cs-p-b-3" v-for="(itemCondition, index) in item.conditions" :key="index">
                  {{ itemCondition }}
                </p>
              </div>
            </div>

            <div class="no-coupon" v-if="item.maxRecevieNums > 0 && item.getNumber >= item.maxRecevieNums">
              <div>{{$t('已领完')}}</div>
            </div>
          </li>
        </ul>
        <CoreshopNoData v-show="couponData.list.length == 0" :text="$t('暂无此类优惠券')"></CoreshopNoData>
        <p class="no-more" v-if="couponData.list.length > 0 && !couponData.haveData">{{$t('没有更多了')}}</p>
      </section>
      <CoreshopLoading v-if="couponData.isLoading" />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { Result } from "@/model/result";
import { queryCouponList, receiveCoupon } from "@/composables/coupon";
import { ICouponList } from "@/model/member";
import { showToast, showSuccessToast,Icon } from "vant";

definePageMeta({
  layout: false,
});

const couponData: UnwrapRef<{
  limit: number;
  page: number;
  list: Array<ICouponList>;
  haveData: boolean;
  isLoading: boolean;
}> = reactive({
  limit: 20,
  page: 1,
  list: [],
  haveData: true,
  isLoading: false,
});

const query = async () => {
  couponData.isLoading = true;

  const getCouponList: Result<Array<ICouponList>> = await queryCouponList({
    limit: couponData.limit,
    page: couponData.page,
  });

  if (getCouponList.data.length > 0) {
    couponData.list = couponData.list.concat(
      getCouponList.data.map((item: ICouponList) => ({ isSelect: false, ...item })) || []
    );
  } else {
    couponData.haveData = false;
  }

  couponData.isLoading = false;
};
query();

onMounted(() => {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 60 && couponData.haveData) {
        couponData.page++;
        query();
      }
    }, 500)
  );
});

const handleViewCoupon = (item: any) => {
  item.isSelect = !item.isSelect;
};

// 用户领取优惠券
const handleUserGetCoupon = async (item: any) => {
  const getCoupon: Result<any> = await receiveCoupon({ id: item.id });
  if (getCoupon.status) {
    showSuccessToast(getCoupon.msg);
  } else {
    showToast(getCoupon.msg);
  }
};

// 去除时分秒
const handleDeleteTime = (time: string) => {
  return /\d{4}-\d{1,2}-\d{1,2}/g.exec(time)[0];
};
</script>

<style scoped lang="scss">
.coupon-box {
  li {
    position: relative;
    width: 100%;
    background: url(/images/coupon-bg.png) no-repeat;
    background-size: 100% 92px;
    background-position: top;
    > div:nth-of-type(1) {
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3rem;
    }

    .coupon-message {
      border-radius: 5px;
      background: linear-gradient(to right, #f8dca3, #f0c682);
      div {
        font-size: 0.3rem;
      }
    }

    .coupon-message.active {
      height: auto;
    }
    .no-coupon {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1.5rem;
        height: 1.5rem;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 1.5rem;
        font-size: 0.3rem;
        color: #fff;
        border-radius: 50%;
      }
    }
  }
}
.detail-box {
  padding: 0.15rem;
  background-color: #ffeced;
}
</style>
