<template>
  <section>
    <CoreshopTitle :title="$t('优惠券')"></CoreshopTitle>
    <div class="tab-list">
      <Tabs
        @click-tab="handleChangeTab($event)"
        title-active-color="#f56c6c"
        color="#f56c6c"
      >
        <Tab
          v-for="(item, index) in tabList"
          :key="item.key"
          :title="$t(item.title)"
          :name="item.key"
        ></Tab>
      </Tabs>
    </div>

    <section class="layout-coupon">
      <ul v-if="couponData.list.length > 0" class="coupon-box">
        <li
          :class="
            'cs-m-b-10 cs-border-radius-5 cs-position-relative ' +
            couponData.display
          "
          v-for="item in couponData.list"
          :key="item.id"
        >
          <div
            class="cs-display-flex cs-p-15 cs-justify-content-space-between cs-justify-content-center"
          >
            <div class="cs-display-flex cs-percent-w-25 code">
              <div class="cs-margin-auto">
                <!-- <p class="cs-font-size-12 cs-text-align-center">{{ item.couponCode }}</p> -->
                <p class="cs-font-size-12 cs-text-align-center price">
                  <span>NT$</span>
                  <span class="num">10</span>
                </p>
                <p
                  class="cs-font-size-12 cs-color-gray cs-text-align-center text"
                >
                  <!-- v-for="items in item.results"
                  :key="items"
                  {{ items }} -->
                </p>
              </div>
            </div>
            <div
              class="cs-flex-1 cs-m-l-10 cs-display-flex cs-flex-direction-column cs-justify-content-space-between code_right"
            >
              <div
                class="cs-display-flex cs-justify-content-space-between cs-justify-content-center"
              >
                <p class="cs-font-size-14">{{ item.couponName }}</p>
                <CoreshopButton
                  class="cs-w-70 cs-font-size-12 code_right_btn"
                  :text="handleButtonText(item)"
                  @click="handleLink"
                  :bgColor="handleButtonBgColor(item)"
                  textColor="#fff"
                >
                </CoreshopButton>
              </div>
              <p class="cs-font-size-12 cs-color-gray">
                {{ item.stime }} - {{ item.etime }}
              </p>
              <div
                class="cs-m-t-5 cs-display-flex cs-justify-content-space-between cs-align-items-center cs-font-size-12 cs-color-gray"
                @click="handleViewCoupon(item)"
              >
                <span>{{ $t("使用规则") }}</span>
                <Icon :name="`arrow-${item.isShow ? 'down' : 'up'}`" />
              </div>
            </div>
          </div>
          <div
            v-show="item.isShow"
            class="cs-overflow-hidden cs-percent-w-100 coupon-message"
          >
            <div class="cs-p-10">
              <p v-for="(itemCondition, index) in item.conditions" :key="index">
                {{ itemCondition }}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <CoreshopNoData v-else :text="$t('暂无此类优惠券')"></CoreshopNoData>
      <p
        class="no-more"
        v-if="couponData.list.length > 0 && !couponData.haveData"
      >
        {{ $t("没有更多了") }}
      </p>
    </section>
    <CoreshopLoading v-if="couponData.isLoading" />
  </section>
</template>

<script setup lang="ts">
import { UnwrapRef, onMounted } from "vue"
import type { Result } from "@/model/result"
import { queryUserCoupon } from "@/composables/coupon"
import { UserCoupon, UserCouponList } from "@/model/member"
import { usePageConfig } from "@/store"
import { Tabs, Tab, Icon } from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
usePageConfig().set_back_style({ top: "15px" })

const tabList = [
  {
    title: coreShopLang("可使用"),
    key: "noUsed",
  },
  {
    title: coreShopLang("已使用"),
    key: "yesUsed",
  },
  {
    title: coreShopLang("已失效"),
    key: "invalid",
  },
]

const couponData: UnwrapRef<{
  page: number
  limit: number
  display: string
  list: Array<UserCouponList>
  haveData: boolean
  isLoading: boolean
}> = reactive({
  page: 1,
  limit: 20,
  display: "noUsed",
  list: [],
  haveData: true,
  isLoading: false,
})

const query = async () => {
  couponData.isLoading = true

  const getCouponList: Result<UserCoupon> = await queryUserCoupon({
    limit: couponData.limit,
    page: couponData.page,
    display: couponData.display,
  })
  if (getCouponList.data?.list.length > 0) {
    couponData.list = couponData.list.concat(
      getCouponList.data.list.map((item: UserCouponList) => ({
        isShow: false,
        ...item,
      }))
    )
  } else {
    couponData.haveData = false
  }
  couponData.isLoading = false
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
      if (scrollH - scrollT - screenH < 60 && couponData.haveData) {
        couponData.page++
        query()
      }
    }, 500)
  )
})

const handleViewCoupon = (item: any) => {
  item.isShow = !item.isShow
}

const handleChangeTab = (event: { name: string }) => {
  couponData.page = 1
  couponData.list = []
  couponData.haveData = true
  couponData.isLoading = false
  couponData.display = event.name
  query()
}

const handleLink = () => {
  if (couponData.display === "noUsed") {
    routerLink("/goods/classify")
  }
}
const handleButtonText = (item: any) => {
  let text = coreShopLang("立即使用")
  if (couponData.display === "noUsed") {
    return text
  }
  if (item.isUsed) {
    text = coreShopLang("已使用")
    return text
  }
  if (item.isExpire && !item.isUsed) {
    text = coreShopLang("已失效")
    return text
  }
}
const handleButtonBgColor = (item: any) => {
  let color = "#f56c6c"
  if (couponData.display === "noUsed") {
    return color
  }
  if (item.isUsed) {
    color = "#f0a020"
    return color
  }
  if (item.isExpire && !item.isUsed) {
    color = "#dcdcdc"
    return color
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/color.scss";

.tab-list {
  position: fixed;
  top: 0;
  width: 10rem;
  z-index: 2;
}

.layout-coupon {
  padding-top: 1.5rem;
  background-color: #fff;
}

.coupon-box {
  li {
    width: 9.5rem;
    margin: 0 auto;
    // background: #ffffff;
    /* shadow card */

    // box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    // border-radius: 8px;

    .cs-p-15 {
      padding: 0 !important;
    }

    > div:nth-of-type(1) {
      border-radius: 5px;
      background: #fff;
      position: relative;
      height: 84px;
      .code {
        background-image: url(../../../assets/img/green_left.png);
        background-size: 100% 100%;
        opacity: 0.8;
        .cs-margin-auto {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .price {
            font-size: 20px;
            color: #fff;
            // font-weight: 400;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: end;
            .num {
              height: 45px;
              line-height: 50px;
              font-size: 35px;
              position: relative;
              left: -5px;
              font-weight: lighter;
            }
          }
          .text {
            color: #fff;
          }
        }
      }
      .code_right {
        background-image: url(../../../assets/img/green_right.png);
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        .cs-display-flex {
          flex: 2;
          position: relative;
          .cs-font-size-14 {
            color: #292b2e;
            font-weight: 600;
            line-height: 18px;
          }
          .code_right_btn {
            position: absolute;
            right: 5px;
            top: 40px;
            padding: 12px;
            background-color: #00bf6a;
            color: #fff;
          }
        }
        .cs-font-size-12 {
          flex: 1;
          color: #292b2e;
        }
        .cs-m-t-5 {
          margin-top: 0px !important;
          justify-content: left;
          span {
            margin-right: 4px;
          }
        }
      }
      .cs-m-l-10 {
        margin-left: 0px !important;
      }
    }

    > div:nth-of-type(2) {
      border-radius: 0 0 5px 5px;
      background-color: #fff;
      border-top: 1px dashed #eee;
    }

    .coupon-message {
      z-index: 9;
      background-color: #f9f9f9;
      overflow: hidden;
    }
  }
  .yesUsed,
  .invalid {
    filter: grayscale(1);
  }
}
</style>
