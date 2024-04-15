<template>
  <div class="swiper-box">
    <NCarousel
      :space-between="20"
      dot-type="line"
      :loop="true"
      :autoplay="true"
      :interval="props.coreshopData?.parameters?.duration"
    >
      <img
        class="carousel-img"
        :style="'height:' + props.coreshopData.parameters?.height + 'px'"
        v-for="item of props.coreshopData?.parameters?.list || []"
        :key="item.image"
        :src="item.image"
        @click="onClick(item)"
        object-fit="cover"
      />
    </NCarousel>
  </div>
</template>

<script setup lang="ts">
import { NCarousel } from "naive-ui";
import { NavLinkTypeEnum } from "@/enum";

interface ImgSlideItem {
  image: string;
  url: string;
  title: string;
  linkType: NavLinkTypeEnum;
  linkValue: string;
}

interface ImgSlide {
  coreshopData: {
    parameters: {
      height?: number;
      duration?: number;
      list?: Array<ImgSlideItem>;
    };
  };
}

const props = withDefaults(defineProps<ImgSlide>(), {
  coreshopData: () => ({
    parameters: {
      height: 150,
      duration: 2500,
      list: [],
    },
  }),
});

const onClick = (imgSlide: ImgSlideItem) => {
  linkTypeNavigate(imgSlide.linkType, imgSlide.linkValue);
};
</script>

<style scoped lang="scss">
.carousel-img {
  width: 100%;
  height: 4rem;
  object-fit: cover;
}
.n-carousel {
  border-radius: 8px;
}
.swiper-box {
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  overflow: hidden;
}
</style>
