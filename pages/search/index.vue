<template>
  <NuxtLayout name="personal-center">
    <CoreshopTitle :title="$t('搜索')"></CoreshopTitle>

    <div class="search-box">
      <Search
        class="search"
        shape="round"
        :placeholder="$t('请输入关键词搜索')"
        v-model="searchState.value"
      ></Search>
      <div class="title" @click="handleSearch">{{ $t("搜索") }}</div>
    </div>
    <div class="history-search" v-if="recommendKeys.length > 0">
      <p class="title">{{ $t("推荐搜索") }}</p>
      <div>
        <Tag
          class="cs-m-r-5"
          round
          v-for="(item, index) in recommendKeys"
          :key="index"
          @click="handletGoCategory(item)"
        >
          {{ item }}
        </Tag>
      </div>
    </div>
    <div class="history-search" v-if="searchState.historySearch.length > 0">
      <p class="title">{{ $t("历史搜索") }}</p>
      <div>
        <Tag
          class="cs-m-r-5"
          round
          v-for="(item, index) in searchState.historySearch"
          :key="index"
          @click="handletGoCategory(item)"
        >
          {{ item }}
        </Tag>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import { NTag } from "naive-ui"
import { useConfigStore } from "@/store"
import { Search, Tag } from "vant"

definePageMeta({
  layout: false,
})

const searchState: UnwrapRef<{
  value: string
  historySearch: Array<string>
}> = reactive({
  value: "",
  historySearch: [],
})

const recommendKeys = useConfigStore().getConfig.recommendKeys || []

if (process.client) {
  searchState.historySearch =
    [...new Set(localStorage.getItem("search_key")?.split(","))] || []
}

// 搜索
const handleSearch = () => {
  if (!searchState.value) {
    return navigateTo("/category")
  }

  let val: string = ""
  if (localStorage.getItem("search_key")) {
    let arr: Array<string> =
      localStorage.getItem("search_key")?.split(",") || []
    arr.push(searchState.value)
    val = String(arr)
  } else {
    val = searchState.value
  }
  localStorage.setItem("search_key", val)
  return navigateTo("/category?key=" + searchState.value)
}
// 搜索记录
const handletGoCategory = (item: string) => {
  return navigateTo("/category?key=" + item)
}
</script>

<style scoped lang="scss">
.search-box {
  display: flex;
  align-items: center;
  padding: 0.375rem;
  justify-content: space-between;
  :deep(.van-search) {
    padding: 0;
    height: 0.95rem !important;
  }

  .title {
    box-sizing: border-box;
    position: absolute;
    right: 0.5rem;
    text-align: center;
    font-size: 0.35rem;
    width: 1.45rem;
    height: 0.7rem;
    flex-shrink: 0;
    border-radius: 16px;
    background: #292b2e;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: "PingFang HK";
    font-size: 0.35rem;
  }
  .search {
    flex: 1;
    background-color: transparent;
    background-color: #eef3f7;
  }
}
.history-search {
  padding: 0.3rem;
  .title {
    position: relative;
    font-size: 0.35rem;
    margin-bottom: 0.2rem;
    color: #292b2e;
    font-family: "PingFang HK";
    font-size: 0.4rem;
    font-weight: 600;
  }
}
.history-search:last-child {
  padding-top: 0;
}
.van-tag {
  padding: 0.15rem 0.4rem;
  align-items: flex-start;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background: #fff;
  color: #292b2e;
  font-weight: 500;
}
:deep(.van-search__field) {
  height: 0.95rem !important;
}
</style>
