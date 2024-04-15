<template>
    <div>
        <CoreShopHeader></CoreShopHeader>
        <slot></slot>
        <CoreShopFooter></CoreShopFooter>  
    </div>
</template>

<script setup lang="ts">
import CoreShopFooter from './coreshop-shop-front/coreshop-footer.vue';
import CoreShopHeader from './coreshop-shop-front/coreshop-header.vue';
</script>

<style lang="scss">
</style>
