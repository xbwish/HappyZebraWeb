<template>
  <view
    class="notice-bar coreshop-margin-left-10 coreshop-margin-right-10 coreshop-margin-bottom-10 coreshop-margin-top-10 coreshop-bg-white"
    v-if="props.coreshopData?.parameters?.list?.length > 0"
  >
    <NoticeBar left-icon="volume-o" :text="textCmp" color="#333333" background="#ffffff" />
  </view>
</template>

<script setup lang="ts">
import { NoticeBar } from "vant";

interface Notice {
  coreshopData: {
    parameters: {
      list: Array<{
        contentBody: string;
        createTime: string;
        title: string;
      }>;
    };
  };
}

const props = withDefaults(defineProps<Notice>(), {});

const textCmp = computed(() => {
  let notcieText: string = "";
  if (props.coreshopData?.parameters?.list.length > 0) {
    props.coreshopData.parameters.list.forEach((item) => {
      notcieText += `${item.title}【${timeFormat(item.createTime, "yyyy年mm月dd日")}】  `;
    });
  }
  return notcieText;
});
</script>

<style scoped lang="scss">
.notice-bar {
  display: block;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  .van-notice-bar {
    border-radius: 8px;
  }
}
</style>
