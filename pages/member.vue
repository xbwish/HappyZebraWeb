<template>
  <div>
    <ClientOnly>
      <NuxtLayout name="personal-center">
        <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
          <NuxtPage />
        </NConfigProvider>
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router"
import { queryDistributionInfo } from "@/composables/distribution"
import { queryAgentInfo } from "@/composables/agent"
import type { Result } from "@/model/result"
import { NConfigProvider, zhCN, dateZhCN } from "naive-ui"
import type { AgentInfo } from "@/model/member"
import { usePageConfig } from "@/store"

usePageConfig().set_show_back(false)

definePageMeta({
  layout: false,
  middleware: [
    "auth",
    async (to: RouteLocationNormalized) => {
      let menuLinkState = useState("menuLink", () => "")
      menuLinkState.value = to.redirectedFrom
        ? to.redirectedFrom.fullPath
        : to.fullPath

      if (to.fullPath === "/member") {
        return navigateTo("member/center")
      }

      if (to.fullPath === "/member/distribution") {
        const getDistributionInfo: Result<AgentInfo> =
          await queryDistributionInfo()
        if (getDistributionInfo.data.hasOwnProperty("verifyStatus")) {
          if (
            getDistributionInfo.data.verifyStatus == 1 &&
            getDistributionInfo.data.needApply &&
            getDistributionInfo.data.conditionStatus
          ) {
            return navigateTo("/member/distribution/panel") // 去分销面板
          }
        }
      }
      if (to.fullPath === "/member/agent") {
        const getAgentInfo: Result<AgentInfo> = await queryAgentInfo()
        if (
          getAgentInfo.data.verifyStatus == 1 &&
          getAgentInfo.data.needApply &&
          getAgentInfo.data.conditionStatus
        ) {
          routerLink("/member/agent/panel") // 去分销面板
        }
      }
    },
  ],
})
</script>

<style lang="scss" scoped>
@import "@/assets/css/color.scss";

ul {
  .title {
    font-size: 16px;
    text-align: center;
    padding: 20px 0 10px;
    font-weight: bold;
  }

  .link-box {
    position: relative;
    text-align: center;
    cursor: pointer;

    .link {
      display: block;
      position: relative;
      font-size: 14px;
      padding: 10px 0;
      transition: all 0.2s;
      color: #000;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: $accent-color;
      transition: all 0.3s;
    }

    .link.active {
      background-color: $accent-color;
      color: #fff;
    }
  }

  .link-box:hover {
    .link {
      color: #fff;
    }

    &::before {
      width: 100%;
    }
  }
}
</style>
