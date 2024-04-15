<template>
  <NuxtLayout name="personal-center">
    <div class="cs-p-10 cs-p-b-20">
      <div class="items cs-background-color-white">
        <h1 class="cs-font-size-16">{{ $t("关于我们") }}</h1>
        <div class="cs-font-size-14">
          <br />
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight:400;color: black;">“快樂搬馬管理顧問有限公司”</span>
            於2021年5月23日</p>
            <p>成立，總計鋪設合作取貨點50+，員工人數30+。平臺以</p>
            <p>b2b、b2c、o2o三種模式運營，產品種類豐富，涵蓋生</p>
            <p>技保健品、美容瘦身產品、蔬果直送以及海域海鮮水產直</p>
            <p>送等，經過嚴格的質量把關，通過與生產者的直接合作，</p>
            <p>所有產品直達生產鏈，沒有中間商賺差價，保證了產品品</p>
            <p>質的同時，也確保了價格優勢。同時，平臺採用分銷獎金</p>
            <p>制度的行銷模式，將利潤讓給更多用心分享推廣的分銷合</p>
            <p>作夥伴，實現共贏。</p>
          <br />
          <br />
          <br />
        </div>
      </div>
     </div>

  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<style scoped lang="scss">
p {
    line-height: 0.525rem;
    color: #979797;
    font-family: "PingFang HK";
}
.items {
  padding: 0.25rem 0.3rem;
  margin-bottom: 0.25rem;
  border-radius: 0.2rem;
  h1 {
    margin-bottom: 0.25rem;
  }
}
</style>
