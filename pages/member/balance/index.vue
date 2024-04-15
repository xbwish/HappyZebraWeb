<template>
  <div>
    <CoreshopTitle :title="$t('账户余额')"></CoreshopTitle>
    <section>
      <p class="balance">
        <span>NT$<b>{{ balance }}</b></span>
        <span>{{ $t("账户余额") }}</span>
      </p>
      <div class="balance-box">
        <ul>
          <li>
            <nuxt-link to="/member/balance/recharge">
              <div class="cs-display-flex">
                <NIcon color="#292B2E" :size="20">
                  <CoreshopIconGift16Regular />
                </NIcon>
                <p class="cs-m-t-4">{{$t('账户充值')}}</p>
              </div>
              <NIcon color="#292B2E" :size="20">
                <CoreshopIconChevronRight28Regular />
              </NIcon>
            </nuxt-link>
          </li>
          <!-- <li>
            <nuxt-link to="/member/balance/withdrawCash" >
              <div class="cs-display-flex">
                <NIcon color="#292B2E" :size="20">
                  <CoreshopIconContentView32Regular />
                </NIcon>
                <p class="cs-m-t-4">{{$t('余额提现')}}</p>
              </div>
              <NIcon color="#292B2E" :size="20">
                <CoreshopIconChevronRight28Regular />
              </NIcon>
            </nuxt-link>
          </li> -->
          <li>
            <nuxt-link to="/member/balance/detail">
              <div class="cs-display-flex">
                <NIcon color="#292B2E" :size="20">
                  <CoreshopIconCalendarWeekNumbers24Regular />
                </NIcon>
                <p class="cs-m-t-4">{{$t('余额明细')}}</p>
              </div>
              <NIcon color="#292B2E" :size="20">
                <CoreshopIconChevronRight28Regular />
              </NIcon>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/member/balance/cashlist">
              <div class="cs-display-flex">
                <NIcon color="#292B2E" :size="20">
                  <CoreshopIconNotepad32Regular />
                </NIcon>
                <p class="cs-m-t-4">{{$t('提现记录')}}</p>
              </div>
              <NIcon color="#292B2E" :size="20">
                <CoreshopIconChevronRight28Regular />
              </NIcon>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/member/balance/bankcard">
              <div class="cs-display-flex">
                <NIcon color="#292B2E" :size="20">
                  <CoreshopIconContactCardGroup28Regular />
                </NIcon>
                <p class="cs-m-t-4">{{$t('我的银行卡')}}</p>
              </div>
              <NIcon color="#292B2E" :size="20">
                <CoreshopIconChevronRight28Regular />
              </NIcon>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { useMemberStore } from "@/store";
const balance: number = useMemberStore().getBalance;
</script>

<style lang="scss" scoped>
@import "@/assets/css/color.scss";
.balance-box {
  margin-top: 0.2rem;

  ul {
    border-radius: 5px;
    overflow: hidden;
    width: 9.5rem;
    margin: 0 auto;
    background: #ffffff;

    box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
    border-radius: 8px;

    li {
      width: 100%;

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0.5rem;
        color: #292B2E;
        div:nth-of-type(1) {
          display: flex;
          align-items: center;

          img {
            width: 0.6rem;
          }

          p {
            font-size: 0.35rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
}
.balance {
    box-sizing: border-box;
    padding: 0.5rem;
    font-size: 0.35rem;
    background-color: #fff;
    overflow: hidden;
    width: 9.5rem;
    margin: 0.2rem auto;
    background: #ffffff;
    border-radius: 8px;
    height: 116px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span:nth-of-type(1){
      font-size: 0.4rem;
      color: #292B2E;
      font-weight: 600;
      b{
        margin-left: 0.2rem;
        font-size: 0.6rem;
      }
    }
  span:nth-of-type(2){
    color: #6E737D;
    font-size: 0.4rem;
  }
}
</style>
