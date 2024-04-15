<template>
  <div class="search-container">
    <!-- <div class="search">
      <CoreshopIconSearch class="search_icon"></CoreshopIconSearch>
      <input :placeholder="props.coreshopData?.parameters?.keywords" v-model="keywordRef" />
    </div>
    <div class="confirm" @click="onConfirmSearch()">搜索</div> -->
    <img src="/images/login/home-logo.png" alt="" />
    <div class="search-box">
      <Search
        class="search"
        shape="round"
        :placeholder="$t('请输入关键字搜索')"
        v-model="keywordRef"
        size="large"
      ></Search>
      <div class="title" @click="onConfirmSearch()">{{ $t("搜索") }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { Search,Tag  } from 'vant';
interface KeyWordSearch {
  coreshopData?: {
    parameters?: {
      keywords?: string;
      style?: any;
    };
  };
}

const keywordRef = ref<string>();

const props = withDefaults(defineProps<KeyWordSearch>(), {
  coreshopData: () => ({
    parameters: {
      keywords: '請輸入關鍵字蒐索',
    },
  }),
});

const onConfirmSearch = () => {
  let url: string = "/category";
  if (keywordRef.value) {
    url = `${url}?keyWord=${keywordRef.value}`;
  }
  return navigateTo(url);
};
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  align-items: center;
  // margin: 10px;
  // background: #ffffff;
  // box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  // border-radius: 8px;
  // .search {
  //   display: flex;
  //   align-items: center;
  //   flex: 1;
  //   background-color: #f3f3f3;
  //   border-radius: 4px;
  //   padding: 2px 0;
  //   .search_icon {
  //     width: 15px;
  //     height: 15px;
  //     margin-left: 20px;
  //   }
  //   input {
  //     flex: 1;
  //     font-size: 14px;

  //     background-color: #f3f3f3;
  //     padding: 5px;
  //     border-radius: 4px;
  //     border-color: transparent !important;
  //     &:visited {
  //       outline: none !important;
  //     }
  //     &:focus-visible {
  //       outline: none !important;
  //     }
  //   }
  // }
  // .confirm {
  //   font-size: 15px;
  //   margin: 0 10px 0 15px;
  // }
  img{
    width: 55px;
    height: 48px;
    margin-right: 4px;
    margin-left: 10px;
  }
}

.search-box {
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0.375rem 0.375rem 0.375rem 0;
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
    border-radius: 20px;
    height: 40px;
  }
}
</style>
