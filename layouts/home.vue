<template>
    <div class="layout-page">
        <slot></slot>
        <CoreshopFooterMenu></CoreshopFooterMenu>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.layout-page {
    width: 10rem;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 2rem;
}
</style>