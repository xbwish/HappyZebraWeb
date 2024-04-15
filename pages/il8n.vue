<template>
  <div>
    <h1>{{ $t("新增") }}</h1>
    <h1>{{ $t("删除") }}</h1>
    <form>
      <label for="locale-select">{{ $t("language") }}: </label>
      <select id="locale-select" v-model="$i18n.locale" @change="change">
        <option value="en">en</option>
        <option value="zh">zh</option>
        <option value="nt">nt</option>

      </select>
    </form>

    <div>{{ name }}</div>
    <div>{{ mobile }}</div>

    <n-input v-model:value="nameState" size="large"> </n-input>

    <NButton @click="handleEditName">{{$t('修改姓名')}}</NButton>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Ref } from "vue";
import { I18n } from "vue-i18n";
import { useI18n } from "vue-i18n";
import { useMemberStore } from "~~/store/member.store";
import { NInput, NButton } from "naive-ui";
const { locale } = useI18n();

const store = useMemberStore();
const nameState: Ref<string> = ref<string>('');
const { name, mobile } = storeToRefs(store);
const change = (lang: any) => {
  locale.value = lang.target.value;
};

const handleEditName = () => {
  store.editName(nameState.value);
};
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped></style>
