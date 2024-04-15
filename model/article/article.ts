import { Base } from "../base";

export interface ArticleList {
    articleType: Array<ArticleArticleType>;
    count: number;
    list: Array<any>;
    totalPages: number;
}

export interface ArticleArticleType {
    id: number;
    name: string;
    parentId: number;
    sort: number;
}

export interface Article extends Base {
    articleType: ArticleArticleType;
    brief: string;
    contentBody: string;
    coverImage: string;
    downArticle: string;
    isDel: boolean;
    isPub: boolean;
    pv: number;
    sort: number;
    title: string;
    typeId: number;
    upArticle: string;
    updateTime: string;

    /** 跳转地址 */
    link?: string;
}