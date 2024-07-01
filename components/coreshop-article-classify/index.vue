<template>
  <div class="block-sidebar__item" v-if="classifies.length">
    <div class="widget-categories widget-categories--location--blog widget">
      <h4 class="widget__title"><CoreshopLanguage :text="$t('栏目分类')" /></h4>
      <ul
        class="widget-categories__list"
        data-collapse
        data-collapse-opened-class="widget-categories__item--open"
      >
        <li
          class="widget-categories__item"
          data-collapse-item
          v-for="item in classifies"
          :key="item.id"
        >
          <div class="widget-categories__row">
            <NuxtLink :to="'/article?id=' + item.id">
              <svg class="widget-categories__arrow" width="6px" height="9px">
                <use
                  xlink:href="/images/sprite.svg#arrow-rounded-right-6x9"
                ></use>
              </svg>
              {{ item.name }}
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryArticleClassify } from "@/composables/articleService"
import { ArticleClassify } from "@/model/article"
import type { Result } from "@/model/result"

const articleResult: Result<Array<ArticleClassify>> =
  await queryArticleClassify()
const classifies: Array<ArticleClassify> = articleResult.data || []
</script>

<style scoped></style>
