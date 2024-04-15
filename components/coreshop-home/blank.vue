<template>
  <div
    class="blank"
    :style="{
      height:(props.coreshopData.parameters?.height||0) * 2 + 'px',
      'background-color': props.coreshopData?.parameters?.backgroundColor,
    }"
  ></div>
</template>

<script setup lang="ts">
interface Blank {
    coreshopData:{
        parameters:{
            backgroundColor:string;
            height:number;
        }
    }
}

const props = withDefaults(defineProps<Blank>(), {});
</script>

<style scoped></style>
