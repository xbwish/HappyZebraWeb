<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
    <slot></slot>
  </Head>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "快樂搬馬",
  },
});
</script>

<style scoped></style>
