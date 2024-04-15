<template>
    <NuxtLayout>
        123
    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    layout: false,
})

const route = useRoute();
console.log(JSON.parse(route.query.obj as string))
</script>

<style scoped lang="scss">

</style>