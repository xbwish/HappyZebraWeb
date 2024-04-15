<template>
  <div
    class="coreshop-imgsingle  coreshop-margin-left-10  coreshop-margin-right-10"
    v-if="(props.coreshopData?.parameters?.list ||[])?.length > 0">
    <div v-for="(child, index) in props.coreshopData.parameters!.list" :key="index">
      <div @click="linkTypeNavigate(child.linkType!,child.linkValue!)">
        <img class="ad-img" :src="child.image" />
      </div>
      <div
        class="imgup-btn"
        v-if="child.buttonText"
        @click="linkTypeNavigate(child.linkType!, child.linkValue!)"
      >
        <div
          class="coreshop-btn" :style="{ background: child.buttonColor, color: child.textColor }">
          {{ child.buttonText }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {} from "vue";
import { NavLinkTypeEnum } from "@/enum";

interface imgSingleItem {
  image?: string;
  linkValue?: string;
  linkType?: NavLinkTypeEnum;
  buttonText?: string;
  buttonColor?: string;
  textColor?: string;
}

interface imgSingle {
  coreshopData: {
    parameters?: {
      list: Array<imgSingleItem>;
    };
  };
}

const props = withDefaults(defineProps<imgSingle>(), {
  coreshopData: () => ({ parameters: {list:[]} }),
});

const onClickImg = (linkType: string, linkValue: string) => {};
</script>

<style scoped lang="scss">
.coreshop-imgsingle {
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  .ad-img {
    width: 100%;
    float: left;
    object-fit: cover;
  }
  .ad-img:last-child {
    margin-bottom: 0;
  }
  .imgup-btn {
    position: absolute;
    z-index: 1;
    bottom: 10px;
    width: 100%;
    min-height: 30px;
    text-align: center;
    .coreshop-btn {
      line-height: 2;
      font-size: 14px;
      padding: 0 25px;
      border-radius: 25px;
      display: inline-block;
    }
  }
}
</style>
