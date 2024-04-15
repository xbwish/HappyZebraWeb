import { post } from '@/utils/http';
import { Article, ArticleClassify } from '@/model/article';

const newArticleUrl: string = 'api/Article/GetNewArticle';
const getArticleClassifyUrl: string = 'api/Article/GetArticleClassify';

/** 获取最新文章列表 */
export const queryLatestArticleList = (num: number = 5) => post<Array<Article>>(newArticleUrl, { num });
/** 首页tab获取文章列表 */
export const queryArticleClassify = (params?: any) => post<Array<ArticleClassify>>(getArticleClassifyUrl, params);
