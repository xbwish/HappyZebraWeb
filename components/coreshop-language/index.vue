<template>
    <span v-if="inputProps.useLang">{{ $t(inputProps.text) }}</span>
    <span v-else>{{ inputProps.text }}</span>
</template>

<script setup lang='ts'>
const inputProps = withDefaults(defineProps<{
    text?: string;
    useLang?: boolean;
}>(), {
    text: '',
    useLang: true,
});
</script>

<style lang='scss' scoped>

</style>