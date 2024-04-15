<template>
  <CoreshopTitle :title="$t('登录')"></CoreshopTitle>
  <NuxtLayout name="coreshop-shop-header-back">
    <div class="layout-login">
      <div class="login-box">
        <CoreshopLoginRegister></CoreshopLoginRegister>
      </div>
      <!-- <div class="shop-desc">{{$t('快乐搬馬管理专家')}}</div> -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>
.layout-login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.login-box {
  padding: 0 22px;
}
.shop-desc {
  text-align: center;
  font-weight: 400;
  color: #797979;
  line-height: 20px;
  position: fixed;
  bottom: 20px;
  width: 100%;
}
</style>
