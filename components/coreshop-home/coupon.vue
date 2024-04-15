<template>
  <div
    class="cs-box-shadow-gray coreshop-padding-10 coreshop-margin-10 coreshop-bg-white coreshop-border-radius-trbl-18"
    v-if="props.coreshopData?.parameters?.list?.length"
  >
    <div
      class="coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between coreshop-min-height-30"
    >
      <div
        class="coreshop-font-16 coreshop-text-black coreshop-font-weight-bold"
      >
        {{ $t("领券专区") }}
      </div>
      <div
        @click="onGoCouponList()"
        class="coreshop-flex coreshop-align-center"
      >
        <span>{{ $t("查看更多") }}</span>
        <CoreshopIconArrowDoubleRight
          class="arrow-right-double"
        ></CoreshopIconArrowDoubleRight>
      </div>
    </div>
    <div class="coreshop-divider">
      <div class="complete"></div>
    </div>
    <div class="coreshop-margin-bottom-10 coreshop-bg-main coreshop-text-black">
      <div class="groupon-scroll">
        <div class="groupon-card-wrap coreshop-flex coreshop-align-center">
          <div
            v-for="(item, index) in coreshopData.parameters.list"
            :key="index"
          >
            <!-- <div class="coreshop-padding-right-5">
              <div class="coupon-wrap">
                <div
                  class="coupon-item coreshop-flex coreshop-align-center coreshop-flex-direction-row coreshop-justify-between"
                >
                  <div
                    class="coupon-left coreshop-flex coreshop-flex-direction"
                  >
                    <div class="sum-box">
                      <span class="unit" style="color: #6b3f12">NT$</span>
                      <span class="sub" style="color: #6b3f12">{{
                        item.name
                      }}</span>
                    </div>
                    <div class="notice" style="color: #9d6d25">
                      <span
                        v-for="(itemCondition, index) in item.conditions"
                        :key="index"
                        >【{{ itemCondition }}】</span
                      >
                    </div>
                    <div class="notice" style="color: #9d6d25">
                      有效期：{{ timeFormat(item.startTime, "yyyy-mm-dd") }} 至
                      {{ timeFormat(item.endTime, "yyyy-mm-dd") }}
                    </div>
                  </div>
                  <div
                    class="coupon-right coreshop-flex coreshop-flex-direction"
                  >
                    <div class="get-btn" @click="onReceiveCoupon(item.id)">
                      立即领取
                    </div>
                    <div class="surplus-num" style="color: #9d6d25">
                      <span
                        v-for="(itemResult, index) in item.results"
                        :key="index"
                        >{{ itemResult }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div class="coreshop-padding-right-5"> -->
                <div class="coupon-wrap">
                  <div class="coupon-left">
                    <div><b>NT$</b>10</div>
                    <div></div>
                  </div>
                  <div class="coupon-right">
                    <div>
                      <span class="sub">{{
                        item.name
                      }}</span>
                        <div class="notice">
                      <span
                        v-for="(itemCondition, index) in item.conditions"
                        :key="index"
                        >【{{ itemCondition }}】</span
                      >
                    </div>
                    <div class="notice">
                      {{ timeFormat(item.startTime, "yyyy-mm-dd") }} 至
                      {{ timeFormat(item.endTime, "yyyy-mm-dd") }}
                    </div>
                    </div>
                   
                    <div class="get-btn" @click="onReceiveCoupon(item.id)">
                      {{ $t("立即领取") }}
                    </div>
                  </div>
                </div>
            </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showLoadingToast, showSuccessToast, showFailToast } from "vant";
import { receiveCoupon } from "@/composables/coupon";

const props = withDefaults(
  defineProps<{
    coreshopData: {
      parameters: {
        list: Array<{
          id: number;
          name: string;
          conditions: Array<string>;
          startTime: string;
          endTime: string;
          results: Array<string>;
        }>;
      };
    };
  }>(),
  {}
);

const onGoCouponList = () => {
  navigateTo("/coupon");
};

const onReceiveCoupon = async (id: number) => {
  showLoadingToast({ message: "領取中...", forbidClick: true });
  const receiveRes = await receiveCoupon({ id });
  if (receiveRes.status) {
    showSuccessToast(receiveRes.msg);
  } else {
    showFailToast(receiveRes.msg);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/core-theme.scss";

.arrow-right-double {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

.groupon-card-wrap {
  overflow: auto;
}
.coupon-wrap {
  // mask: url("/images/coupon_bg1.png");
  // -webkit-mask-box-image: url("/images/coupon_bg1.png");
  // mask-size: 100% 100%;
  position: relative;
  border-radius: 5px;
  // width: 355px;
  height: 100px;
  display: flex;
  .coupon-left{
    width: 103px;
    background: url("/images/home-counp-left.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    div:nth-of-type(1){
      font-size: 38px;
      b{
        font-weight: normal;
        font-size: 16px;
      }
    }
    div:nth-of-type(2){
      font-size: 12px;
    }
  }
  .coupon-right{
    box-sizing: border-box;
    padding: 6px;
    // flex: 1;
    width: 233px;
    background: url("/images/home-counp-right.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sub{
      display: block;
      font-size: 14px;
      font-weight: bold;
      color: #292B2E;
      margin-bottom: 10px;
    }
    .notice{
      font-size: 9px;
      color: #292B2E;
    }
    .get-btn {
        width: 68px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: #54BD63;
        border-radius: 13px;
        padding: 0;
        font-size: 12px;
        font-weight: 500;
        // color: $u-type-warning;
        color: #fff;
      }
  }
  // background: linear-gradient(
  //   to right,
  //   $u-type-warning-disabled,
  //   $u-type-warning
  // );
  // .coupon-item {
  //   width: 100%;
  //   height: 100%;
  //   border-radius: 5px;
  //   .coupon-left {
  //     mask: url("/images/coupon_bg1.png");
  //     -webkit-mask-box-image: url("/images/coupon_bg1.png");
  //     justify-content: center;
  //     padding-left: 10px;
  //     padding-right: 5px;
  //     .unit {
  //       font-size: 12px;
  //       color: #fff;
  //     }
  //     .sum {
  //       font-size: 22.5px;
  //       font-weight: bold;
  //       color: #fff;
  //       line-height: 22.5px;
  //       padding-right: 5px;
  //     }
  //     .sub {
  //       font-size: 18px;
  //       font-weight: bold;
  //       color: #fff;
  //       line-height: 18px;
  //       padding-right: 5px;
  //     }
  //     .notice {
  //       font-size: 11px;
  //       color: rgba(#fff, 0.7);
  //       margin-top: 3px;
  //     }
  //   }
  //   .coupon-right {
  //     min-width: 110px;
  //     justify-content: center;
  //     align-items: center;
  //     padding-right: 5px;
  //     .get-btn {
  //       width: 72px;
  //       height: 27px;
  //       line-height: 27px;
  //       text-align: center;
  //       background: #ffffff;
  //       border-radius: 13px;
  //       padding: 0;
  //       font-size: 12px;
  //       font-weight: 500;
  //       color: $u-type-warning;
  //     }
  //     .surplus-num {
  //       font-size: 11px;
  //       font-weight: 500;
  //       color: #fff;
  //       margin-top: 7px;
  //     }
  //   }
  // }
}

.bg-page, .coreshop-bg-main{
  background: transparent;
}
</style>
