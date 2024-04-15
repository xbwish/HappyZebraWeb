<template>
    <CoreshopTitle :title="$t('注册')"></CoreshopTitle>
    <NuxtLayout name="personal-center">
        <div class="layout-login">
            <div class="login-box">
                <p class="title">{{$t('用户登录')}}</p>
                <CoreshopLoginRegister></CoreshopLoginRegister>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
    layout: false,
})
</script>
<style lang="scss" scoped>
.layout-login {
    position: fixed;
    width: 10rem;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 99;
    background: url('/images/bg.jpg') no-repeat;
    background-size: cover;
}

.login-box {
    position: absolute;
    width: 8.4rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.3rem;
    border-radius: 5px;

    .title {
        padding: 0.2rem 0 0.5rem 0;
        text-align: center;
        font-size: 0.5rem;
        font-weight: bold;
    }
}
</style>