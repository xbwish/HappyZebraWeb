<template>
  <div class="block-sidebar__item">
    <div class="widget-posts widget">
      <h4 class="widget__title"><CoreshopLanguage text="最新文章" /></h4>
      <div class="widget-posts__list">
        <div class="widget-posts__item" v-for="item of articles" :key="item.id">
          <div class="widget-posts__image">
            <NuxtLink :to="item.link">
              <img :src="item.coverImage" />
            </NuxtLink>
          </div>
          <div class="widget-posts__info">
            <div class="widget-posts__name">
              <NuxtLink :to="item.link"> {{ item.title }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { queryLatestArticleList } from "@/composables/articleService";
import { Article } from "@/model/article";
import { Result } from "@/model/result";

let articles: Array<Article> = [];
const latestArticles: Result<Array<Article>> = await queryLatestArticleList();
articles = (latestArticles.data || []).map(item=>({...item,link:`/article/detail/${item.id}`}));
</script>

<style scoped>

</style>
