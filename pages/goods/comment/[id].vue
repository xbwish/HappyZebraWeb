<template>
    <ol class="reviews-list">
        <li class="reviews-list__item" v-for="item in detailData.list" :key="item.id">
            <div class="review__avatar"><img :src="item.avatarImage" alt=""></div>
            <div class="review__content">
                <div class="cs-font-size-12 cs-p-b-5 cs-display-flex cs-text-align-center">
                    <span class="cs-m-r-5">{{ item.nickName }}</span>
                    <NRate readonly :default-value="item.score" size="small" />
                </div>
                <div class="cs-font-size-14">
                    {{ item.contentBody }}
                </div>
                <div class="cs-font-size-12 cs-color-gray">{{ item.createTime }} <br> {{ item.addon || '' }}</div>
                <div v-if="item.sellerContent">
                    {{$t('商家回复')}}：{{ item.sellerContent }}
                </div>
            </div>
        </li>
    </ol>
    <p class="no-more" v-if="detailData.list.length > 0 && !detailData.haveData">{{$t('没有更多了')}}</p>
    <CoreshopLoading v-if="detailData.isLoading" />

</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { NRate } from "naive-ui";
import { CommentData, Comment } from "@/model/product";
import { Result } from "@/model/result";
import { queryGoodComment } from "@/composables/productService";

const route = useRoute();

const detailData: UnwrapRef<{
    list: Array<Comment>;
    page: number;
    limit: number;
    haveData: boolean;
    isLoading: boolean;
}> = reactive({
    list: [],
    page: 1,
    limit: 10,
    haveData: true,
    isLoading: false,
});
const getGoodComment = async () => {
    detailData.isLoading = true;
    const goodCommentResult: Result<CommentData> = await queryGoodComment({
        id: route.params.id as unknown as number,
        page: detailData.page,
        limit: detailData.limit,
    });
    if (goodCommentResult.data.list && goodCommentResult.data?.list.length > 0) {
        detailData.list = detailData.list.concat(goodCommentResult.data?.list || []);
    } else {
        detailData.haveData = false;
    }
    detailData.isLoading = false;

};
getGoodComment();
</script>
<style lang="scss" scoped>
.reviews-list {

    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        width: 9rem;
        margin: 0.2rem auto;
        padding: 0.3rem;
        background: #fff;
        border-radius: 5px;
        .review__avatar {
            width: 10%;

            img {
                display: block;
                width: 100%;
                border-radius: 50%;
            }
        }

        .review__content {
            width: 88%;
        }
    }
}
</style>
