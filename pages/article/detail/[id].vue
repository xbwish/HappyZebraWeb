<template>
    <NuxtLayout name="personal-center">
        <div>
            <CoreshopTitle :title="detailState.title"></CoreshopTitle>
            <div class="cs-p-10 cs-background-color-white cs-m-b-10">
                <div>
                    <h1 class="cs-font-size-16 cs-p-20 cs-text-align-center">{{ detailState.article.title }}</h1>
                    <div class="cs-display-flex cs-align-items-center cs-align-content-center cs-justify-content-space-between cs-font-size-14 cs-p-10">
                        <div> {{ detailState.article.createTime }}</div>
                        <div>{{detailState.article.pv}} {{$t('访问量')}}</div>
                        <CoreshopShare :wxShare="detailState.wxShare" :shareParams="detailState.shareParams" /> 
                    </div>
                </div>
                <div class="post__featured cs-m-t-5">
                    <img class="cs-percent-w-100 " :src="detailState.article.coverImage" alt="">
                </div>
                <div class="cs-font-size-14 cs-m-t-10" v-html="detailState.article.contentBody">
                </div>
            </div>
        </div>
        
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Result } from "@/model/result";
import { queryArticleInfo,queryNoticeInfo,queryMessageDetail } from "@/composables/notice";
import { Article } from "@/model/article";
import { Ref ,UnwrapRef} from "vue";
import { ShareType, UrlSharePageType,UrlShareClentType, shareUrl,ArticleIdType} from "@/enum";
import { IWxShare, IShareParams, IShareMessageArguments } from '@/model';
import { useI18n } from "vue-i18n";
const { t: coreShopLang } = useI18n();
definePageMeta({
    layout: false,
});

const route = useRoute();

const detailState: UnwrapRef<{
    wxShare: IWxShare;
    shareParams: IShareParams;
    idType: number;
    title: string;
    article: any;
}> = reactive({
    wxShare: {},
    shareParams: { params: {} },
    idType: Number(route.query?.idType) || ArticleIdType.article,
    title: coreShopLang("文章详情"),
    article:{},
})

// 分享接口参数
const getShareUrl = (data: IShareMessageArguments) => {
    detailState.shareParams.client = UrlShareClentType.wxofficial;
    detailState.shareParams.page = UrlSharePageType.article;
    if (process.client) {
        detailState.shareParams.url = `${window.location.origin}${shareUrl}`;
    }
    detailState.shareParams.type = ShareType.url;
    detailState.shareParams.params.articleId = data.id;
    detailState.shareParams.params.idType = 1;

    // 分享信息
    detailState.wxShare.title = data.title;
    detailState.wxShare.desc = data.desc;
    detailState.wxShare.imgUrl = data.imgUrl;
}

onMounted(() => {
    if (detailState.idType === ArticleIdType.article) {
        detailState.title = coreShopLang("文章详情");
        handleArticleDetail();
    }

    if (detailState.idType === ArticleIdType.notice) {
        detailState.title = coreShopLang("公告详情");
        handleNoticeDetail();
    }

    if (detailState.idType === ArticleIdType.imageText) {
        detailState.title = coreShopLang("图文消息");
        handleMessageDetail();
    }
})

const handleArticleDetail = async () => {
    const detailRes: Result<Article> = await queryArticleInfo({ id: route.params.id });
    detailState.article = detailRes.data; 

    getShareUrl({
        'title': detailRes.data?.title || '',
        'desc': detailRes.data?.brief || '',
        'imgUrl': detailRes.data?.coverImage || '',
        'id': detailRes.data?.id || 0,
    })
}

const handleNoticeDetail = async () => {
    const detailRes: Result<any> = await queryNoticeInfo({ id: route.params.id });
    detailState.article = detailRes.data; 

    getShareUrl({
        'title': detailRes.data?.title || '',
        'desc': detailRes.data?.brief || '',
        'imgUrl': detailRes.data?.coverImage || '',
        'id': detailRes.data?.id || 0,
    })
}

const handleMessageDetail = async () => {
    const detailRes: Result<any> = await queryMessageDetail({ id: route.params.id });
    detailState.article = detailRes.data; 

    getShareUrl({
        'title': detailRes.data?.title || '',
        'desc': detailRes.data?.brief || '',
        'imgUrl': detailRes.data?.coverImage || '',
        'id': detailRes.data?.id || 0,
    })
}

</script>

<style lang="scss" scoped>

</style>
