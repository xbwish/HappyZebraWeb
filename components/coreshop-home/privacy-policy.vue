<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <a href="/agreement">{{ $t("服务条款") }}</a>
    <a href="/privacyPolicy">{{ $t("隐私政策") }}</a>
  </footer>
</template>

<style lang="scss" scoped>
.footer::v-deep {
  display: flex;
  justify-content: center;
  a {
    font-size: 12px;
    margin-right: 12px;
  }
}
</style>
