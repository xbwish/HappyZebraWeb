<template>
  <ClientOnly>
    <NuxtLayout name="personal-center">
      <div class="cs-p-10">
        <CoreshopTitle :title="$t('签到')"></CoreshopTitle>
        <div class="sign-in-statistics">
          <div class="item">
            <div class="label">
              {{ signInState.cumulativeCheckInCount || 0 }}天
            </div>
            <div class="value">{{ $t("已坚持打卡") }}</div>
          </div>
          <div class="item">
            <div class="label">
              {{ signInState.cumulativeCheckInCount || 0 }}天
            </div>
            <div class="value">{{ $t("本月累积打卡") }}</div>
          </div>
        </div>
        <Calendar
          :poppable="false"
          :formatter="formatter"
          color="#f56c6c"
          :show-title="false"
          :max-date="maxDate"
          :show-confirm="false"
          @select="onSelectDate($event)"
        />
      </div>
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import * as signInService from "@/composables/signInService"
import type { Result } from "@/model/result"
import { isToday } from "date-fns"
import { SignInResult } from "@/model/signIn"
import {
  Calendar,
  CalendarDayItem,
  showFailToast,
  showSuccessToast,
} from "vant"
import { useI18n } from "vue-i18n"
const { t: coreShopLang } = useI18n()
definePageMeta({
  layout: false,
})

interface SignIn {
  canSignIn?: boolean
  currentDay?: boolean
  signInDates?: Array<string>
  cumulativeCheckInCount?: number
}

const now: Date = new Date()

const maxDate = new Date(now.getFullYear(), now.getMonth() + 1)

const signInState: UnwrapRef<SignIn> = reactive({
  canSigiIn: false,
  currentDay: false,
  signInDates: [],
  cumulativeCheckInCount: 0,
})

const signInCountResult: Result<number> =
  await signInService.getUserCheckCount()
signInState.cumulativeCheckInCount = signInCountResult.data

/** 查询签到日期 */
const queryCheckDate = async (year: number, month: number) => {
  const signInDateResult: Result<Array<string>> =
    await signInService.getCheckByMonthDate({ year, month })
  const signInDates: Array<string> = signInDateResult.data
  signInState.signInDates = signInDates

  // 判断今天是否可以签到
  if (!Array.isArray(signInDates) || signInDates.length === 0) {
    signInState.canSignIn = true
    return
  }

  const lastSignDate: string = signInDates[signInDates.length - 1]

  signInState.currentDay = isToday(new Date())

  //判单是否为当天
  signInState.canSignIn = !isToday(new Date(lastSignDate))
}

const currentDate: Date = new Date()
queryCheckDate(currentDate.getFullYear(), currentDate.getMonth() + 1)

const formatter = (day: CalendarDayItem) => {
  const year = day.date?.getFullYear()
  const month = day.date?.getMonth()! + 1
  const date = day.date?.getDate()
  if (
    signInState.signInDates?.includes(
      `${year}-${`${month}`.padStart(2, "0")}-${`${date}`.padStart(2, "0")}`
    )
  ) {
    day.bottomInfo = coreShopLang("签到")
  }
  return day
}

const onSelectDate = async (date: Date) => {
  if (!isToday(date) || !signInState.canSignIn) {
    return
  }
  const signInDate: string = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`
  const checkInResult: Result<SignInResult> = await signInService.uerCheckIn({
    date: signInDate,
  })

  if (!checkInResult.status) {
    showFailToast(checkInResult.msg || coreShopLang("网络异常签到失败"))
    return
  }

  signInState.canSignIn = false
  signInState.cumulativeCheckInCount = checkInResult.data.cumulativeCheckInCount
  signInState.signInDates = signInState.signInDates?.concat(signInDate)
  showSuccessToast(coreShopLang("签到成功"))
}
</script>

<style lang="scss" scoped>
.sign-in-statistics {
  display: flex;
  margin-bottom: 0.5rem;
  // gap: 10px;
  border-radius: 0.2rem;
  height: 3rem;
  overflow: hidden;
  .item {
    flex: 1;
    background: #ffffff;
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .label {
      font-size: 0.5rem;
      margin-bottom: 0.25rem;
      color: #292b2e;
      font-weight: 600;
    }
    .value {
      font-weight: 400;
      font-size: 0.35rem;
      line-height: 0.55rem;
      color: #6e737d;
    }
  }

  .count {
    margin-right: 20px;
  }
}

.sign-in-box {
  height: 22px;
  text-align: right;

  .sign-in {
    color: #18a058;
  }
}
:deep(.n-card) {
  .n-card-header__main {
    font-size: 0.35rem;
  }
}
:deep(.van-calendar__bottom-info) {
  color: #f56c6c;
}
:deep(.van-calendar__day--selected) {
  .van-calendar__bottom-info {
    color: #ffffff;
  }
}
</style>
