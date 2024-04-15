<template>
  <div
    class="video coreshop-margin-top-10 coreshop-margin-left-10 coreshop-margin-right-10 coreshop-margin-bottom-10"
  >
    <video
      class="videoCT"
      controls
      muted
      :autoplay="autoplayRef"
      :src="props.coreshopData?.parameters?.list?.[0]?.url"
      :poster="props.coreshopData?.parameters?.list?.[0]?.image"
    ></video>
  </div>
</template>

<script setup lang="ts">
interface Video {
  coreshopData: {
    parameters: {
      autoplay: boolean | string;
      list: Array<{
        url?: string;
        image?: string;
        linkType?: string;
        linkValue?: string;
      }>;
    };
  };
}

const props = withDefaults(defineProps<Video>(), {
  coreshopData: () => ({
    parameters: {
      autoplay: true,
      list: [
        {
          url: "https://www.cxist.net/_nuxt/videos/video-bg.44b577a.mp4",
          image: "https://files.nsts.mvccms.cn/upload/20230207/20230207015105_3304.jpg",
        },
      ],
    },
  }),
});

const autoplayRef = computed(() => {
  const { autoplay } = props.coreshopData?.parameters;
  return autoplay === "true" || (autoplay as boolean);
});

</script>

<style scoped lang="scss">
.video {
  border-radius: 5px;
  overflow: hidden;
    display: flex;
  .videoCT {
    width: 100%;
    min-height: 100px;
  }
}
</style>
