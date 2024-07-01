<template>
  <div class="cs-background-color-white cs-p-10">
    <div class="title">
      <div>{{ props.data.name }}：（{{ $t("限制3张") }}）</div>
      <div v-if="props.data.required">
        <Tag type="primary">{{ $t("必选") }}</Tag>
      </div>
    </div>
    <div class="goods-box">
      <Uploader
        v-model="imgState.tempUploadImages"
        :max-count="3"
        :after-read="(files) => handlerUploadBanner(files)"
        :before-delete="(file, detail) => handleRemoveBanner(file, detail)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnwrapRef } from "vue"
import * as fileService from "@/composables/file"
import type { Result } from "@/model/result"
import { UploadFileResult } from "@/model/file"
import { showToast, Tag, Uploader, UploaderFileListItem } from "vant"

const props = withDefaults(
  defineProps<{
    data: any
  }>(),
  {
    data: () => {},
  }
)
let emits = defineEmits(["handleConfirm"])

const imgState: UnwrapRef<{
  banner: Array<UploaderFileListItem>
  tempUploadImages?: Array<UploaderFileListItem>
}> = reactive({
  banner: [],
  tempUploadImages: [],
})

/** 上传  */
const handlerUploadBanner = async (uploadFileInfo: UploaderFileListItem) => {
  if (!uploadFileInfo?.file) {
    return
  }

  let uploadResult: Result<UploadFileResult> = await fileService.uploadImage(
    uploadFileInfo.file!
  )

  if (!uploadResult.status) {
    showToast("网络异常，请重试")
    return
  }
  const fileUrl: string = uploadResult.data.fileUrl

  imgState.banner.push({ url: fileUrl })

  let value: Array<string> = []
  imgState.banner.forEach((item) => value.push(item.url as string))

  emits("handleConfirm", {
    key: props.data.id,
    value: value.join(","),
  })
}

const handleRemoveBanner = (
  event: { file: File },
  detail: { index: number }
) => {
  imgState.tempUploadImages = imgState.tempUploadImages?.filter(
    (item, index) => index !== detail.index
  )
  imgState.banner = imgState.banner.filter(
    (_: any, index: number) => index !== detail.index
  )
  emits("handleConfirm", {
    key: props.data.id,
    value: imgState.banner?.join(","),
  })
}
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.35rem;
}

.goods-box {
  margin: 0.2rem 0;
  font-size: 0.4rem;
}
</style>
