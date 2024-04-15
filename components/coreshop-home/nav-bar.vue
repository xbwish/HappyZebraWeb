<template>
  <div class="container coreshop-margin-left-10 coreshop-margin-10">
    <NGrid :cols="props.coreshopData?.parameters?.limit">
      <NGi
        v-for="item of props.coreshopData?.parameters?.list || []"
        @click="linkTypeNavigate(item.linkType, item.linkValue, item.text)"
      >
        <div class="nav-item">
          <NImage :src="item.image" object-fit="fill" :preview-disabled="true" :height="50" :width="50"></NImage>
          <div class="nav-item_name">{{ item.text }}</div>
        </div>
      </NGi>
    </NGrid>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { NGrid, NGi, NImage } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";

interface NavBar {
  coreshopData: {
    parameters?: {
      limit?: number;
      list?: Array<{
        image: string;
        linkType: NavLinkTypeEnum;
        linkValue: string;
        text: string;
      }>;
    };
  };
}

const props = withDefaults(defineProps<NavBar>(), {
  coreshopData: () => ({ parameters: {} }),
});
</script>

<style scoped lang="scss">
.container {
  background: #ffffff;

  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;
  .nav-item {
    margin-bottom: 10px;
    font-size: 12px;
    text-align: center;
    color: #292B2E;

  }
  background-color: #ffffff;
  padding-top: 20px;
}
</style>
