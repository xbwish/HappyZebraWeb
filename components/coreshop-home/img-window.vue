<template>
  <div class="window">
    <div class="grid" v-if="imgWindowLayutToGrid()">
      <NGrid :cols="props.coreshopData?.parameters.style">
        <NGi
          v-for="item in props.coreshopData.parameters.list"
          :key="item.image"
          :style="{ padding: coreshopData.parameters.margin + 'px' }"
          @click="linkTypeNavigate(item.linkType!, item.linkValue!)"
        >
          <NImage
            :src="item.image"
            object-fit="cover"
            :preview-disabled="true"
            class="image"
          ></NImage>
        </NGi>
      </NGrid>
    </div>

    <div class="mainWindow" v-if="imgWindowLayutToLeftRight()">
      <div class="left" :style="{ paddingRight: coreshopData.parameters?.margin + 'px' }">
        <NImage
          v-if="getImgWindowItem(0)"
          :src="getImgWindowItem(0).image"
          object-fit="cover"
          :preview-disabled="true"
          @click="linkTypeNavigate(getImgWindowItem(0).linkType, getImgWindowItem(0).linkValue)"
          class="image"
          :height="200"
        ></NImage>
      </div>
      <div class="right">
        <div>
          <NImage
            v-if="getImgWindowItem(1)"
            :src="getImgWindowItem(1).image"
            :height="120"
            class="image"
            object-fit="cover"
            :preview-disabled="true"
            @click="linkTypeNavigate(getImgWindowItem(1).linkType, getImgWindowItem(1).linkValue)"
          ></NImage>
        </div>
        <div
          class="right-bottom"
          :style="{ marginTop: coreshopData.parameters.margin + 'px' }"
        >
          <div
            :style="{ paddingRight: coreshopData.parameters.margin / 2 + 'px' }"
            class="minBox"
          >
            <NImage
              :src="getImgWindowItem(2).image"
              :height="200 - 120 - coreshopData.parameters.margin"
              class="image"
              v-if="getImgWindowItem(2)"
              object-fit="cover"
              :preview-disabled="true"
              @click="linkTypeNavigate(getImgWindowItem(2).linkType, getImgWindowItem(2).linkValue)"
            ></NImage>
          </div>

          <div
            :style="{ paddingLeft: coreshopData.parameters.margin / 2 + 'px' }"
            class="minBox"
          >
            <NImage
              :src="getImgWindowItem(3).image"
              :height="200 - 120 - coreshopData.parameters.margin"
              class="image"
              object-fit="cover"
              :preview-disabled="true"
              v-if="getImgWindowItem(3)"
              @click="linkTypeNavigate(getImgWindowItem(3).linkType, getImgWindowItem(3).linkValue)"
            ></NImage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { NGrid, NGi, NImage } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";

interface ImgWindow {
  coreshopData?: {
    parameters: {
      style: number;
      list: Array<ImgWindowItem>;
      margin: number;
    };
  };
}

interface ImgWindowItem {
  image: string;
  linkType: NavLinkTypeEnum;
  linkValue: string;
}

const props = withDefaults(defineProps<ImgWindow>(), {
  coreshopData: () => ({
    parameters: {
      style: 0,
      list: [],
      margin: 0,
    },
  }),
});

const onClickImag = (linkType: string, linkValue: string) => {};

const imgWindowLayutToGrid = () => {
  const { style } = props.coreshopData?.parameters || {};
  return [2, 3, 4].includes(style);
};

const imgWindowLayutToLeftRight = () => {
  const { style } = props.coreshopData?.parameters || {};
  return [0].includes(style);
};

const getImgWindowItem = (index: number) => {
  return props.coreshopData?.parameters?.list?.[index];
};
</script>

<style scoped lang="scss">
.window {
  margin: 10px;
  overflow: hidden;
  .n-image {
    display: contents;
  }
}

:deep(.image){
    img{
        width: 100%;
    }
}

.mainWindow {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  .left {
    width: 50%;
    height: 200px;
  }
  .right {
    width: 50%;
    height: 200px;
    .right-bottom {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .minBox {
    width: 50%;
  }
}
</style>
